// Angular
import { Component, OnInit } from "@angular/core";

// Components
import { BaseResourceListComponent } from "src/app/shared/components/base-resource-list/base resource list.component";

// Models
import { Entry } from "../shared/entry.model";

// Services
import { EntryService } from "../shared/entry.service";

@Component({
  selector: "app-entry-list",
  templateUrl: "./entry-list.component.html",
  styleUrls: ["./entry-list.component.css"],
})
export class EntryListComponent extends BaseResourceListComponent<Entry> {
  entries: Entry[] = [];

  constructor(private entryService: EntryService) {
    super(entryService);
  }
}
