import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "src/services/product.service";

@Component({
  template: `
    <h1>Products</h1>

    <nav>
      <a
        [track]="'Clicked on category : ' + category.name"
        routerLink="."
        [queryParams]="{ category_id: category.id }"
        *ngFor="let category of categories"
      >
        {{ category.name }}
      </a>
    </nav>

    <div class="products-container">
      <!-- <product-card *ngFor="let item of products" [product]="item" /> -->

      <a
        [track]="'clicked on product: ' + product.name"
        [routerLink]="'/products/' + product.id"
        class="product-card"
        *ngFor="let product of products"
      >
        <img
          *ngIf="product.images_sm_urls?.length"
          [src]="product.images_sm_urls[0]"
          width="400"
        />
        <h3>{{ product.name }}</h3>
        <h2>{{ product.price | currency : "AED" }}</h2>
        <h3>
          Last updated on: {{ product.updated_at | date : "EEE, dd MMM yyyy" }}
        </h3>
        <p>{{ product.description | truncate }}</p>
      </a>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 2rem;
      }

      nav {
        display: flex;
        gap: 0.8rem;
        margin-bottom: 2rem;
      }

      .products-container {
        display: flex;
        gap: 4rem 2rem;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      .product-card {
        max-width: 400px;
        text-decoration: none;
        color: #222;
      }

      .product-card:hover {
        color: #0072bc;
      }
    `,
  ],
})
export class ProductsComponent {
  products: any[] = [];
  categories: any[] = [];

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public productService: ProductService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((queryParamsMap) => {
      const categoryId = queryParamsMap.get("category_id") ?? "";

      this.productService
        .get({ category_id: categoryId })
        .subscribe((data: any) => {
          this.products = data.data;
        });
    });

    this.productService.getCategories().subscribe((response: any) => {
      this.categories = response.data;
    });
  }
}
