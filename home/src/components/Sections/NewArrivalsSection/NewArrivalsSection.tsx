import { lazy } from "react";
import { useInheritedContext } from "shared-core/sdk";

import type { JSX } from "react";
import type { Clothes } from "shared-core/sdk";

import SharedMfe from "@home/components/SharedMfe/SharedMfe";

import GallerySectionLayout from "@home/layouts/GallerySectionLayout/GallerySectionLayout";

import { useNewArrivalsContext } from "@home/hooks/useNewArrivalsContext";

import { lang } from "@home/constants/lang";

import "@home/components/Sections/NewArrivalsSection/NewArrivalsSection.css";

const GalleryClothes = lazy(() =>
  import("shared-react/sdk").then((m) => ({ default: m.GalleryClothes }))
);

const NewArrivalsSection = (): JSX.Element => {
  const { newArrivalsState } = useNewArrivalsContext();
  const inherited = useInheritedContext();

  const handleClickViewAll = (): void => {
    alert("Not configured.");
  };

  const handleClickItem = (clothes: Clothes): void => {
    inherited?.callbacks.onNavigate(`/product/${clothes.id}`);
  };

  return (
    <GallerySectionLayout
      btnText={lang.en.new_arrivals.button_view_all}
      onClick={handleClickViewAll}
      className="new-arrivals"
    >
      <SharedMfe
        component={GalleryClothes}
        mfe="shared-react"
        componentProps={{
          title: lang.en.new_arrivals.title,
          clothes: newArrivalsState.clothes,
          onClothesClick: handleClickItem,
        }}
        wrapperClass="new-arrivals__gallery-clothes"
        loadingClass="new-arrivals__gallery-clothes-loader"
      />
    </GallerySectionLayout>
  );
};

export default NewArrivalsSection;
