import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <app-header />
    <app-banners />

    <!-- example of swiper that should not be affected by inner component -->
    <div class="swiper" style="width: 100%">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide" style="width: 100%; height: 200px">A</div>
        <div class="swiper-slide" style="width: 100%; height: 200px">B</div>
        <div class="swiper-slide" style="width: 100%; height: 200px">C</div>
      </div>
    </div>
  `,
})
export class AppComponent {}
