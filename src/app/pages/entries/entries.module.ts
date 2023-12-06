// Angular
import { NgModule } from "@angular/core";

// Components
import { EntryListComponent } from "./entry-list/entry-list.component";
import { EntryFormComponent } from "./entry-form/entry-form.component";

// Libs
import { CalendarModule } from "primeng/calendar";
import { IMaskModule } from "angular-imask";

// Modules
import { EntriesRoutingModule } from "./entries-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [EntryListComponent, EntryFormComponent],
  imports: [SharedModule, EntriesRoutingModule, CalendarModule, IMaskModule],
})
export class EntriesModule {}
