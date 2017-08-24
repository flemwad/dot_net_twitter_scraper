import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SearchParams } from '../models/tweet.models';

@Injectable()
export class TweetService {
    constructor(private _http: Http) {}

    getByHashtag(url: string, params: Partial<SearchParams>) {
        params.count = params.count || 15;
        params.maxId = params.maxId || '';

        const getHashtagUrl = `?hashtag=${params.value}&count=${params.count}&maxId=${params.maxId}`;
        return this._http.get(url + getHashtagUrl);
    }

    favoriteStatus(url: string, id: string) {
        return this._http.post(url + id, id);
    }

    private handleError(error: Response) {
        console.error(error);
    }

}