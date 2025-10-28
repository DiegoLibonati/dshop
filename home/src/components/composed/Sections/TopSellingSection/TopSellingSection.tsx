import React, { useRef } from "react";

import { GalleryClothes } from "@src/components/core/Galleries/GalleryClothes/GalleryClothes";

import { GallerySectionLayout } from "@src/layouts/GallerySectionLayout/GallerySectionLayout";

import { useConfigContext } from "@src/hooks/useConfigContext";
import { useTopSellingsContext } from "@src/hooks/useTopSellingsContext";

import { lang } from "@src/constants/lang";

import { getIdsByLength } from "shared_core/SharedCore";
import { Clothes } from "shared_core/SharedCoreEntities";

import "@src/components/composed/Sections/TopSellingSection/TopSellingSection.css";

export const TopSellingSection = () => {
  const idRootGalleryClothes = useRef<string[]>(getIdsByLength(1));

  const { callbacks } = useConfigContext();
  const { topSellings } = useTopSellingsContext();

  const handleClickViewAll = () => {
    alert("Not configured.");
  };

  const handleClickItem = (c: Clothes) => {
    const id = c.id;

    callbacks?.navigateToProductDetail(id);
  };

  return (
    <GallerySectionLayout
      btnText={lang["en"].top_selling.button_view_all}
      onClick={handleClickViewAll}
      className="top-sellings"
    >
      <GalleryClothes
        idRoot={idRootGalleryClothes.current[0]}
        clothes={topSellings!}
        title={lang["en"].top_selling.title}
        classNameWrapper="top-sellings__gallery-clothes"
        onClothesClick={(c) => handleClickItem(c)}
      ></GalleryClothes>
    </GallerySectionLayout>
  );
};
