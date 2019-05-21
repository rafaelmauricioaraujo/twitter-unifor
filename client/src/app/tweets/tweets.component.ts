import { Component, OnInit } from '@angular/core';
import { Tweet } from "../tweet";
import { TweetService } from "../tweet.service";

import { Location } from '@angular/common';


@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

  listaTweets: Tweet[];
  constructor(private tweetService: TweetService) { }

  ngOnInit() {


    this.tweetService.getTweets().subscribe(tweets => this.listaTweets = tweets);


  }

  delete(tweet: Tweet): void {
    console.log(tweet);
    this.listaTweets = this.listaTweets.filter(h => h !== tweet);
    this.tweetService.deleteTweet(tweet).subscribe();
  }

  sort(tweets): Tweet[] {
    return tweets.reverse();
  }





}
