import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "truncate" })
export class TruncatePipe implements PipeTransform {
  transform(value: string, size = 100, ending = "...") {
    if (!value || typeof value !== "string") {
      return "";
    }

    if (value.length < size) {
      return value;
    }

    return value.substring(0, size) + ending;
  }
}
