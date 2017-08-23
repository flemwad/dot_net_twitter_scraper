import { Component } from "@angular/core";
import { TweetService } from '../../services/tweet.service';
import { Constants } from '../../shared/constants';
import { Tweet, SearchParams, SearchResponse } from '../../models/tweet.models';

@Component({
    template: `
        <div class="alert alert-danger alert-dismissible fade show" role="alert" *ngIf="this.errorMessage">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            {{errorMessage}}
        </div>
        <div class="input-group mt-2">
          <span class="input-group-addon" id="basic-addon1">#</span>
          <input 
            #searchHashtag 
            id="searchHashtag"
            type="text"
            class="form-control"
            placeholder="e.g. buffalo, cats, ninjas"
            [disabled]="tweetResults.tweets.length > 0"
            [value]="hashtag"
            (input)="hashtag = $event.target.value"
            (keyup.enter)="find(tweetResults.count, tweetResults.maxId)" />
            
            <div class="btn-group ml-2">
                <div *ngIf="tweetResults.maxId; then load_more else search"></div>
                <ng-template #load_more>
                    <button type="submit" class="btn btn-success" [disabled]="disableSearch" (click)="find(tweetResults.count, tweetResults.maxId)">load more <i class="fa fa-arrow-circle-down" aria-hidden="true"></i></button>
                </ng-template>
                <ng-template #search>
                    <button type="submit" class="btn btn-success" [disabled]="disableSearch" (click)="find(tweetResults.count, tweetResults.maxId)"><i class="fa fa-search" aria-hidden="true"></i></button>
                </ng-template>
                <button type="submit" class="btn btn-danger" *ngIf="tweetResults.tweets.length > 0" (click)="clear()">x</button>
            </div>
        </div>
        <tweet-results [results]="tweetResults.tweets"></tweet-results>
    `
})

export class SearchComponent {
    hashtag: string;
    disableSearch: boolean;
    errorMessage: string;
    tweetResults: SearchResponse;

    constructor(private _tweetService: TweetService) {
        this.hashtag = '';
        this.disableSearch = false;
        this.tweetResults = {
            count: 15,
            maxId: '',
            tweets: []
        };
    }

    clear() {
        this.hashtag = '';
        this.disableSearch = false;
        this.tweetResults.maxId = '';
        this.tweetResults.tweets = [];
    }

    onError(message: string) {
        this.errorMessage = message;
    }

    find(count: number, maxId: string) {
        const value = this.hashtag;
        let params: SearchParams = { value, count, maxId };

        this._tweetService.getByHashtag(Constants.BASE_SEARCH_ENDPOINT, params)
            .subscribe(data => {
                this.tweetResults = JSON.parse(data['_body']);
                if (this.tweetResults.count < 15) this.disableSearch = true;
                this.tweetResults.count = 15;
            }, err => this.onError('There was an issue loading the tweets! Please try again.'));
    }

}