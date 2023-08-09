import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <app-header />
    <router-outlet />
  `,
})
export class AppComponent {
  counter2 = 10;

  printValue(value: number) {
    console.log("value changed in counter: " + value);
  }
}
