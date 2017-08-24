"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var tweet_service_1 = require("../../services/tweet.service");
var constants_1 = require("../../shared/constants");
var SearchComponent = (function () {
    function SearchComponent(_tweetService) {
        var _this = this;
        this._tweetService = _tweetService;
        this.setErrorMsg = function (message) { return _this.errorMessage = message; };
        this.hashtag = '';
        this.disableSearch = false;
        this.errorMessage = '';
        this.tweetResults = {
            count: 15,
            maxId: '',
            tweets: []
        };
    }
    SearchComponent.prototype.clear = function () {
        this.hashtag = '';
        this.disableSearch = false;
        this.tweetResults.maxId = '';
        this.tweetResults.tweets = [];
    };
    SearchComponent.prototype.find = function (count, maxId) {
        var _this = this;
        var params = { value: this.hashtag, count: 15, maxId: this.tweetResults.maxId };
        this.disableSearch = false;
        this.setErrorMsg('');
        this._tweetService.getByHashtag(constants_1.Constants.BASE_SEARCH_ENDPOINT, params)
            .subscribe(function (data) {
            _this.tweetResults = JSON.parse(data['_body']);
            //can't load more
            if (_this.tweetResults.count < 15)
                _this.disableSearch = true;
            if (_this.tweetResults.count === 0)
                _this.setErrorMsg("No recent popular tweets by that hashtag. Try again!");
        }, function (err) { return _this.setErrorMsg('There was an issue loading the tweets! Please try again.'); });
    };
    SearchComponent = __decorate([
        core_1.Component({
            template: "\n        <div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\" *ngIf=\"this.errorMessage\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n                <span aria-hidden=\"true\">&times;</span>\n            </button>\n            {{errorMessage}}\n        </div>\n        <div class=\"input-group mt-2\">\n          <span class=\"input-group-addon\" id=\"basic-addon1\">#</span>\n          <input \n            #searchHashtag \n            id=\"searchHashtag\"\n            type=\"text\"\n            class=\"form-control\"\n            placeholder=\"e.g. buffalo, cats, ninjas\"\n            [disabled]=\"tweetResults.tweets.length > 0\"\n            [value]=\"hashtag\"\n            (input)=\"hashtag = $event.target.value\"\n            (keyup.enter)=\"find(tweetResults.count, tweetResults.maxId)\" />\n            \n            <div class=\"btn-group ml-2\">\n                <div *ngIf=\"tweetResults.maxId; then load_more else search\"></div>\n                <ng-template #load_more>\n                    <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"disableSearch\" (click)=\"find(tweetResults.count, tweetResults.maxId)\">load more <i class=\"fa fa-arrow-circle-down\" aria-hidden=\"true\"></i></button>\n                </ng-template>\n                <ng-template #search>\n                    <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"disableSearch\" (click)=\"find(tweetResults.count, tweetResults.maxId)\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i></button>\n                </ng-template>\n                <button type=\"submit\" class=\"btn btn-danger\" *ngIf=\"tweetResults.tweets.length > 0\" (click)=\"clear()\">x</button>\n            </div>\n        </div>\n        <small class=\"input-text text-muted\">filtered by popular tweets only</small>\n        <tweet-results [results]=\"tweetResults.tweets\"></tweet-results>\n    "
        }),
        __metadata("design:paramtypes", [tweet_service_1.TweetService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map