import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Candidate, CandidateWithVote, Auth } from '../models/candidate';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class DataService {
  private readonly API_URL = 'http://localhost:4002';  

  private authData: Auth = null;

  constructor(private $http: HttpClient) { 
    // this.authData = new Auth();
    //   this.authData.id = "admin";
    //   this.authData.is_admin = true;
    //   this.authData.constituency = "Gulberg";
  }

  logout(){
    this.authData = null;
  }

  isLoggedIn(): boolean {
    return this.authData !== null;
  }

  getAuthData(): Auth {
    return this.authData;
  }

  login(id: string, pwd: string): Observable<boolean> {
    return this.$http.post<Auth>(this.API_URL + '/login', { userName: id, password: pwd })
      .pipe(
        map(response => {          
          if(!response)
            this.authData = null;
          else
            this.authData = response as Auth;
          return this.authData.id !== undefined;
        })
      );
  }

  getCandidate(id: string): Observable<Candidate> {
    // return of(null).pipe(mergeMap(() => {
    //   return of(['Gulberg', 'Gulshan', 'North']);
    // }));
    return this.$http.get<Candidate>(this.API_URL + '/candidate/' + id);
  }

  getRegions(): Observable<string[]> {
    // return of(null).pipe(mergeMap(() => {
    //   return of(['Gulberg', 'Gulshan', 'North']);
    // }));
    return this.$http.get<string[]>(this.API_URL + '/constituencies');
  }

  getAll(region: string): Observable<CandidateWithVote[]> {
    // return of(null).pipe(mergeMap(() => {
    //   let data = new CandidateWithVote();
    //   data.id = 0;
    //   data.name = "Imran Khan";
    //   data.symbol = "Bat";
    //   data.constituency = "Gulberg";
    //   data.votes = Math.ceil(Math.random() * 100000);

    //   let data2 = new CandidateWithVote();
    //   data2.id = 0;
    //   data2.name = "Nawaz Sharif";
    //   data2.symbol = "Lion";
    //   data2.constituency = "North";
    //   data2.votes = Math.ceil(Math.random() * 100000);

    //   let result = [data, data2];

    //   return of(result);
    // }));
    return this.$http.get<CandidateWithVote[]>(this.API_URL + '/?constituency=' + region);
  }

  add(candidate: Candidate): Observable<CandidateWithVote> {
    return this.$http.post<CandidateWithVote>(this.API_URL + '/candidate', candidate);
  }

  // update(candidate: Candidate): Observable<Candidate> {
  //   return this.$http.put<Candidate>(this.API_URL, candidate);
  // }

  delete(id: string): Observable<Object> {
    return this.$http.delete(this.API_URL + '/candidate/' + id);
  }
}