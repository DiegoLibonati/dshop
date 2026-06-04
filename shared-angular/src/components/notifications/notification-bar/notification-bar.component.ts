import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

import type { SharedComponentModule, SvgCloseProps } from "shared-core/sdk";
import type { NotificationBarProps } from "@shared-angular/types/props";

import SharedMfeComponent from "@shared-angular/components/shared-mfe/shared-mfe.component";

@Component({
  selector: "app-notification-bar",
  standalone: true,
  imports: [CommonModule, SharedMfeComponent],
  templateUrl: "./notification-bar.component.html",
  styleUrl: "./notification-bar.component.css",
})
class NotificationBarComponent {
  @Input() language: NotificationBarProps["language"] = "en";
  @Input() className: NotificationBarProps["className"] = "";
  @Input() text: NotificationBarProps["text"] = "";
  @Input() onClose: NotificationBarProps["onClose"] = this.onDefaultClose.bind(this);

  private componentName = "app-notification-bar";

  public loadSvgClose = (): Promise<SharedComponentModule<SvgCloseProps>> =>
    import("shared-core/sdk").then((m) => m.SvgCloseModule);

  onDefaultClose(): void {
    console.log("Executed in shared_angular - onDefaultClose: ", this.componentName);
  }
}

export default NotificationBarComponent;
