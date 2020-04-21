import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Word } from './word';


@Injectable({
  providedIn: 'root'
})
export class WordService {
  words: Word[];

  constructor(
    private http: HttpClient,
  ) { }

  getWords(): Observable<Word[]> {
    return this.http.get(environment.apiUrl + '/words') as Observable<Word[]>;
  }

}
