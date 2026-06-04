import { Component, Input } from "@angular/core";
import { waitFor, within } from "@testing-library/dom";

import { createComponentMount } from "@shared-angular/helpers/createComponentMount";

import { mockCallbacks } from "@tests/__mocks__/callbacks.mock";

@Component({
  selector: "cmp-mount-test",
  standalone: true,
  template: `<span class="mount-label">{{ label }}</span>`,
})
class MountTestComponent {
  @Input() label = "default";
}

interface MountProps {
  label: string;
}

const flushPendingMount = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 100));

describe("createComponentMount", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it("should expose mount and unmount functions", () => {
    const module = createComponentMount<MountProps>(MountTestComponent);

    expect(typeof module.mount).toBe("function");
    expect(typeof module.unmount).toBe("function");
  });

  describe("mount", () => {
    it("should tag the container with the default shared-angular dataset", () => {
      const { mount } = createComponentMount<MountProps>(MountTestComponent);

      mount(container, { label: "a" });

      expect(container.dataset.mfe).toBe("shared-angular");
    });

    it("should allow overriding the dataset via options", () => {
      const { mount } = createComponentMount<MountProps>(MountTestComponent);

      mount(container, { label: "a" }, { dataset: { mfe: "shared-react" } });

      expect(container.dataset.mfe).toBe("shared-react");
    });

    it("should render the component with the provided inputs", async () => {
      const { mount } = createComponentMount<MountProps>(MountTestComponent);

      mount(container, { label: "hello" }, { callbacks: mockCallbacks });

      await waitFor(() => {
        expect(within(container).getByText("hello")).toBeInTheDocument();
      });
    });

    it("should ignore props that are not component inputs", async () => {
      const { mount } = createComponentMount<MountProps & { unknown: string }>(MountTestComponent);

      mount(container, { label: "filtered", unknown: "ignored" });

      await waitFor(() => {
        expect(within(container).getByText("filtered")).toBeInTheDocument();
      });
    });

    it("should update inputs on an already mounted container without recreating it", async () => {
      const { mount } = createComponentMount<MountProps>(MountTestComponent);

      mount(container, { label: "first" });
      await waitFor(() => {
        expect(within(container).getByText("first")).toBeInTheDocument();
      });

      mount(container, { label: "second" });
      await waitFor(() => {
        expect(within(container).getByText("second")).toBeInTheDocument();
      });

      expect(container.querySelectorAll<HTMLSpanElement>(".mount-label")).toHaveLength(1);
    });
  });

  describe("unmount", () => {
    it("should destroy the mounted component", async () => {
      const { mount, unmount } = createComponentMount<MountProps>(MountTestComponent);

      mount(container, { label: "bye" });
      await waitFor(() => {
        expect(within(container).getByText("bye")).toBeInTheDocument();
      });

      unmount(container);

      await waitFor(() => {
        expect(within(container).queryByText("bye")).not.toBeInTheDocument();
      });
    });

    it("should cancel a pending mount when unmounted before it resolves", async () => {
      const { mount, unmount } = createComponentMount<MountProps>(MountTestComponent);

      mount(container, { label: "never" });
      unmount(container);
      await flushPendingMount();

      expect(container.querySelector<HTMLSpanElement>(".mount-label")).toBeNull();
    });

    it("should remount cleanly after a cancelled mount", async () => {
      const { mount, unmount } = createComponentMount<MountProps>(MountTestComponent);

      mount(container, { label: "cancelled" });
      unmount(container);
      await flushPendingMount();

      mount(container, { label: "remounted" });

      await waitFor(() => {
        expect(within(container).getByText("remounted")).toBeInTheDocument();
      });
    });
  });
});
