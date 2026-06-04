import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

import type { RateStarsProps, SharedComponentModule } from "shared-core/sdk";
import type { ReviewCustomerProps } from "@shared-angular/types/props";

import SharedMfeComponent from "@shared-angular/components/shared-mfe/shared-mfe.component";

@Component({
  selector: "app-review-customer",
  standalone: true,
  imports: [CommonModule, SharedMfeComponent],
  templateUrl: "./review-customer.component.html",
  styleUrl: "./review-customer.component.css",
})
class ReviewCustomerComponent {
  @Input() name: ReviewCustomerProps["name"] = "";
  @Input() description: ReviewCustomerProps["description"] = "";
  @Input() maxStars: ReviewCustomerProps["maxStars"] = 5;
  @Input() valueStars: ReviewCustomerProps["valueStars"] = 0;
  @Input() language: ReviewCustomerProps["language"] = "en";
  @Input() className: ReviewCustomerProps["className"] = "";

  public inColorStars = "#FFC633";
  public outColorStars = "#FFFFFF";

  public loadRateStars = (): Promise<SharedComponentModule<RateStarsProps>> =>
    import("shared-core/sdk").then((m) => m.RateStarsModule);
}

export default ReviewCustomerComponent;
