import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  readonly ROOT_URL = 'http://localhost:5001/api/v1/getTodoList';

  constructor(private http: HttpClient) {}

  getTodos(
    text: string,
    breakword: string,
    checkConcatenate: boolean
  ): Observable<string[]> {
    return this.http.post<string[]>(this.ROOT_URL, {
      text: text.trim(),
      breakword: breakword.trim(),
      checkConcatenate,
    });
  }
}
