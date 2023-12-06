// Angular
import { Injectable, Injector } from "@angular/core";

// Models
import { Category } from "./category.model";

// Services
import { BaseResourceService } from "src/app/shared/services/base-resource.service";

@Injectable({
  providedIn: "root",
})
export class CategoryService extends BaseResourceService<Category> {
  constructor(protected injector: Injector) {
    super("api/categories", injector, Category.fromJson);
  }
}
