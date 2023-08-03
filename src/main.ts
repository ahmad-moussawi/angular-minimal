import { NgModule } from "@angular/core";
import { BrowserModule, platformBrowser } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { AppHeader } from "./pages/home/header.component";
import { AppNav } from "./pages/home/nav.component";
import { AppBanners } from "./pages/home/banners.component";

@NgModule({
  declarations: [AppComponent, AppHeader, AppNav, AppBanners],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}

platformBrowser().bootstrapModule(AppModule);
