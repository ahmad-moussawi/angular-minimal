import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: "about-page",
  template: `
    <h1>About COmponent</h1>

    <p style="font-size: 3rem">Time is: {{ timer }}</p>
  `,
})
export class AboutComponent {
  timer = 0;

  intervalId: number = 0;

  constructor() {
    console.log("creating about");
  }

  ngOnInit() {
    console.log("about on init");

    this.intervalId = setInterval(() => {
      this.timer++;
      console.log("timer running:" + this.timer);
    }, 1000);
  }

  ngAfterViewInit() {
    console.log("about after view init");
  }

  ngOnDestroy() {
    console.log("about on destroy");

    clearInterval(this.intervalId);
  }
}
