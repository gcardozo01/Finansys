// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

// Components
import { BreadCrumbComponent } from "./components/bread-crumb/bread-crumb.component";
import { PageHeaderComponent } from "./components/page-header/page-header.component";
import { FormFieldErrorComponent } from "./components/form-field-error/form-field-error.component";

@NgModule({
  declarations: [
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    BreadCrumbComponent,
    PageHeaderComponent,

    FormFieldErrorComponent,
    RouterModule,
  ],
})
export class SharedModule {}
