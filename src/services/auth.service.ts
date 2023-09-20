import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { AppStorageService } from "./appstorage.service";
import { environment } from "src/environments/environment";



@Injectable()
export class AuthService {
  constructor(public http: HttpClient, public storage: AppStorageService) {}

  login(phone: string, deviceName: string) {
    return this.http
      .post(`${environment.API_URL}/api/token`, {
        phone: phone,
        device_name: deviceName,
      })
      .pipe(
        map((response: any) => {
          this.storage.set("API_TOKEN", response.token);
          return response;
        })
      );
  }
  logout() {
    this.storage.remove("API_TOKEN");
  }

  isAuthenticated() {
    const token = this.storage.get("API_TOKEN");
    return token != null && token.length > 0;
  }

  getToken() {
    return this.storage.get("API_TOKEN");
  }
}
