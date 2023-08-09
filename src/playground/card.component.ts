import { Component, Input } from "@angular/core";

@Component({
  selector: "card",
  template: `
    <div class="header">{{ productName }}</div>

    <div class="body">
      <ng-content select="[description]" />
    </div>

    <div class="footer">
      <ng-content select="[actions]" />
    </div>
  `,

  styles: [
    `
      :host {
        display: block;
        border: 1px solid #000;
        padding: 1rem;
        margin: 0.5rem 1rem;
      }

      .header {
        font-weight: bold;
        margin-bottom: 1rem;
      }

      .footer {
        outline: 1px solid red;
      }

      .body {
        color: red;
      }

      span {
        color: red;
      }
    `,
  ],
})
export class CardComponent {
  @Input() productName = "";
}
