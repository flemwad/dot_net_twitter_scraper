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
        this.find = function (hashtag) {
            _this._tweetService.getByHashtag(constants_1.Constants.BASE_SEARCH_ENDPOINT, hashtag, _this.count, _this.maxId);
        };
        this.count = 15;
    }
    SearchComponent = __decorate([
        core_1.Component({
            template: "\n        <form>\n            # <input #searchHashtag type=\"text\" (keyup.enter)=\"find(searchHashtag.value)\" />\n            <button type=\"submit\" class=\"btn btn-success\" (click)=\"find(searchHashtag.value)\">Search</button>\n        </form>\n    "
        }),
        __metadata("design:paramtypes", [tweet_service_1.TweetService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=twitoauth.component.js.map