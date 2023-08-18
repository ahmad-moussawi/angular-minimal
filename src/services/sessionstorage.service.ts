import { Injectable } from "@angular/core";
import { AppStorage } from "./storage";

@Injectable()
export class SessionStorageService implements AppStorage {
  get(key: string): string | null {
    console.log("get using SessionStorageService:" + key);
    return sessionStorage.getItem(key);
  }

  set(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}
