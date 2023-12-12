// Angular
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

// Configs
import { InMemoryDatabase } from "../in-memory-database";

// Components
import { NavbarComponent } from "./components/navbar/navbar.component";

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NavbarComponent,
  ],
})
export class CoreModule {}
