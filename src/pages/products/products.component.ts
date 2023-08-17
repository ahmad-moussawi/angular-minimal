import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

@Component({
  template: `
    <h1>Products</h1>

    <div class="products-container">
      <a
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
        <p>{{ product.description }}</p>
      </a>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 2rem;
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

  // private http = inject(HttpClient);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem("API_TOKEN");

    this.http
      .get("/api/items", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accepts: "application/json",
        },
      })
      .subscribe((data: any) => {
        this.products = data.data;
      });
  }
}
