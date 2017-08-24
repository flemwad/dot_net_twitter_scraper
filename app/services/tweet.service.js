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
var http_1 = require("@angular/http");
var TweetService = (function () {
    function TweetService(_http) {
        this._http = _http;
    }
    TweetService.prototype.getByHashtag = function (url, params) {
        params.count = params.count || 15;
        params.maxId = params.maxId || '';
        var getHashtagUrl = "?hashtag=" + params.value + "&count=" + params.count + "&maxId=" + params.maxId;
        return this._http.get(url + getHashtagUrl);
    };
    TweetService.prototype.favoriteStatus = function (url, id) {
        return this._http.post(url + id, id);
    };
    TweetService.prototype.handleError = function (error) {
        console.error(error);
    };
    TweetService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], TweetService);
    return TweetService;
}());
exports.TweetService = TweetService;
//# sourceMappingURL=tweet.service.js.map