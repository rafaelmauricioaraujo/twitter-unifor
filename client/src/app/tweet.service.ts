import { Injectable } from '@angular/core';
import { Tweet } from './tweet';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TweetService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  SERVER_URL: string = "http://localhost:8080/api/Tweets";

  constructor(private http: HttpClient) {

  }


  addTweet(tweet: Tweet): Observable<Tweet> {
    console.log(tweet);
    return this.http.post<Tweet>(this.SERVER_URL, tweet, this.httpOptions);
  }


  getTweets(): Observable<Tweet[]> {

    return this.http.get<Tweet[]>(this.SERVER_URL);
  }
  /** PUT: update the hero on the server */
  updateTweet(tweet: Tweet): Observable<Tweet> {
    const id = typeof tweet === 'number' ? tweet : tweet.id;
    console.log(tweet);
    console.log(id);
    const url = `${this.SERVER_URL}/${tweet.id}`;
    return this.http.put(url, tweet, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateTweet'))
    );
  }
  deleteTweet(tweet: Tweet | number): Observable<Tweet> {
    const id = typeof tweet === 'number' ? tweet : tweet.id;
    console.log(id);
    const url = `${this.SERVER_URL}/${id}`;

    return this.http.delete<Tweet>(url, this.httpOptions).pipe(
      catchError(this.handleError<Tweet>('deleteTweet'))
    );
  }
  getTweet(id: number): Observable<Tweet> {
    const url = `${this.SERVER_URL}/${id}`;
    return this.http.get<Tweet>(url).pipe(

      catchError(this.handleError<Tweet>(`getTweet id=${id}`))
    );
  }




  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead




      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



}
