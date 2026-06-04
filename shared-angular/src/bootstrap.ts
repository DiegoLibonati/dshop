import "zone.js";
import { bootstrapApplication } from "@angular/platform-browser";

import AppTestPageComponent from "@shared-angular/pages/app-test-page/app-test-page.component";

import { MFE_CALLBACKS } from "@shared-angular/tokens/mfe-callbacks.token";

import "@shared-angular/index.css";

const root = document.getElementById("root")! as HTMLDivElement;
const host = document.createElement("app-test-page");
root.appendChild(host);

bootstrapApplication(AppTestPageComponent, {
  providers: [
    {
      provide: MFE_CALLBACKS,
      useValue: {
        onNavigate: (path: string): void => {
          window.location.href = path;
        },
      },
    },
  ],
}).catch(() => {
  // Empty fn
});
