// Angular
import { AfterContentChecked, OnInit, Injector, Directive } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// Models
import { BaseResourceModel } from "../../models/base-resource.model";

// Services
import { BaseResourceService } from "../../services/base-resource.service";

// Libs
import toastr from "toastr";

// RXJS
import { switchMap } from "rxjs/operators";

@Directive()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel>
  implements OnInit, AfterContentChecked
{
  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData) => T
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction == "new") this.createResource();
    // currentAction == "edit"
    else this.updateResource();
  }

  // Protected methods
  protected setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new") this.currentAction = "new";
    else this.currentAction = "edit";
  }

  protected loadResource() {
    if (this.currentAction == "edit") {
      this.route.paramMap
        .pipe(
          switchMap((params) => this.resourceService.getById(+params.get("id")))
        )
        .subscribe(
          (res) => {
            this.resource = res;
            this.resourceForm.patchValue(res); // binds loaded resource data to resourceForm
          },
          (err) => alert("Ocorreu um erro no servidor, tente mais tarde.")
        );
    }
  }

  protected setPageTitle() {
    if (this.currentAction == "new") this.pageTitle = this.creationPageTitle();
    else {
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected creationPageTitle(): string {
    return "Novo";
  }

  protected editionPageTitle(): string {
    return "Edição";
  }

  protected createResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.create(resource).subscribe(
      (res) => this.actionsForSuccess(res),
      (err) => this.actionsForError(err)
    );
  }

  protected updateResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.update(resource).subscribe(
      (res) => this.actionsForSuccess(res),
      (err) => this.actionsForError(err)
    );
  }

  protected actionsForSuccess(resource: T) {
    toastr.success("Solicitação processada com sucesso!");

    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

    // redirect/reload component page
    this.router
      .navigateByUrl(baseComponentPath, { skipLocationChange: true })
      .then(() =>
        this.router.navigate([baseComponentPath, resource.id, "edit"])
      );
  }

  protected actionsForError(error) {
    toastr.error("Ocorreu um erro ao processar a sua solicitação!");

    this.submittingForm = false;

    if (error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = [
        "Falha na comunicação com o servidor. Por favor, tente mais tarde.",
      ];
  }

  protected abstract buildResourceForm(): void;
}
