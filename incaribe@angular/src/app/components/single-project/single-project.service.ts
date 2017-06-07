import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Project } from './project.model'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SingleProjectService {
  private DEBUGURL = 'http://localhost:8888';
  private BASEURL = this.DEBUGURL+'/api/manager';

  constructor(private http: Http) { }

  getProject(id:String):Promise<any>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
      return this.http.get(`${this.BASEURL}/projects/${id}`, options)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
  }

  putProject(id:String, project: Project): Promise<any>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http
      .put(`${this.BASEURL}/projects/${id}`, {'project': project}, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  deleteProject(id:String):Promise<any>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
      return this.http.delete(`${this.BASEURL}/projects/${id}`, options)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
