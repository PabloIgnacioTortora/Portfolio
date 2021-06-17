import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../app/models/project';
import { Global } from './global';
import { catchError } from 'rxjs/operators';
import { error } from 'protractor';

@Injectable()
export class ProjectService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  testService() {
    return 'Probando el service de angular';
  }

  saveProject(project: Project): Observable<any> {
    let params = JSON.stringify(project);
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.post('api/saveProject', params, { headers: headers });
  }

  getProjects(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get('api/projects', { headers: headers });
  }

  getProject(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get('api/project/' + id, { headers: headers });
  }

  deleteProject(id){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http
      .delete('api/projectDelete/' + id, { headers: headers }).subscribe(data => console.log(data));
  }
}
