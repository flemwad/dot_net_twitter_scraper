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
var TweetResultsComponent = (function () {
    function TweetResultsComponent() {
    }
    TweetResultsComponent.prototype.onLiked = function (statusId) {
        for (var i = 0; i <= this.results.length; i++) {
            var theTweetId = this.results[i].id;
            if (theTweetId === statusId) {
                this.results[i].likeNumber++;
                break;
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TweetResultsComponent.prototype, "results", void 0);
    TweetResultsComponent = __decorate([
        core_1.Component({
            selector: 'tweet-results',
            template: "\n        <div class=\"container\" style=\"margin-top:40px;\">\n            <div class=\"row text-center\" *ngFor=\"let tweet of results\">\n                <div class=\"col-6 offset-3\">\n                    <tweet-card [tweetData]=tweet (onLiked)=\"onLiked($event)\"></tweet-card>\n                </div>\n            </div>\n        </div>\n    "
        })
    ], TweetResultsComponent);
    return TweetResultsComponent;
}());
exports.TweetResultsComponent = TweetResultsComponent;
//# sourceMappingURL=tweet-results.component.js.map