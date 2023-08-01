import { platformBrowser } from "@angular/platform-browser";
import { NgModule, Component } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  template: "<strong>Hello this is my first application</strong>",
})
export class AppComponent {}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}

platformBrowser().bootstrapModule(AppModule);
