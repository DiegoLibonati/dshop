import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import type { ComponentType } from "react";
import type { Root } from "react-dom/client";
import type { MfeMountOptions, SharedComponentModule } from "@shared-core/types/mfe";

import MfeErrorBoundary from "@shared-core/components/MfeErrorBoundary/MfeErrorBoundary";

import { InheritedProvider } from "@shared-core/contexts/InheritedContext/InheritedProvider";

const createComponentMount = <P extends object>(
  Component: ComponentType<P>
): SharedComponentModule<P> => {
  const roots = new WeakMap<HTMLElement, Root>();
  const lastOptions = new WeakMap<HTMLElement, MfeMountOptions | undefined>();

  const render = (container: HTMLElement, props: P, options?: MfeMountOptions): void => {
    const root = roots.get(container);

    if (!root) return;

    const element = (
      <StrictMode>
        <MfeErrorBoundary onError={options?.onError}>
          {options?.callbacks ? (
            <InheritedProvider callbacks={options.callbacks}>
              <Component {...props} />
            </InheritedProvider>
          ) : (
            <Component {...props} />
          )}
        </MfeErrorBoundary>
      </StrictMode>
    );

    root.render(element);
  };

  const mount = (container: HTMLElement, props: P, options?: MfeMountOptions): void => {
    if (!roots.get(container)) {
      container.dataset.mfe = options?.dataset?.mfe ?? "shared-core";
      roots.set(container, createRoot(container));
    }

    const resolvedOptions = options ?? lastOptions.get(container);
    lastOptions.set(container, resolvedOptions);
    render(container, props, resolvedOptions);
  };

  const unmount = (container: HTMLElement): void => {
    const root = roots.get(container);

    if (root) {
      root.render(null);
    }
  };

  return { mount, unmount };
};

export { createComponentMount };
