﻿import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DatePipe } from '@angular/common';
import { TweetService } from '../../../services/tweet.service';
import { Constants } from '../../../shared/constants';
import { Tweet } from '../../../models/tweet.models';

@Component({
    selector: 'tweet-card',
    template: `
        <div class="card">
            <div class="card-header text-center">
                <img [src]="tweetData.picture" class="center-block img-responsive" />
                <br />
                <a href="https://twitter.com/{{tweetData.handle}}">@{{tweetData.handle}}</a>
            </div>
            <div class="card-block">
                <div class="alert alert-success alert-dismissible fade show" role="alert" *ngIf="likedTweets[tweetData.id] === true">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    Tweet Liked!
                </div>
                <div class="alert alert-warning alert-dismissible fade show" role="alert" *ngIf="likedAlready[tweetData.id] === true">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    You have already liked this tweet!
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-9">
                            {{tweetData.text}}
                        </div>
                        <div class="col-3 text-center">
                            <button class="btn btn-info" (click)="favoriteStatus(tweetData.id)" title="like tweet" [disabled]="likedTweets[tweetData.id] || likedAlready[tweetData.id]"><i class="fa fa-thumbs-up" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer text-muted text-center">
                by {{tweetData.author}} at {{tweetData.timestamp | date:'medium'}}
                <br />
                Likes: <span class="badge badge-warning">{{tweetData.likeNumber}}</span>
                Retweets: <span class="badge badge-info">{{tweetData.retweetNumber}}</span>
            </div>
        </div>
        <hr />
    `
})

export class TweetCardComponent {
    @Input() tweetData: Tweet;
    @Output() onLiked = new EventEmitter<string>();

    likedTweets: any;
    likedAlready: any;

    constructor(private _tweetService: TweetService) {
        this.likedTweets = {};
        this.likedAlready = {};
    }

    favoriteStatus(statusId: string) {
        this._tweetService.favoriteStatus(Constants.BASE_LIKE_ENDPOINT, statusId)
            .subscribe(data => {
                if (data.status === 200) {
                    this.likedTweets[statusId] = true;
                    this.onLiked.emit(statusId);
                }
            }, err => {
                if (JSON.parse(err['_body'])) this.likedAlready[statusId] = true;
            });
    }
}