import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

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

  constructor(public http: HttpClient, public route: ActivatedRoute) {}

  ngOnInit() {
    const token = localStorage.getItem("API_TOKEN");

    this.route.paramMap.subscribe((value) => {
      this.http
        .get("/api/items", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accepts: "application/json",
          },
          params: {
            filter: JSON.stringify(["id", "=", value.get("id")]),
          },
        })
        .subscribe((data: any) => {
          this.product = data.data[0];
          console.log("product ready");
        });
    });
  }
}
