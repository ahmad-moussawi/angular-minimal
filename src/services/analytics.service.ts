import { Injectable } from "@angular/core";

@Injectable()
export class AnalyticsService {
  log(message: string) {
    console.log("[ANALYTICS] " + message);
  }
}
