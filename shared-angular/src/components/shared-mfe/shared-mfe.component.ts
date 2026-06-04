import { Component, Input, ViewChild, ViewEncapsulation, inject, signal } from "@angular/core";

import type { ElementRef, AfterViewInit, OnDestroy, WritableSignal } from "@angular/core";
import type { SharedComponentModule } from "shared-core/sdk";

import SkeletonShimmerComponent from "@shared-angular/components/skeleton-shimmer/skeleton-shimmer.component";

import { MFE_CALLBACKS } from "@shared-angular/tokens/mfe-callbacks.token";

@Component({
  selector: "app-shared-mfe",
  standalone: true,
  imports: [SkeletonShimmerComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./shared-mfe.component.html",
})
class SharedMfeComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) loader!: () => Promise<SharedComponentModule>;
  @Input({ required: true }) componentProps!: Record<string, unknown>;
  @Input() wrapperClass?: string;
  @Input() loadingClass?: string;

  @ViewChild("container", { static: true }) containerRef!: ElementRef<HTMLElement>;

  readonly status: WritableSignal<"loading" | "mounted" | "error"> = signal("loading");

  private callbacks = inject(MFE_CALLBACKS);
  private module: SharedComponentModule | null = null;

  get resolvedWrapperClass(): string | undefined {
    if (this.wrapperClass) return this.wrapperClass;
    const className = (this.componentProps as { className?: unknown }).className;
    return typeof className === "string" && className ? `${className}-wrapper` : undefined;
  }

  ngAfterViewInit(): void {
    void this.loadAndMount();
  }

  private async loadAndMount(): Promise<void> {
    try {
      const mod = await this.loader();
      mod.mount(this.containerRef.nativeElement, this.componentProps, {
        callbacks: this.callbacks,
      });
      this.module = mod;
      this.status.set("mounted");
    } catch (error) {
      console.error("[Shared MFE Load Error]", error);
      this.status.set("error");
    }
  }

  ngOnDestroy(): void {
    if (this.module) {
      this.module.unmount(this.containerRef.nativeElement);
      this.module = null;
    }
  }
}

export default SharedMfeComponent;
