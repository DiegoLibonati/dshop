import React, { useRef } from "react";

import { GalleryClothes } from "@src/components/core/Galleries/GalleryClothes/GalleryClothes";

import { GallerySectionLayout } from "@src/layouts/GallerySectionLayout/GallerySectionLayout";

import { useConfigContext } from "@src/hooks/useConfigContext";
import { useNewArrivalsContext } from "@src/hooks/useNewArrivalsContext";

import { lang } from "@src/constants/lang";

import { Clothes } from "shared_core/SharedCoreEntities";
import { getIdsByLength } from "shared_core/SharedCore";

import "@src/components/composed/Sections/NewArrivalsSection/NewArrivalsSection.css";

export const NewArrivalsSection = () => {
  const idRootGalleryClothes = useRef<string[]>(getIdsByLength(1));

  const { callbacks } = useConfigContext();
  const { newArrivals } = useNewArrivalsContext();

  const handleClickViewAll = () => {
    alert("Not configured.");
  };

  const handleClickItem = (c: Clothes) => {
    const id = c.id;

    callbacks?.navigateToProductDetail(id);
  };

  return (
    <GallerySectionLayout
      btnText={lang["en"].new_arrivals.button_view_all}
      onClick={handleClickViewAll}
      className="new-arrivals"
    >
      <GalleryClothes
        idRoot={idRootGalleryClothes.current[0]}
        clothes={newArrivals!}
        title={lang["en"].new_arrivals.title}
        classNameWrapper="new-arrivals__gallery-clothes"
        onClothesClick={(c) => handleClickItem(c)}
      ></GalleryClothes>
    </GallerySectionLayout>
  );
};
