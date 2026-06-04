import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { FooterWithSubscribeNewsletterProps } from "@shared-react/types/props";

import FooterWithSubscribeNewsletter from "@shared-react/components/Footers/FooterWithSubscribeNewsletter/FooterWithSubscribeNewsletter";

const renderComponent = (props: Partial<FooterWithSubscribeNewsletterProps> = {}): RenderResult => {
  const defaultProps: FooterWithSubscribeNewsletterProps = {
    title: "DShop",
    description: "We have clothes that suit your style.",
    onSubmitSubscribe: jest.fn(),
    ...props,
  };

  return render(<FooterWithSubscribeNewsletter {...defaultProps} />);
};

const waitForMfeContentToLoad = async (): Promise<void> => {
  await waitFor(() => {
    expect(document.querySelectorAll<HTMLDivElement>(".skeleton-shimmer")).toHaveLength(0);
  });
};

describe("FooterWithSubscribeNewsletter", () => {
  describe("rendering", () => {
    it("should render the title heading", async () => {
      renderComponent({ title: "DShop" });

      expect(screen.getByRole("heading", { name: "DShop" })).toBeInTheDocument();

      await waitForMfeContentToLoad();
    });

    it("should render the description", async () => {
      renderComponent({ description: "Premium clothing for everyone." });

      expect(screen.getByText("Premium clothing for everyone.")).toBeInTheDocument();

      await waitForMfeContentToLoad();
    });

    it("should render the copyright notice with the title", async () => {
      renderComponent({ title: "DShop" });

      expect(screen.getByText("DShop © All Rights Reserved")).toBeInTheDocument();

      await waitForMfeContentToLoad();
    });

    it("should render the payments image", async () => {
      renderComponent();

      expect(screen.getByRole("img", { name: "payments" })).toBeInTheDocument();

      await waitForMfeContentToLoad();
    });

    it("should render the provided children in the links section", async () => {
      renderComponent({ children: <span>Footer Links Content</span> });

      expect(screen.getByText("Footer Links Content")).toBeInTheDocument();

      await waitForMfeContentToLoad();
    });
  });

  describe("social links", () => {
    it("should render the social links for the provided social urls", async () => {
      renderComponent({
        instagram: "https://instagram.com/dshop",
        facebook: "https://facebook.com/dshop",
        twitter: "https://x.com/dshop",
      });

      expect(await screen.findByRole("link", { name: "social media instagram" })).toHaveAttribute(
        "href",
        "https://instagram.com/dshop"
      );
      expect(screen.getByRole("link", { name: "social media facebook" })).toHaveAttribute(
        "href",
        "https://facebook.com/dshop"
      );
      expect(screen.getByRole("link", { name: "social media twitter" })).toHaveAttribute(
        "href",
        "https://x.com/dshop"
      );

      await waitForMfeContentToLoad();
    });

    it("should not render any social links when no social url is provided", async () => {
      renderComponent();

      await waitForMfeContentToLoad();

      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should call onSubmitSubscribe with the input value when the newsletter form is submitted", async () => {
      const user = userEvent.setup();
      const mockOnSubmitSubscribe = jest.fn();
      renderComponent({ onSubmitSubscribe: mockOnSubmitSubscribe });

      await user.type(screen.getByRole("textbox"), "fan@mail.com");
      const submitButton = await screen.findByRole("button", {
        name: "submit button subscribe newsletter",
      });
      await user.click(submitButton);

      expect(mockOnSubmitSubscribe).toHaveBeenCalledWith("fan@mail.com");
    });
  });
});
