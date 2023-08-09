import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "counter",
  template: `
    <pre>{{ message }}</pre>
    <button (click)="decrement()">-</button>
    {{ value }}
    <button (click)="increment()">+</button>
  `,

  styles: [
    `
      :host {
        display: block;
        padding: 1rem;
        font-size: 1rem;
      }
    `,
  ],
})
export class CounterComponent {
  @Input() value = 0;
  @Input() message: string = "";

  @Output() valueChange = new EventEmitter();

  decrement() {
    this.value = this.value - 1;

    this.valueChange.emit(this.value);
  }

  increment() {
    this.value = this.value + 1;

    this.valueChange.emit(this.value);
  }

  ngAfterViewInit() {
    console.log("value", typeof this.value);
    console.log("message", typeof this.message);
  }
}
