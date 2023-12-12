// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

// Components
import { BreadCrumbComponent } from "./components/bread-crumb/bread-crumb.component";
import { PageHeaderComponent } from "./components/page-header/page-header.component";
import { FormFieldErrorComponent } from "./components/form-field-error/form-field-error.component";
import { ServerErrorMessagesComponent } from "./components/server-error-messages/server-error-messages.component";

@NgModule({
  declarations: [
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    BreadCrumbComponent,
    PageHeaderComponent,

    FormFieldErrorComponent,
    ServerErrorMessagesComponent,
    RouterModule,
  ],
})
export class SharedModule {}
