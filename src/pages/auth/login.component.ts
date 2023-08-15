import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { combineLatestWith } from "rxjs/operators";

@Component({
  selector: "app-login",
  template: `
    <form #formRef="ngForm" (ngSubmit)="save(formRef.value)">
      <pre>{{ formRef.value | json }}</pre>
      <div class="form-group">
        <input
          #firstNameRef="ngModel"
          name="firstname"
          required
          minlength="3"
          placeholder="First name"
          [(ngModel)]="firstname"
          class="form-control"
        />

        <div *ngIf="$any(firstNameRef.errors)?.required" class="error">
          The firstname field is required
        </div>

        <div *ngIf="firstNameRef.errors?.['minlength']" class="error">
          The firstname should be at least
          {{ $any(firstNameRef.errors)?.minlength.requiredLength }}, and you
          typed only
          {{ $any(firstNameRef.errors)?.minlength.actualLength }} chars.
        </div>
      </div>

      <div class="form-group">
        <input
          #lastNameRef="ngModel"
          name="lastname"
          required
          minlength="3"
          placeholder="Last name"
          [(ngModel)]="lastname"
          class="form-control"
        />

        <div *ngIf="$any(lastNameRef.errors)?.required" class="error">
          The lastname field is required
        </div>
        <div *ngIf="$any(lastNameRef.errors)?.minlength" class="error">
          The lastname should be at least
          {{ $any(lastNameRef.errors)?.minlength.requiredLength }}, and you
          typed only
          {{ $any(lastNameRef.errors)?.minlength.actualLength }} chars.
        </div>
      </div>

      <button type="button" (click)="log(firstNameRef)">log</button>
      <button type="submit">Save</button>
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
  firstname = "";
  lastname = "";

  @ViewChild("formRef") formRef!: NgForm;

  log(obj: any) {
    console.log(obj);
  }

  save(data: any) {
    console.log(data);
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
