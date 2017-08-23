import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { TweetService } from './services/tweet.service';
import { SearchComponent } from './components/search/search.component';
import { TweetResultsComponent } from './components/tweet-results/tweet-results.component';
import { TweetCardComponent } from './components/tweet-results/tweet-card/tweet-card.component';


@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing],
    declarations: [AppComponent, SearchComponent, TweetResultsComponent, TweetCardComponent],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, TweetService],
    bootstrap: [AppComponent]
})

export class AppModule { }