import "zone.js";

import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EmbeddedViewRef,
  EnvironmentInjector,
  NgModuleRef,
  Type,
} from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { MountOptions, UnMountOptions } from "@src/app/entities/entities";
import { Component } from "@src/app/entities/enum";

import { AppModule } from "@src/app/app.module";

import { HeaderComponent } from "@src/app/components/composed/headers/header/header.component";
import { AppTestComponent } from "@src/app/components/composed/app-test/app-test.component";
import { ReviewCustomerComponent } from "@src/app/components/composed/reviews/review-customer/review-customer.component";
import { NotificationBarComponent } from "@src/app/components/composed/notifications/notification-bar/notification-bar.component";

import envs from "@src/app/constants/envs.constants";

const componentsMap: Record<string, ComponentRef<unknown>> = {};
const titleMfe: string = "Shared Angular";

let ngModuleRef: NgModuleRef<AppModule> | null = null;
let appRef: ApplicationRef | null = null;

const getComponentById = (idComponent: Component): Type<unknown> => {
  return {
    [Component.Header]: HeaderComponent,
    [Component.AppTest]: AppTestComponent,
    [Component.ReviewCustomer]: ReviewCustomerComponent,
    [Component.NotificationBar]: NotificationBarComponent,
  }[idComponent];
};

const mountComponent = async (
  el: HTMLElement,
  options: MountOptions
): Promise<void> => {
  const debug = options?.debug;
  const props = options?.props;
  const id = options.idComponent;

  if (!envs.IS_DEV && id === Component.AppTest) {
    throw new Error(
      `[mountComponent - ${titleMfe}] You cannot render this component. Component: ${id}`
    );
  }

  const idRoot = props?.idRoot as string;

  if (!idRoot) {
    throw new Error(
      `[mountComponent - ${titleMfe}] You must provide an 'idRoot' to identify the component.`
    );
  }

  if (!ngModuleRef) {
    ngModuleRef = await platformBrowserDynamic().bootstrapModule(AppModule);
    appRef = ngModuleRef.injector.get(ApplicationRef);
  }

  if (componentsMap[idRoot]) {
    const compRef = componentsMap[idRoot];
    Object.assign(compRef.instance as object, props);
    compRef.changeDetectorRef.detectChanges();
    return;
  }

  const componentType = getComponentById(id);
  const compRef = createComponent(componentType as Type<unknown>, {
    environmentInjector: ngModuleRef.injector as EnvironmentInjector,
  });

  Object.assign(compRef.instance as object, props);
  appRef!.attachView(compRef.hostView);
  compRef.changeDetectorRef.detectChanges();

  const domElem = (compRef.hostView as EmbeddedViewRef<unknown>)
    .rootNodes[0] as HTMLElement;
  el.innerHTML = "";
  el.appendChild(domElem);

  componentsMap[idRoot] = compRef;

  if (envs.IS_DEV === "development" && debug) {
    console.log(`[mountComponent - ${titleMfe}] mounting ${idRoot}`);
  }
};

const unMountComponent = (idRoot: string, options?: UnMountOptions): void => {
  const debug = options?.debug;
  const compRef = componentsMap[idRoot];

  if (!compRef) {
    throw new Error(
      `[unMountComponent - ${titleMfe}] No component found with idRoot: '${idRoot}'`
    );
  }

  if (appRef) {
    appRef.detachView(compRef.hostView);
  }

  compRef.destroy();
  delete componentsMap[idRoot];

  if (envs.IS_DEV === "development" && debug) {
    console.log(`[unMountComponent - ${titleMfe}] Unmounting: '${idRoot}'`);
  }
};

// Dev mode
if (envs.IS_DEV === "development") {
  const devRoot = document.getElementById(
    "_shared-angular-dev-root"
  ) as HTMLDivElement | null;

  if (devRoot) {
    const options: MountOptions = {
      idComponent: Component.AppTest,
      props: { idRoot: "APP TEST" },
    };

    mountComponent(devRoot, options);
  }
}

export { mountComponent, unMountComponent };
