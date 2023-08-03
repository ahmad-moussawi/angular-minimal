import { Component, ElementRef, ViewChild } from "@angular/core";
import Swiper from "swiper";

@Component({
  selector: "app-banners",
  template: `
    <div class="swiper" #mySwiper>
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div
          *ngFor="let banner of banners"
          class="swiper-slide"
          [ngStyle]="{
            backgroundImage: 'url(' + banner.image + ')',
            backgroundSize: banner.size,
            backgroundColor: banner.color,
            filter: banner.hue,
          }"
        ></div>
      </div>
    </div>
  `,
  styles: [
    `
      .swiper {
        width: 100%;
        height: 400px;
      }

      .swiper-slide {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }
    `,
  ],
})
export class AppBanners {
  @ViewChild("mySwiper") mySwiper!: ElementRef<HTMLDivElement>;

  banners = [
    {
      image: "/assets/banner-01.jpg",
      size: "contain",
      color: "#ea9203",
      hue: `hue-rotate(${Math.random() * 360}deg)`,
    },
    {
      image: "/assets/banner-02.jpg",
      size: "contain",
      color: "white",
      hue: "hue-rotate(0deg)",
    },
    {
      image: "/assets/banner-03.jpg",
      size: "contain",
      color: "white",
      hue: "hue-rotate(0deg)",
    },
  ];

  ngAfterViewInit() {
    const swiper = new Swiper(this.mySwiper.nativeElement);
  }
}
