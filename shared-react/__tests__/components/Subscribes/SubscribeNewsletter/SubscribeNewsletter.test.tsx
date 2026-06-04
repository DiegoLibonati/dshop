import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { SubscribeNewsletterProps } from "@shared-react/types/props";

import SubscribeNewsletter from "@shared-react/components/Subscribes/SubscribeNewsletter/SubscribeNewsletter";

const renderComponent = (props: Partial<SubscribeNewsletterProps> = {}): RenderResult => {
  const defaultProps: SubscribeNewsletterProps = {
    title: "STAY UPTO DATE ABOUT OUR LATEST OFFERS",
    submitLabel: "Subscribe to Newsletter",
    onSubmit: jest.fn(),
    ...props,
  };

  return render(<SubscribeNewsletter {...defaultProps} />);
};

const waitForMfeContentToLoad = async (): Promise<void> => {
  await waitFor(() => {
    expect(document.querySelectorAll<HTMLDivElement>(".skeleton-shimmer")).toHaveLength(0);
  });
};

describe("SubscribeNewsletter", () => {
  describe("rendering", () => {
    it("should render the title", async () => {
      renderComponent({ title: "Stay in the loop" });

      expect(screen.getByRole("heading", { name: "Stay in the loop" })).toBeInTheDocument();

      await waitForMfeContentToLoad();
    });

    it("should render the email input with its placeholder", async () => {
      renderComponent();

      expect(screen.getByRole("textbox")).toHaveAttribute(
        "placeholder",
        "Enter your email address"
      );

      await waitForMfeContentToLoad();
    });

    it("should render the submit button with the submit label", async () => {
      renderComponent({ submitLabel: "Join now" });

      const submitButton = await screen.findByRole("button", {
        name: "submit button subscribe newsletter",
      });

      expect(submitButton).toHaveTextContent("Join now");
    });
  });

  describe("behavior", () => {
    it("should update the input value as the user types", async () => {
      const user = userEvent.setup();
      renderComponent();

      const input = screen.getByRole("textbox");
      await user.type(input, "user@mail.com");

      expect(input).toHaveValue("user@mail.com");

      await waitForMfeContentToLoad();
    });

    it("should call onSubmit with the input value when the form is submitted", async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn();
      renderComponent({ onSubmit: mockOnSubmit });

      await user.type(screen.getByRole("textbox"), "user@mail.com");
      const submitButton = await screen.findByRole("button", {
        name: "submit button subscribe newsletter",
      });
      await user.click(submitButton);

      expect(mockOnSubmit).toHaveBeenCalledWith("user@mail.com");
    });

    it("should call onSubmit with an empty string when submitted without typing", async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn();
      renderComponent({ onSubmit: mockOnSubmit });

      const submitButton = await screen.findByRole("button", {
        name: "submit button subscribe newsletter",
      });
      await user.click(submitButton);

      expect(mockOnSubmit).toHaveBeenCalledWith("");
    });
  });
});
