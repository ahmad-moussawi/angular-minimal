import { Component } from "@angular/core";
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  startWith,
  tap,
} from "rxjs";
import { ProductService } from "src/services/product.service";

@Component({
  template: `
    <!-- <div
      style="display: grid; grid-template-columns: 1fr 1fr 1fr; grid-template-columns: 1fr 1fr 1fr"
    >
      <button (click)="search.next('1')">1</button>
      <button (click)="search.next('2')">2</button>
      <button (click)="search.next('3')">3</button>
      <button (click)="search.next('4')">4</button>
      <button (click)="search.next('5')">5</button>
      <button (click)="search.next('6')">6</button>
      <button (click)="search.next('7')">7</button>
      <button (click)="search.next('8')">8</button>
      <button (click)="search.next('9')">9</button>
    </div> -->

    <input type="text" (keyup)="onChange($event)" />

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
  styleUrls: ["./search.css"],
})
export class SearchComponent {
  products: any[] = [];

  search = new Subject<string>();

  constructor(public productService: ProductService) {}

  ngOnInit() {
    this.search
      .pipe(
        tap((value) => {
          // console.log("before: " + value);
        }),
        startWith("Shoe"),
        filter((value) => value.length > 2),
        debounceTime(300),
        distinctUntilChanged(),
        tap((value) => {
          console.log("after: " + value);
        })
      )
      .subscribe((value) => {
        this.productService
          .get({ q: value, requireTotalCount: "1" })
          .subscribe((data: any) => {
            // console.log(data);
            this.products = data.data;
          });
      });
  }

  onChange(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;

    this.search.next(value);
  }
}
