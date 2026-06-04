import { lazy } from "react";
import { useInheritedContext } from "shared-core/sdk";

import type { JSX } from "react";
import type { Clothes } from "shared-core/sdk";

import SharedMfe from "@home/components/SharedMfe/SharedMfe";

import GallerySectionLayout from "@home/layouts/GallerySectionLayout/GallerySectionLayout";

import { useTopSellingsContext } from "@home/hooks/useTopSellingsContext";

import { lang } from "@home/constants/lang";

import "@home/components/Sections/TopSellingSection/TopSellingSection.css";

const GalleryClothes = lazy(() =>
  import("shared-react/sdk").then((m) => ({ default: m.GalleryClothes }))
);

const TopSellingSection = (): JSX.Element => {
  const { topSellingsState } = useTopSellingsContext();
  const inherited = useInheritedContext();

  const handleClickViewAll = (): void => {
    alert("Not configured.");
  };

  const handleClickItem = (clothes: Clothes): void => {
    inherited?.callbacks.onNavigate(`/product/${clothes.id}`);
  };

  return (
    <GallerySectionLayout
      btnText={lang.en.top_selling.button_view_all}
      onClick={handleClickViewAll}
      className="top-sellings"
    >
      <SharedMfe
        component={GalleryClothes}
        mfe="shared-react"
        componentProps={{
          title: lang.en.top_selling.title,
          clothes: topSellingsState.clothes,
          onClothesClick: handleClickItem,
        }}
        wrapperClass="top-sellings__gallery-clothes"
        loadingClass="top-sellings__gallery-clothes-loader"
      />
    </GallerySectionLayout>
  );
};

export default TopSellingSection;
