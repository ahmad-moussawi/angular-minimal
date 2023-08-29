import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class ProductService {
  constructor(public http: HttpClient, public router: Router) {}

  get(categoryId: string) {
    return this.http
      .get("/api/items", {
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
      );
  }

  find(id: string) {
    return this.http
      .get("/api/items", {
        params: {
          filter: JSON.stringify(["id", "=", id]),
        },
      })
      .pipe(
        map((response: any) => {
          console.log(response);
          if (response && response.data && response.data.length > 0) {
            return response.data[0];
          }

          return null;
        })
      );
  }

  getCategories() {
    return this.http
      .get("/api/categories", {
        params: {
          take: 6,
          select: '["id", "name"]',
        },
      })
      .pipe(
        map((response: any) => {
          response.data = response.data.map((category: any) => {
            category.name = category.name.split(",").at(-1);
            return category;
          });

          return response;
        })
      );
  }
}
