import { Injectable } from "@angular/core";
import { AppStorage } from "./storage";

@Injectable()
export class AppStorageService implements AppStorage {
  get(key: string): string | null {
    console.log("get using AppStorageService:" + key);
    return localStorage.getItem(key);
  }

  set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
