import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "src/services/product.service";

@Component({
  template: `
    <div *ngIf="product">
      <h1>{{ product.name }}</h1>
      <div>
        <img
          *ngIf="product.images_sm_urls?.length"
          [src]="product.images_sm_urls[0]"
          width="400"
        />
        <a [routerLink]="'/products/' + product.id"> {{ product.name }}</a>
        <p>{{ product.description }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 2rem;
      }
    `,
  ],
})
export class ProductDetailsComponent {
  product: any = null;

  constructor(
    public productService: ProductService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      this.product = data.product;
    });

    // this.route.paramMap.subscribe((value) => {
    //   this.productService
    //     .find(value.get("id") ?? "")
    //     .subscribe((product: any) => {
    //       this.product = product;
    //     });
    // });
  }
}
