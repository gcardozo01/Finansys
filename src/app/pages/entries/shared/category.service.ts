import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, pipe, throwError } from "rxjs";
import { Entry } from "./entry.model";
import { map, catchError, flatMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class EntryService {
  private apiPath: string = "api/entries";
  constructor(private http: HttpClient) {}

  getAll(): Observable<Entry[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.hadleError), map(this.jsonDataToEntries));
  }

  getById(id: number): Observable<Entry> {
    const url = `${this.apiPath}/${id}`;

    return this.http
      .get(url)
      .pipe(catchError(this.hadleError), map(this.jsonDataToEntry));
  }

  create(entry: Entry): Observable<Entry> {
    return this.http
      .post(this.apiPath, entry)
      .pipe(catchError(this.hadleError), map(this.jsonDataToEntry));
  }

  update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;

    return this.http.put(url, entry).pipe(
      catchError(this.hadleError),
      map(() => entry)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.hadleError),
      map(() => null)
    );
  }

  // Private methods
  private jsonDataToEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];
    jsonData.forEach((e) => entries.push(e as Entry));
    return entries;
  }

  private jsonDataToEntry(jsonData: any): Entry {
    return jsonData as Entry;
  }

  private hadleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO => ", error);
    return throwError(error);
  }
}