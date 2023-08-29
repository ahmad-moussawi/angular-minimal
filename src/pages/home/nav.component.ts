import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/services/auth.service";

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
    <a routerLink="/search" routerLinkActive="active">Search</a>
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
  constructor(public router: Router, public auth: AuthService) {}

  logout() {
    this.auth.logout();
    this.router.navigate(["/"]);
  }
}
