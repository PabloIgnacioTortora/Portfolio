import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MessageService {
  constructor(private http: HttpClient) {}

  verifyEmail(email: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(`/emailVerify/${email}`, { headers: headers });
  }
}
