// Angular
import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";

// Models
import { Entry } from "./entry.model";

// RXJS
import { Observable, pipe } from "rxjs";
import { flatMap } from "rxjs/operators";

// Services
import { CategoryService } from "../../categories/shared/category.service";
import { BaseResourceService } from "src/app/shared/services/base-resource.service";

@Injectable({
  providedIn: "root",
})
export class EntryService extends BaseResourceService<Entry> {
  constructor(
    protected injector: Injector,
    private categoryService: CategoryService
  ) {
    super("api/entries", injector);
  }

  create(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap((category) => {
        entry.category = category;

        return super.create(entry);
      })
    );
  }

  update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;

    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap((category) => {
        entry.category = category;

        return super.update(entry);
      })
    );
  }

  // Protected methods
  protected jsonDataToResources(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];
    jsonData.forEach((element) => {
      const entry = Object.assign(new Entry(), element);
      entries.push(entry);
    });
    return entries;
  }

  protected jsonDataToResource(jsonData: any): Entry {
    return jsonData as Entry;
  }
}
