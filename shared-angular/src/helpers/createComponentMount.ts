import "zone.js";

import {
  EnvironmentInjector,
  createComponent,
  createEnvironmentInjector,
  reflectComponentType,
} from "@angular/core";
import { createApplication } from "@angular/platform-browser";

import type { ComponentRef, Type, ApplicationRef } from "@angular/core";
import type { MfeCallbacks, MfeMountOptions, SharedComponentModule } from "shared-core/sdk";

import { MFE_CALLBACKS } from "@shared-angular/tokens/mfe-callbacks.token";

const NOOP_CALLBACKS: MfeCallbacks = {
  onNavigate: (): void => undefined,
};

export const createComponentMount = <P extends object>(
  component: Type<unknown>
): SharedComponentModule<P> => {
  const inputNames = new Set(
    reflectComponentType(component)?.inputs.map((input) => input.templateName) ?? []
  );

  let appRefPromise: Promise<ApplicationRef> | null = null;

  const mounted = new WeakMap<HTMLElement, () => void>();
  const componentRefs = new WeakMap<HTMLElement, ComponentRef<unknown>>();
  const latestProps = new WeakMap<HTMLElement, P>();
  const mounting = new WeakSet<HTMLElement>();
  const pendingUnmount = new WeakSet<HTMLElement>();

  const getApp = (): Promise<ApplicationRef> => {
    appRefPromise ??= createApplication();

    return appRefPromise;
  };

  const applyInputs = (componentRef: ComponentRef<unknown>, props: P): void => {
    for (const [key, value] of Object.entries(props)) {
      if (inputNames.has(key)) componentRef.setInput(key, value);
    }
  };

  const mount = (container: HTMLElement, props: P, options?: MfeMountOptions): void => {
    container.dataset.mfe = options?.dataset?.mfe ?? "shared-angular";
    latestProps.set(container, props);

    const existingRef = componentRefs.get(container);

    if (existingRef) {
      applyInputs(existingRef, props);

      return;
    }

    if (mounting.has(container)) return;

    mounting.add(container);

    void getApp().then((appRef): void => {
      mounting.delete(container);

      if (pendingUnmount.has(container)) {
        pendingUnmount.delete(container);

        return;
      }

      const environmentInjector = createEnvironmentInjector(
        [{ provide: MFE_CALLBACKS, useValue: options?.callbacks ?? NOOP_CALLBACKS }],
        appRef.injector.get(EnvironmentInjector)
      );

      const componentRef: ComponentRef<unknown> = createComponent(component, {
        environmentInjector,
        hostElement: container,
      });

      componentRefs.set(container, componentRef);
      applyInputs(componentRef, latestProps.get(container) ?? props);

      appRef.attachView(componentRef.hostView);

      mounted.set(container, (): void => {
        appRef.detachView(componentRef.hostView);
        componentRef.destroy();
        environmentInjector.destroy();
        componentRefs.delete(container);
        latestProps.delete(container);
      });
    });
  };

  const unmount = (container: HTMLElement): void => {
    const destroy = mounted.get(container);

    if (destroy) {
      destroy();
      mounted.delete(container);

      return;
    }

    pendingUnmount.add(container);
  };

  return { mount, unmount };
};
