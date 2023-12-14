// Angular
import { Injectable, Injector } from "@angular/core";

// Models
import { Entry } from "./entry.model";

// RXJS
import { Observable, pipe } from "rxjs";
import { catchError, flatMap, map } from "rxjs/operators";

// Services
import { CategoryService } from "../../categories/shared/category.service";
import { BaseResourceService } from "src/app/shared/services/base-resource.service";

// Libs
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class EntryService extends BaseResourceService<Entry> {
  constructor(
    protected injector: Injector,
    private categoryService: CategoryService
  ) {
    super("api/entries", injector, Entry.fromJson);
  }

  create(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.create.bind(this));
  }

  update(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.update.bind(this));
  }

  getByMonthAndYear(month: number, year: number): Observable<Entry[]> {
    return this.getAll().pipe(
      map((e) => this.filterByMonthAndYear(e, month, year))
    );
  }

  private setCategoryAndSendToServer(
    entry: Entry,
    sendFn: any
  ): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap((category) => {
        entry.category = category;

        return sendFn(entry);
      }),
      catchError(this.handleError)
    );
  }

  private filterByMonthAndYear(entries: Entry[], month: number, year: number) {
    return entries.filter((entry) => {
      const entryDate = moment(entry.date, "DD/MM/YYYY");

      const monthMatches = entryDate.month() + 1 == month;
      const yearMatches = entryDate.year() == year;

      if (monthMatches && yearMatches) return entry;
    });
  }
}
