import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Project } from './project.model'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProjectsService {
  private DEBUGURL = 'http://localhost:8888';
  private BASEURL = this.DEBUGURL+'/api/manager';

  constructor(private http: Http) { }

  get projects(): Promise<any>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
      return this.http.get(this.BASEURL+'/projects', options)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
  }

  postProject(project: Project): Promise<any>{
    let headers = new Headers({ 'Content-Type': 'application/json', 'token': sessionStorage.token });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(this.BASEURL+'/projects', {'project': project}, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
