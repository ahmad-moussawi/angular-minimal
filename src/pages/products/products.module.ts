import { CommonModule } from "@angular/common";
import { NgModule, inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterModule } from "@angular/router";
import { DirectivesModule } from "src/directives/directives.module";
import { PipesModule } from "src/pipes/pipes.module";
import { ProductDetailsComponent } from "./product-details.component";
import { ProductsComponent } from "./products.component";
import { ProductService } from "src/services/product.service";

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
        resolve: {
          product: (route: ActivatedRouteSnapshot) => {
            return inject(ProductService).find(
              route.paramMap.get("id") ?? ""
            );
          },
        },
      },
    ]),
  ],
  declarations: [ProductsComponent, ProductDetailsComponent],
})
export class ProductsModule {}
