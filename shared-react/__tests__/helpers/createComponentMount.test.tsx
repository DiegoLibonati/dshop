import { act, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useInheritedContext } from "shared-core/sdk";

import type { JSX } from "react";

import { createComponentMount } from "@shared-react/helpers/createComponentMount";

interface DummyProps {
  label: string;
}

const DummyComponent = ({ label }: DummyProps): JSX.Element => <p>{label}</p>;

const NavigationConsumer = (): JSX.Element => {
  const context = useInheritedContext();

  return (
    <button type="button" onClick={() => context?.callbacks.onNavigate("/next")}>
      navigate
    </button>
  );
};

const ThrowingComponent = (): JSX.Element => {
  throw new Error("render failure");
};

describe("createComponentMount", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("mount", () => {
    it("should render the component into the container", () => {
      const { mount } = createComponentMount(DummyComponent);

      act(() => {
        mount(container, { label: "hello world" });
      });

      expect(within(container).getByText("hello world")).toBeInTheDocument();
    });

    it("should mark the container with the shared-react mfe dataset by default", () => {
      const { mount } = createComponentMount(DummyComponent);

      act(() => {
        mount(container, { label: "default dataset" });
      });

      expect(container.dataset.mfe).toBe("shared-react");
    });

    it("should mark the container with the provided mfe dataset", () => {
      const { mount } = createComponentMount(DummyComponent);

      act(() => {
        mount(container, { label: "custom dataset" }, { dataset: { mfe: "shared-angular" } });
      });

      expect(container.dataset.mfe).toBe("shared-angular");
    });

    it("should update the rendered component when mount is called again with new props", () => {
      const { mount } = createComponentMount(DummyComponent);

      act(() => {
        mount(container, { label: "first render" });
      });
      act(() => {
        mount(container, { label: "second render" });
      });

      expect(within(container).getByText("second render")).toBeInTheDocument();
      expect(within(container).queryByText("first render")).not.toBeInTheDocument();
    });

    it("should wrap the component in the inherited provider when callbacks are passed", async () => {
      const user = userEvent.setup();
      const mockOnNavigate = jest.fn();
      const { mount } = createComponentMount(NavigationConsumer);

      act(() => {
        mount(container, {}, { callbacks: { onNavigate: mockOnNavigate } });
      });
      await user.click(within(container).getByRole("button", { name: "navigate" }));

      expect(mockOnNavigate).toHaveBeenCalledWith("/next");
    });

    it("should reuse the previous options when mount is called again without options", async () => {
      const user = userEvent.setup();
      const mockOnNavigate = jest.fn();
      const { mount } = createComponentMount(NavigationConsumer);

      act(() => {
        mount(container, {}, { callbacks: { onNavigate: mockOnNavigate } });
      });
      act(() => {
        mount(container, {});
      });
      await user.click(within(container).getByRole("button", { name: "navigate" }));

      expect(mockOnNavigate).toHaveBeenCalledWith("/next");
    });

    it("should call onError and render nothing when the component throws", () => {
      const mockOnError = jest.fn();
      jest.spyOn(console, "error").mockReturnValue(undefined);
      const { mount } = createComponentMount(ThrowingComponent);

      act(() => {
        mount(container, {}, { onError: mockOnError });
      });

      expect(mockOnError).toHaveBeenCalledWith(expect.any(Error));
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("unmount", () => {
    it("should clear the rendered component when unmounted", () => {
      const { mount, unmount } = createComponentMount(DummyComponent);

      act(() => {
        mount(container, { label: "to be removed" });
      });
      act(() => {
        unmount(container);
      });

      expect(within(container).queryByText("to be removed")).not.toBeInTheDocument();
    });

    it("should do nothing when unmounting a container that was never mounted", () => {
      const { unmount } = createComponentMount(DummyComponent);
      const otherContainer = document.createElement("div");
      document.body.appendChild(otherContainer);

      act(() => {
        unmount(otherContainer);
      });

      expect(otherContainer).toBeEmptyDOMElement();

      otherContainer.remove();
    });
  });
});
