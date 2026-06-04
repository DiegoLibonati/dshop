import { Component, ViewEncapsulation } from "@angular/core";

import AppTestComponent from "@shared-angular/components/app-test/app-test.component";

@Component({
  selector: "app-test-page",
  standalone: true,
  imports: [AppTestComponent],
  encapsulation: ViewEncapsulation.None,
  template: "<app-test></app-test>",
})
class AppTestPageComponent {}

export default AppTestPageComponent;
