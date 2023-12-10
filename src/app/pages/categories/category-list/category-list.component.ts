// Angular
import { Component } from "@angular/core";

// Components
import { BaseResourceListComponent } from "src/app/shared/components/base-resource-list/base resource list.component";

// Models
import { Category } from "../shared/category.model";

// Services
import { CategoryService } from "../shared/category.service";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.css"],
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {
  constructor(private categoryService: CategoryService) {
    super(categoryService);
  }
}
