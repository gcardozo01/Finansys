// Angular
import { HttpClient } from "@angular/common/http";
import { Injector } from "@angular/core";

// Models
import { BaseResourceModel } from "../models/base-resource.model";

// RXJS
import { Observable, pipe, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

export abstract class BaseResourceService<T extends BaseResourceModel> {
  protected http: HttpClient;

  constructor(protected apiPath: string, injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonDataToResources));
  }

  getById(id: number): Observable<T> {
    const url = `${this.apiPath}/${id}`;

    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDataToResource));
  }

  create(resource: T): Observable<T> {
    return this.http
      .post(this.apiPath, resource)
      .pipe(catchError(this.handleError), map(this.jsonDataToResource));
  }

  update(resource: T): Observable<T> {
    const url = `${this.apiPath}/${resource.id}`;

    return this.http.put(url, resource).pipe(
      catchError(this.handleError),
      map(() => resource)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  // Protected methods
  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach((e) => resources.push(e as T));
    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return jsonData as T;
  }

  protected handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO => ", error);
    return throwError(error);
  }
}
