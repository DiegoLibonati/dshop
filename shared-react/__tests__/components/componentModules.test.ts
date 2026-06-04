import { act } from "@testing-library/react";

import * as FooterModule from "@shared-react/components/Footers/FooterWithSubscribeNewsletter/FooterWithSubscribeNewsletter.module";
import * as GalleryModule from "@shared-react/components/Galleries/GalleryClothes/GalleryClothes.module";
import * as ItemModule from "@shared-react/components/Items/ItemClothes/ItemClothes.module";
import * as LoaderScreenModule from "@shared-react/components/Loaders/LoaderScreen/LoaderScreen.module";
import * as SubscribeModule from "@shared-react/components/Subscribes/SubscribeNewsletter/SubscribeNewsletter.module";

interface ComponentModule {
  mount: (container: HTMLElement, props: never, options?: never) => void;
  unmount: (container: HTMLElement) => void;
}

describe("componentModules", () => {
  describe("exports", () => {
    it.each<[string, ComponentModule]>([
      ["FooterWithSubscribeNewsletter", FooterModule],
      ["GalleryClothes", GalleryModule],
      ["ItemClothes", ItemModule],
      ["LoaderScreen", LoaderScreenModule],
      ["SubscribeNewsletter", SubscribeModule],
    ])("should expose mount and unmount from the %s module", (_name, moduleExports) => {
      expect(typeof moduleExports.mount).toBe("function");
      expect(typeof moduleExports.unmount).toBe("function");
    });
  });

  describe("mount and unmount", () => {
    it("should mount and unmount a component through its module", () => {
      const container = document.createElement("div");
      document.body.appendChild(container);

      act(() => {
        LoaderScreenModule.mount(container, { className: "module-loader" });
      });

      expect(container.querySelector<HTMLDivElement>(".loader-screen")).toBeInTheDocument();
      expect(container.dataset.mfe).toBe("shared-react");

      act(() => {
        LoaderScreenModule.unmount(container);
      });

      expect(container.querySelector<HTMLDivElement>(".loader-screen")).not.toBeInTheDocument();

      container.remove();
    });
  });
});
