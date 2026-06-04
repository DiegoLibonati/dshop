import { TestBed } from "@angular/core/testing";

import type { ComponentFixture } from "@angular/core/testing";

import SkeletonShimmerComponent from "@shared-angular/components/skeleton-shimmer/skeleton-shimmer.component";

type RenderInputs = Partial<{ rounded: boolean; loadingClass: string }>;

interface RenderResult {
  fixture: ComponentFixture<SkeletonShimmerComponent>;
  component: SkeletonShimmerComponent;
}

const renderComponent = async (inputs: RenderInputs = {}): Promise<RenderResult> => {
  await TestBed.configureTestingModule({
    imports: [SkeletonShimmerComponent],
  }).compileComponents();

  const fixture = TestBed.createComponent(SkeletonShimmerComponent);

  Object.entries(inputs).forEach(([key, value]) => {
    fixture.componentRef.setInput(key, value);
  });

  fixture.detectChanges();

  return { fixture, component: fixture.componentInstance };
};

const getShimmer = (fixture: ComponentFixture<SkeletonShimmerComponent>): HTMLDivElement => {
  const div = (fixture.nativeElement as HTMLElement).querySelector<HTMLDivElement>("div");

  if (!div) throw new Error("skeleton-shimmer div not found");

  return div;
};

describe("skeleton-shimmer.component", () => {
  describe("rendering", () => {
    it("should render a div with the base skeleton-shimmer class by default", async () => {
      const { fixture } = await renderComponent();

      const shimmer = getShimmer(fixture);

      expect(shimmer).toBeInTheDocument();
      expect(shimmer).toHaveClass("skeleton-shimmer");
    });

    it("should not include the rounded modifier by default", async () => {
      const { fixture } = await renderComponent();

      const shimmer = getShimmer(fixture);

      expect(shimmer).not.toHaveClass("skeleton-shimmer--rounded");
    });
  });

  describe("inputs", () => {
    it("should add the rounded modifier when rounded is true", async () => {
      const { fixture } = await renderComponent({ rounded: true });

      const shimmer = getShimmer(fixture);

      expect(shimmer).toHaveClass("skeleton-shimmer", "skeleton-shimmer--rounded");
    });

    it("should append the loadingClass when provided", async () => {
      const { fixture } = await renderComponent({ loadingClass: "header__search-loader" });

      const shimmer = getShimmer(fixture);

      expect(shimmer).toHaveClass("skeleton-shimmer", "header__search-loader");
    });

    it("should combine the base, rounded modifier and loadingClass", async () => {
      const { fixture } = await renderComponent({ rounded: true, loadingClass: "custom-loader" });

      const shimmer = getShimmer(fixture);

      expect(shimmer).toHaveClass("skeleton-shimmer", "skeleton-shimmer--rounded", "custom-loader");
    });
  });

  describe("classes getter", () => {
    it("should return only the base class when no modifiers are set", async () => {
      const { component } = await renderComponent();

      expect(component.classes).toBe("skeleton-shimmer");
    });

    it("should join base, rounded modifier and loadingClass in order", async () => {
      const { component } = await renderComponent({ rounded: true, loadingClass: "custom-loader" });

      expect(component.classes).toBe("skeleton-shimmer skeleton-shimmer--rounded custom-loader");
    });
  });
});
