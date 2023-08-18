import { Directive, HostListener, Input } from "@angular/core";
import { AnalyticsService } from "src/services/analytics.service";

@Directive({
  selector: "[track]",
})
export class TrackDirective {
  @Input() track = "";

  constructor(public analytics: AnalyticsService) {}

  @HostListener("click")
  ahmadClick() {
    this.analytics.log(this.track);
  }
}
