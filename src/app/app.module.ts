// Angular
import { NgModule } from "@angular/core";

// Components
import { AppComponent } from "./app.component";

// Module
import { CoreModule } from "./core/core.module";

// Routing module
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
