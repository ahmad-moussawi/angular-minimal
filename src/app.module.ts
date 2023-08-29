import { AppComponent } from "./app.component";
import { AppHeader } from "./header.component";
import { AppNav } from "./pages/home/nav.component";
import { CounterComponent } from "./playground/counter.component";
import { CardComponent } from "./playground/card.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppStorageService } from "src/services/appstorage.service";
import { SessionStorageService } from "src/services/sessionstorage.service";
import { AnalyticsService } from "src/services/analytics.service";
import { DirectivesModule } from "./directives/directives.module";
import { ProductService } from "./services/product.service";
import { AuthService } from "./services/auth.service";
import { AppInterceptor } from "./interceptors/app.interceptor";
import { IsAuthenticatedGuard } from "./guards/is_authenticated.guard";

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
    path: "products",
    canActivate: [IsAuthenticatedGuard],
    loadChildren: () =>
      import("./pages/products/products.module").then(
        (module) => module.ProductsModule
      ),
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
    HttpClientModule,
    DirectivesModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  providers: [
    // AppStorageService,
    // { provide: AppStorageService, useClass: AppStorageService }
    { provide: AppStorageService, useClass: SessionStorageService },
    AnalyticsService,
    ProductService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
