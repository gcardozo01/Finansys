// Angular
import { NgModule } from "@angular/core";

// Modules
import { ReportsRoutingModule } from "./reports-routing.module";
import { ReportsComponent } from "./reports/reports.component";
import { SharedModule } from "src/app/shared/shared.module";

// Libs
import { ChartModule } from "primeng/chart";

@NgModule({
  declarations: [ReportsComponent],
  imports: [SharedModule, ReportsRoutingModule, ChartModule],
})
export class ReportsModule {}
