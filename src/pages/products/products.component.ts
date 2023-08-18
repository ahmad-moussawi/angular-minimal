import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { AnalyticsService } from "src/services/analytics.service";
import { AppStorageService } from "src/services/appstorage.service";

@Component({
  template: `
    <h1>Products</h1>

    <button track="Test button">Test button</button>
    <button track="Test button 2">Test button 2</button>

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

  // private http = inject(HttpClient);

  constructor(
    private http: HttpClient,
    public router: Router,
    public route: ActivatedRoute,
    public storage: AppStorageService
  ) {}

  ngOnInit() {
    const token = this.storage.get("API_TOKEN");

    this.route.queryParamMap.subscribe((queryParamsMap) => {
      const categoryId = queryParamsMap.get("category_id") ?? "";

      const productUrl = "/api/items";
      // const productUrl = "https://free-angular-course.ahmadmoussawi.com/api/items";

      this.http
        .get(productUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            category_id: categoryId,
          },
        })
        .pipe(
          catchError((err) => {
            console.error(err);

            if (err.status === 401) {
              alert("Please login to see the products");
              this.router.navigate(["/auth/login"]);
              return throwError(() => new Error("Unauthorized"));
            }

            alert("Failed to fetch products");
            return throwError(() => new Error("Failed to fetch products"));
          })
        )
        .subscribe((data: any) => {
          console.log("here");
          this.products = data.data;
        });
    });

    this.http
      .get("/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          take: 6,
          select: '["id", "name"]',
        },
      })
      .subscribe((response: any) => {
        this.categories = response.data.map((category: any) => {
          category.name = category.name.split(",").at(-1);
          return category;
        });
      });
  }
}
