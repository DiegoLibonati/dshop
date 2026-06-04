import { render, waitFor } from "@testing-library/vue";

import type { RenderResult } from "@testing-library/vue";
import type { ImageViewerArticleProps } from "@product-detail/types/props";

import ImageViewerArticle from "@product-detail/components/ImageViewerArticle/ImageViewerArticle.vue";

import { mockImages } from "@tests/__mocks__/product.mock";
import { ImageWithBackgroundColorModule } from "@tests/__mocks__/sharedCoreSdk.mock";

interface SharedImageCall {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

const SHOWING_CLASS = "image-viewer__showing-img";
const THUMBNAIL_CLASS = "image-viewer__to-show-img";

const renderComponent = (props: ImageViewerArticleProps): RenderResult =>
  render(ImageViewerArticle, { props });

const sharedImageCalls = (className: string): SharedImageCall[] =>
  ImageWithBackgroundColorModule.mount.mock.calls
    .map((call) => call[1] as SharedImageCall)
    .filter((props) => props.className === className);

describe("ImageViewerArticle", () => {
  describe("rendering", () => {
    it("should mount a shared image for the showing image and each visible thumbnail", async () => {
      renderComponent({ images: mockImages });

      await waitFor(() => expect(ImageWithBackgroundColorModule.mount).toHaveBeenCalledTimes(4));
    });

    it("should limit the thumbnails to the first three images", async () => {
      renderComponent({ images: mockImages });

      await waitFor(() => expect(ImageWithBackgroundColorModule.mount).toHaveBeenCalled());

      expect(sharedImageCalls(THUMBNAIL_CLASS)).toHaveLength(3);
    });

    it("should show the first image in the showing slot", async () => {
      renderComponent({ images: mockImages });

      await waitFor(() => expect(sharedImageCalls(SHOWING_CLASS)).toHaveLength(1));

      const showingProps = sharedImageCalls(SHOWING_CLASS)[0]!;
      expect(showingProps.src).toBe(mockImages[0]!.src);
      expect(showingProps.alt).toBe(mockImages[0]!.alt);
    });
  });

  describe("behavior", () => {
    it("should update the showing image when a thumbnail is clicked", async () => {
      renderComponent({ images: mockImages });

      await waitFor(() => expect(sharedImageCalls(THUMBNAIL_CLASS)).toHaveLength(3));

      const secondThumb = sharedImageCalls(THUMBNAIL_CLASS).find(
        (props) => props.src === mockImages[1]!.src
      );
      secondThumb?.onClick?.();

      await waitFor(() => {
        const showingCalls = sharedImageCalls(SHOWING_CLASS);
        expect(showingCalls[showingCalls.length - 1]?.src).toBe(mockImages[1]!.src);
      });
    });
  });

  describe("edge cases", () => {
    it("should still mount the showing image with an empty source when there are no images", async () => {
      renderComponent({ images: [] });

      await waitFor(() => expect(ImageWithBackgroundColorModule.mount).toHaveBeenCalledTimes(1));

      expect(sharedImageCalls(SHOWING_CLASS)[0]!.src).toBe("");
    });
  });
});
