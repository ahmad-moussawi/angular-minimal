import { Component } from "@angular/core";

@Component({
  selector: "app-header",
  template: `
    <a>My Logo</a>
    <app-nav />
  `,
  styles: [
    `
      :host {
        background: white;
        display: flex;
        justify-content: space-between;
        padding: 1rem;
      }

      a {
        color: red;
      }
    `,
  ],
})
export class AppHeader {}
