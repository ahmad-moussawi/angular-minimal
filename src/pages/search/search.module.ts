import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchComponent } from "./search.component";
import { RouterModule } from "@angular/router";
import { DirectivesModule } from "src/directives/directives.module";
import { PipesModule } from "src/pipes/pipes.module";
import { IsAuthenticatedGuard } from "src/guards/is_authenticated.guard";

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: "",
        component: SearchComponent,
        canActivate: [IsAuthenticatedGuard],
      },
    ]),
  ],
  declarations: [SearchComponent],
})
export class SearchModule {}
