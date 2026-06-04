import { act, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { JSX } from "react";

import { mount, unmount } from "@shared-core/SharedCore.module";

import { useInheritedContext } from "@shared-core/hooks/useInheritedContext";

const DummyApp = (): JSX.Element => <p>shared core app</p>;

const ReplacementApp = (): JSX.Element => <p>replacement app</p>;

const NavigationApp = (): JSX.Element => {
  const context = useInheritedContext();

  return (
    <button type="button" onClick={() => context?.callbacks.onNavigate("/home")}>
      navigate
    </button>
  );
};

const ThrowingApp = (): JSX.Element => {
  throw new Error("mount failure");
};

describe("SharedCore.module", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(async () => {
    await act(async () => {
      unmount(container);
      await Promise.resolve();
    });
    container.remove();
  });

  describe("mount", () => {
    it("should render the app into the container", () => {
      act(() => {
        mount(DummyApp, container, {});
      });

      expect(within(container).getByText("shared core app")).toBeInTheDocument();
    });

    it("should wrap the app in the inherited provider when callbacks are passed", async () => {
      const user = userEvent.setup();
      const mockOnNavigate = jest.fn();

      act(() => {
        mount(NavigationApp, container, { callbacks: { onNavigate: mockOnNavigate } });
      });
      await user.click(within(container).getByRole("button", { name: "navigate" }));

      expect(mockOnNavigate).toHaveBeenCalledWith("/home");
    });

    it("should replace the previously mounted app when mounted again", () => {
      act(() => {
        mount(DummyApp, container, {});
      });
      act(() => {
        mount(ReplacementApp, container, {});
      });

      expect(within(container).getByText("replacement app")).toBeInTheDocument();
      expect(within(container).queryByText("shared core app")).not.toBeInTheDocument();
    });

    it("should call onError and render nothing when the app throws", () => {
      const mockOnError = jest.fn();
      jest.spyOn(console, "error").mockReturnValue(undefined);

      act(() => {
        mount(ThrowingApp, container, { onError: mockOnError });
      });

      expect(mockOnError).toHaveBeenCalledWith(expect.any(Error));
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("unmount", () => {
    it("should clear the rendered app when unmounted", async () => {
      act(() => {
        mount(DummyApp, container, {});
      });

      await act(async () => {
        unmount(container);
        await Promise.resolve();
      });

      expect(within(container).queryByText("shared core app")).not.toBeInTheDocument();
    });

    it("should do nothing when unmounting a container that was never mounted", async () => {
      const otherContainer = document.createElement("div");
      document.body.appendChild(otherContainer);

      await act(async () => {
        unmount(otherContainer);
        await Promise.resolve();
      });

      expect(otherContainer).toBeEmptyDOMElement();

      otherContainer.remove();
    });
  });
});
