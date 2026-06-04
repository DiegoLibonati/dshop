import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { GalleryClothesProps } from "@shared-react/types/props";

import GalleryClothes from "@shared-react/components/Galleries/GalleryClothes/GalleryClothes";

import { mockClothes } from "@tests/__mocks__/clothes.mock";

const renderComponent = (props: Partial<GalleryClothesProps> = {}): RenderResult => {
  const defaultProps: GalleryClothesProps = {
    title: "YOU MIGHT ALSO LIKE",
    clothes: mockClothes,
    onClothesClick: jest.fn(),
    ...props,
  };

  return render(<GalleryClothes {...defaultProps} />);
};

const getGrid = (container: HTMLElement): HTMLElement =>
  container.querySelector<HTMLDivElement>(".gallery-clothes__clothes")!;

const waitForMfeContentToLoad = async (): Promise<void> => {
  await waitFor(() => {
    expect(document.querySelectorAll<HTMLDivElement>(".skeleton-shimmer")).toHaveLength(0);
  });
};

beforeAll(async () => {
  await import("shared-core/sdk");
});

describe("GalleryClothes", () => {
  describe("rendering", () => {
    it("should render the gallery title", async () => {
      renderComponent({ title: "YOU MIGHT ALSO LIKE" });

      expect(screen.getByRole("heading", { name: "YOU MIGHT ALSO LIKE" })).toBeInTheDocument();

      await waitForMfeContentToLoad();
    });

    it("should render at most four items in the grid", async () => {
      const { container } = renderComponent();
      const grid = getGrid(container);

      expect(grid.querySelectorAll<HTMLDivElement>(".item-clothes")).toHaveLength(4);
      expect(await within(grid).findAllByRole("img")).toHaveLength(4);

      await waitForMfeContentToLoad();
    });

    it("should render every item in the grid when there are fewer than four", async () => {
      const { container } = renderComponent({ clothes: mockClothes.slice(0, 2) });
      const grid = getGrid(container);

      expect(grid.querySelectorAll<HTMLDivElement>(".item-clothes")).toHaveLength(2);

      await waitForMfeContentToLoad();
    });

    it("should render an empty grid when clothes is null", async () => {
      const { container } = renderComponent({ clothes: null });
      const grid = getGrid(container);

      expect(grid.querySelectorAll<HTMLDivElement>(".item-clothes")).toHaveLength(0);

      await waitForMfeContentToLoad();
    });

    it("should render an empty grid when clothes is an empty array", async () => {
      const { container } = renderComponent({ clothes: [] });
      const grid = getGrid(container);

      expect(grid.querySelectorAll<HTMLDivElement>(".item-clothes")).toHaveLength(0);

      await waitForMfeContentToLoad();
    });
  });

  describe("behavior", () => {
    it("should call onClothesClick with the clicked clothes", async () => {
      const user = userEvent.setup();
      const mockOnClothesClick = jest.fn();
      const { container } = renderComponent({ onClothesClick: mockOnClothesClick });

      const firstItem = getGrid(container).querySelector<HTMLDivElement>(".item-clothes");
      await user.click(firstItem!);

      expect(mockOnClothesClick).toHaveBeenCalledWith(mockClothes[0]);

      await waitForMfeContentToLoad();
    });
  });
});
