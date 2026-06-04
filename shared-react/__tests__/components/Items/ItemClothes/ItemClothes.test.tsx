import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { ItemClothesProps } from "@shared-react/types/props";

import ItemClothes from "@shared-react/components/Items/ItemClothes/ItemClothes";

const renderComponent = (props: Partial<ItemClothesProps> = {}): RenderResult => {
  const defaultProps: ItemClothesProps = {
    src: "https://example.com/shirt.png",
    name: "Casual White T-Shirt",
    rate: 4.5,
    price: 120,
    discount: 10,
    ...props,
  };

  return render(<ItemClothes {...defaultProps} />);
};

const waitForMfeContentToLoad = async (): Promise<void> => {
  await waitFor(() => {
    expect(document.querySelectorAll<HTMLDivElement>(".skeleton-shimmer")).toHaveLength(0);
  });
};

describe("ItemClothes", () => {
  describe("rendering", () => {
    it("should apply the pointer modifier class when onClick is provided", async () => {
      const { container } = renderComponent({ onClick: jest.fn() });

      expect(container.querySelector<HTMLDivElement>(".item-clothes")).toHaveClass(
        "item-clothes--pointer"
      );

      await waitForMfeContentToLoad();
    });

    it("should not apply the pointer modifier class when onClick is omitted", async () => {
      const { container } = renderComponent();

      expect(container.querySelector<HTMLDivElement>(".item-clothes")).not.toHaveClass(
        "item-clothes--pointer"
      );

      await waitForMfeContentToLoad();
    });

    it("should render the clothes image using the name as alt text", async () => {
      renderComponent({ name: "Blue Denim Jacket", src: "https://example.com/jacket.png" });

      const image = await screen.findByRole("img", { name: "Blue Denim Jacket" });

      expect(image).toHaveAttribute("src", "https://example.com/jacket.png");

      await waitForMfeContentToLoad();
    });

    it("should render the clothes information with the name", async () => {
      renderComponent({ name: "Blue Denim Jacket" });

      expect(await screen.findByRole("heading", { name: "Blue Denim Jacket" })).toBeInTheDocument();

      await waitForMfeContentToLoad();
    });
  });

  describe("behavior", () => {
    it("should call onClick when the item is clicked", async () => {
      const user = userEvent.setup();
      const mockOnClick = jest.fn();
      const { container } = renderComponent({ onClick: mockOnClick });

      const item = container.querySelector<HTMLDivElement>(".item-clothes");
      await user.click(item!);

      expect(mockOnClick).toHaveBeenCalledTimes(1);

      await waitForMfeContentToLoad();
    });
  });
});
