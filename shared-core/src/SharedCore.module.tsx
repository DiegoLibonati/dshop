import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import type { ComponentType } from "react";
import type { Root } from "react-dom/client";
import type { MfeMountOptions } from "@shared-core/types/mfe";

import MfeErrorBoundary from "@shared-core/components/MfeErrorBoundary/MfeErrorBoundary";

import { InheritedProvider } from "@shared-core/contexts/InheritedContext/InheritedProvider";

const roots = new Map<HTMLElement, Root>();

const mount = (App: ComponentType, container: HTMLElement, options: MfeMountOptions): void => {
  const existingRoot = roots.get(container);
  if (existingRoot) {
    roots.delete(container);
    existingRoot.unmount();
  }

  const root = createRoot(container);
  roots.set(container, root);

  root.render(
    <StrictMode>
      <MfeErrorBoundary onError={options.onError}>
        {options.callbacks ? (
          <InheritedProvider callbacks={options.callbacks}>
            <App />
          </InheritedProvider>
        ) : (
          <App />
        )}
      </MfeErrorBoundary>
    </StrictMode>
  );
};

const unmount = (container: HTMLElement): void => {
  const root = roots.get(container);

  if (root) {
    roots.delete(container);
    queueMicrotask(() => {
      root.unmount();
    });
  }
};

export { mount, unmount };
