import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { PipesModule } from "src/pipes/pipes.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: "login",
        component: LoginComponent,
      },
    ]),
  ],
})
export class AuthModule {}
