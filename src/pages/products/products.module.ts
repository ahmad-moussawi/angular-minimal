import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PipesModule } from "src/pipes/pipes.module";
import { DirectivesModule } from "src/directives/directives.module";
import { ProductDetailsComponent } from "./product-details.component";
import { ProductsComponent } from "./products.component";

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    DirectivesModule,
    RouterModule.forChild([
      {
        path: "" /* /products */,
        component: ProductsComponent,
      },
      {
        path: ":id" /* /products/1 */,
        component: ProductDetailsComponent,
      },
    ]),
  ],
  declarations: [ProductsComponent, ProductDetailsComponent],
})
export class ProductsModule {}
