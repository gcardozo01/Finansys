// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

// Components
import { BreadCrumbComponent } from "./components/bread-crumb/bread-crumb.component";

@NgModule({
  declarations: [BreadCrumbComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CommonModule, ReactiveFormsModule, BreadCrumbComponent],
})
export class SharedModule {}
