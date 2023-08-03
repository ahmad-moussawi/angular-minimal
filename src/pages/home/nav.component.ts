import { Component } from "@angular/core";

@Component({
  selector: "app-nav",
  template: `<nav>
    <a>Home</a>
    <a>Products</a>
    <a>About</a>
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
    `,
  ],
})
export class AppNav {}
