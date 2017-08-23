import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SearchParams } from '../models/tweet.models';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

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