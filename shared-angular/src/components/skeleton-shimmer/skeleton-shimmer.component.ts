import { Component, Input, ViewEncapsulation } from "@angular/core";

import "@shared-core/components/Skeletons/SkeletonShimmer/SkeletonShimmer.css";

@Component({
  selector: "app-skeleton-shimmer",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./skeleton-shimmer.component.html",
})
class SkeletonShimmerComponent {
  @Input() rounded = false;
  @Input() loadingClass?: string;

  get classes(): string {
    return ["skeleton-shimmer", this.rounded && "skeleton-shimmer--rounded", this.loadingClass]
      .filter(Boolean)
      .join(" ");
  }
}

export default SkeletonShimmerComponent;
