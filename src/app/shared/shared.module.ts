// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

// Components
import { BreadCrumbComponent } from "./components/bread-crumb/bread-crumb.component";
import { PageHeaderComponent } from "./components/page-header/page-header.component";

@NgModule({
  declarations: [BreadCrumbComponent, PageHeaderComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    BreadCrumbComponent,
    PageHeaderComponent,
    RouterModule,
  ],
})
export class SharedModule {}
