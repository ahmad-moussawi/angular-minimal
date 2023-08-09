import { Component } from "@angular/core";

@Component({
  selector: "app-nav",
  template: `<nav>
    <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
    <a routerLinkActive="active">Products</a>
    <a routerLink="/about" routerLinkActive="active">About</a>
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
export class AppNav {}
