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
var tweet_service_1 = require("../../../services/tweet.service");
var constants_1 = require("../../../shared/constants");
var tweet_models_1 = require("../../../models/tweet.models");
var TweetCardComponent = (function () {
    function TweetCardComponent(_tweetService) {
        this._tweetService = _tweetService;
        this.onLiked = new core_1.EventEmitter();
        this.likedTweets = {};
        this.likedErrors = {};
        this.likedAlready = {};
    }
    TweetCardComponent.prototype.favoriteStatus = function (statusId) {
        var _this = this;
        this._tweetService.favoriteStatus(constants_1.Constants.BASE_LIKE_ENDPOINT, statusId)
            .subscribe(function (data) {
            if (data.status === 200) {
                _this.likedTweets[statusId] = true;
                _this.onLiked.emit(statusId);
            }
        }, function (err) {
            if (JSON.parse(err['_body']).ExceptionMessage.indexOf('already favorited') >= 0)
                _this.likedAlready[statusId] = true;
            else
                _this.likedErrors[statusId] = true;
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", tweet_models_1.Tweet)
    ], TweetCardComponent.prototype, "tweetData", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TweetCardComponent.prototype, "onLiked", void 0);
    TweetCardComponent = __decorate([
        core_1.Component({
            selector: 'tweet-card',
            template: "\n        <div class=\"card\">\n            <div class=\"card-header text-center\">\n                <img [src]=\"tweetData.picture\" class=\"center-block img-responsive\" />\n                <br />\n                <a href=\"https://twitter.com/{{tweetData.handle}}\">@{{tweetData.handle}}</a>\n            </div>\n            <div class=\"card-block\">\n                <div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\" *ngIf=\"likedTweets[tweetData.id] === true\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n                        <span aria-hidden=\"true\">&times;</span>\n                    </button>\n                    Tweet Liked!\n                </div>\n                <div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\" *ngIf=\"likedAlready[tweetData.id] === true\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n                        <span aria-hidden=\"true\">&times;</span>\n                    </button>\n                    You have already liked this tweet!\n                </div>\n                <div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\" *ngIf=\"likedErrors[tweetData.id] === true\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n                        <span aria-hidden=\"true\">&times;</span>\n                    </button>\n                    Something went wrong! Try again soon\n                </div>\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-9\">\n                            {{tweetData.text}}\n                        </div>\n                        <div class=\"col-3 text-center\">\n                            <button class=\"btn btn-info\" (click)=\"favoriteStatus(tweetData.id)\" title=\"like tweet\" [disabled]=\"likedTweets[tweetData.id] || likedAlready[tweetData.id]\"><i class=\"fa fa-thumbs-up\" aria-hidden=\"true\"></i></button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"card-footer text-muted text-center\">\n                by {{tweetData.author}} at {{tweetData.timestamp | date:'medium'}}\n                <br />\n                Likes: <span class=\"badge badge-warning\">{{tweetData.likeNumber}}</span>\n                Retweets: <span class=\"badge badge-info\">{{tweetData.retweetNumber}}</span>\n            </div>\n        </div>\n        <hr />\n    "
        }),
        __metadata("design:paramtypes", [tweet_service_1.TweetService])
    ], TweetCardComponent);
    return TweetCardComponent;
}());
exports.TweetCardComponent = TweetCardComponent;
//# sourceMappingURL=tweet-card.component.js.map