import { NgModule } from "@angular/core";
import { TrackDirective } from "./track.directive";

@NgModule({
  declarations: [TrackDirective],
  exports: [TrackDirective],
})
export class DirectivesModule {}
