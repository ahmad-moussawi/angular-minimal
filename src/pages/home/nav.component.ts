import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AppStorageService } from "src/services/appstorage.service";

@Component({
  selector: "app-nav",
  template: `<nav>
    <a
      routerLink="/"
      routerLinkActive="active"
      [routerLinkActiveOptions]="{ exact: true }"
      >Home</a
    >
    <a track="nav products" routerLink="/products" routerLinkActive="active"
      >Products</a
    >
    <a routerLink="/about" routerLinkActive="active">About</a>
    <a routerLink="/auth/login" routerLinkActive="active">Login</a>
    <button (click)="logout()">Logout</button>
  </nav>`,
  styles: [
    `
      nav {
        display: flex;
        gap: 1.2rem;
      }

      a:hover {
        color: var(--secondary);
      }

      a.active {
        color: red;
      }
    `,
  ],
})
export class AppNav {
  constructor(public router: Router, public storage: AppStorageService) {}

  logout() {
    this.storage.remove("API_TOKEN");
    this.router.navigate(["/"]);
  }
}
