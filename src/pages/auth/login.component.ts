import { HttpClient } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { combineLatestWith } from "rxjs/operators";

@Component({
  selector: "app-login",
  template: `
    <form #formRef="ngForm" (ngSubmit)="login(formRef.value)">
      <div class="form-group">
        <input
          #phoneRef="ngModel"
          name="phone"
          required
          [minlength]="8"
          placeholder="Phone number"
          [(ngModel)]="phone"
          class="form-control"
        />

        <ng-container *ngIf="phoneRef.errors">
          <div *ngIf="phoneRef.errors['required']" class="error">
            The firstname field is required
          </div>

          <div *ngIf="phoneRef.errors['minlength']" class="error">
            The firstname should be at least
            {{ phoneRef.errors["minlength"].requiredLength }}, and you typed
            only {{ phoneRef.errors["minlength"].actualLength }} chars.
          </div>
        </ng-container>
      </div>

      <button type="submit">Log In</button>
    </form>
  `,
  styles: [
    `
      :host {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      form {
        width: 400px;
        background: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 1rem;
      }

      .form-group {
        margin-bottom: 1rem;
      }

      .form-control {
        border: 1px solid #222;
        padding: 3px;
        width: 100%;
      }

      .error {
        display: none;
      }

      .ng-touched + .error {
        display: block;
        color: red;
        font-size: 0.7rem;
        margin-bottom: 1rem;
      }

      :not(form).ng-invalid.ng-touched {
        border-left: 4px solid red;
      }

      :not(form).ng-valid {
        border-left: 4px solid green;
      }
    `,
  ],
})
export class LoginComponent {
  phone = "";
  firstname = "";
  lastname = "";

  @ViewChild("formRef") formRef!: NgForm;

  constructor(public http: HttpClient, public router: Router) {}

  log(obj: any) {
    console.log(obj);
  }

  login(data: any) {
    console.log(data);

    this.http
      .post("https://free-angular-course.ahmadmoussawi.com/api/token", {
        phone: data.phone,
        device_name: "Samsung Galaxy",
      })
      .subscribe((data: any) => {
        localStorage.setItem("API_TOKEN", data.token);

        this.router.navigate(["/"]);
      });
  }

  ngOnInit() {
    let savedValue = null;

    try {
      savedValue = JSON.parse(localStorage.getItem("loginform") ?? "");
    } catch (error) {}

    if (savedValue) {
      this.firstname = savedValue.firstname;
      this.lastname = savedValue.lastname;
    }
  }

  ngAfterViewInit() {
    console.log(this.formRef);

    if (
      this.formRef.valueChanges !== null &&
      this.formRef.statusChanges !== null
    ) {
      this.formRef.statusChanges
        .pipe(combineLatestWith(this.formRef.valueChanges))
        .subscribe(([status, value]: any) => {
          if (status === "VALID") {
            console.log(value, status);
          }
        });
    }
  }
}
