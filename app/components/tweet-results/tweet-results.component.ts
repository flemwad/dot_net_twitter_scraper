import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TweetService } from '../../services/tweet.service';
import { Constants } from '../../shared/constants';
import { Tweet } from '../../models/tweet.models';

@Component({
    selector: 'tweet-results',
    template: `
        <div class="container" style="margin-top:40px;">
            <div class="row text-center" *ngFor="let tweet of results">
                <div class="col-6 offset-3">
                    <tweet-card [tweetData]=tweet (onLiked)="onLiked($event)"></tweet-card>
                </div>
            </div>
        </div>
    `
})

export class TweetResultsComponent {
    @Input() results: Tweet[];

    onLiked(statusId: string) {
        for (let i = 0; i <= this.results.length; i++) {
            const theTweetId = this.results[i].id;
            if (theTweetId === statusId) {
                this.results[i].likeNumber++;
                break;
            }
        }
    }
}