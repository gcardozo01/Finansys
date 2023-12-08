// Angular
import { Component, Injector } from "@angular/core";
import { Validators } from "@angular/forms";

// Components
import { BaseResourceFormComponent } from "src/app/shared/components/base-resource-form/base-resource-form.component";

// Models
import { Category } from "../../categories/shared/category.model";

// Services
import { CategoryService } from "../../categories/shared/category.service";

@Component({
  selector: "app-category-form",
  templateUrl: "./category-form.component.html",
  styleUrls: ["./category-form.component.css"],
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {
  constructor(
    protected categoryService: CategoryService,
    protected injector: Injector
  ) {
    super(injector, new Category(), categoryService, Category.fromJson);
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
    });
  }

  protected creationPageTitle(): string {
    return "Cadastro de nova Categoria";
  }

  protected editionPageTitle(): string {
    const categoryName = this.resource.name || "";

    return `Editando Categoria: ${categoryName}`;
  }
}
