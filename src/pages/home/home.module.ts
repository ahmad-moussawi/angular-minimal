import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { RouterModule } from "@angular/router";
import { AppBanners } from "./banners.component";
import { ObservableDemoComponent } from "../../playground/observable.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomeComponent,
      },
      {
        path: "demo",
        component: ObservableDemoComponent,
      },
    ]),
  ],
  declarations: [HomeComponent, AppBanners, ObservableDemoComponent],
})
export class HomeModule {}
