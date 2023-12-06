// Angular
import { Component, OnInit } from "@angular/core";

// Models
import { Category } from "../shared/category.model";

// Services
import { CategoryService } from "../shared/category.service";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.css"],
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      (res) => (this.categories = res),
      (err) => alert("Erro ao carregar a lista")
    );
  }

  deleteCategory(category) {
    const mustDelete = confirm("Deseja realmente excluir esse item?");

    if (mustDelete) {
      this.categoryService
        .delete(category.id)
        .subscribe(
          () => (
            (this.categories = this.categories.filter((e) => e != category)),
            () => alert("Erro ao excluir categoria")
          )
        );
    }
  }
}
