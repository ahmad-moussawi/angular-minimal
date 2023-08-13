import { AppComponent } from "./app.component";
import { AppHeader } from "./header.component";
import { AppNav } from "./pages/home/nav.component";
import { CounterComponent } from "./playground/counter.component";
import { CardComponent } from "./playground/card.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./pages/home/home.module").then((module) => module.HomeModule),
  },
  {
    path: "about",
    loadChildren: () =>
      import("./pages/about/about.module").then((module) => module.AboutModule),
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./pages/auth/auth.module").then((module) => module.AuthModule),
  },
];

@NgModule({
  declarations: [
    AppComponent,
    AppHeader,
    AppNav,
    CounterComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
