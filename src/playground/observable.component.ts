import { Component } from "@angular/core";
import { Observable, from, interval, map, of, zip } from "rxjs";

// sync call
function getItem() {
  return {
    id: 1,
    name: "Item 1",
  };
}

// async call
function getItemAsync() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("From Promise");
    }, 1400);
  });
}

function getItemObservable(): Observable<any> {
  return zip(
    from([
      "item a",
      "item 2",
      "item 3",
      "item 4",
      "item 5",
      "item 6",
      "item 7",
      "item 8",
    ]),
    interval(1000)
  );
  //.pipe(map((item) => item[0].toUpperCase()));
}

@Component({
  template: `Observable component`,
})
export class ObservableDemoComponent {
  async ngOnInit() {
    getItemAsync(); //.then((value) => console.log(value));

    console.log("Before");
    getItemObservable().subscribe((value: any) => {
      console.log(value);
    });
    console.log("After");
  }
}
