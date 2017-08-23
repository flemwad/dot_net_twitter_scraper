export class Tweet {
    id: string;
    text: string;
    timestamp: string;
    retweetNumber: number;
    likeNumber: number;
    handle: string;
    author: string;
    picture: string;
}

export class SearchParams {
    value: string;
    count: number;
    maxId: string;
}

export class SearchResponse {
    count: number;
    maxId: string;
    tweets: Tweet[];
}
