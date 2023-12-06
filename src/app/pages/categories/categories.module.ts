// Angular
import { NgModule } from "@angular/core";

// Components
import { CategoryListComponent } from "./category-list/category-list.component";
import { CategoryFormComponent } from "./category-form/category-form.component";

// Modules
import { SharedModule } from "src/app/shared/shared.module";

// Raouting modules
import { CategoriesRoutingModule } from "./categories-routing.module";

@NgModule({
  declarations: [CategoryListComponent, CategoryFormComponent],
  imports: [CategoriesRoutingModule, SharedModule],
})
export class CategoriesModule {}
