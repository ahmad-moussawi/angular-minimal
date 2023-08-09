import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { RouterModule } from "@angular/router";
import { AppBanners } from "./banners.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomeComponent,
      },
    ]),
  ],
  declarations: [HomeComponent, AppBanners],
})
export class HomeModule {}
