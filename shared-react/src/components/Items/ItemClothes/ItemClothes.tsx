import { lazy } from "react";

import type { JSX } from "react";
import type { ItemClothesProps } from "@shared-react/types/props";

import SharedMfe from "@shared-react/components/SharedMfe/SharedMfe";

import "@shared-react/components/Items/ItemClothes/ItemClothes.css";

const ImageWithBackgroundColor = lazy(() =>
  import("shared-core/sdk").then((m) => ({ default: m.ImageWithBackgroundColor }))
);
const InformationItemClothes = lazy(() =>
  import("shared-core/sdk").then((m) => ({ default: m.InformationItemClothes }))
);

const ItemClothes = ({
  src,
  name,
  discount,
  price,
  rate,
  language = "en",
  onClick,
}: ItemClothesProps): JSX.Element => {
  return (
    <div className={`item-clothes ${onClick && "item-clothes--pointer"}`} onClick={onClick}>
      <SharedMfe
        component={ImageWithBackgroundColor}
        componentProps={{
          className: "item-clothes__wrapper-img",
          src,
          alt: name,
          bgColor: "#f0eeed",
          language,
          isActive: false,
        }}
        loadingClass="item-clothes__wrapper-img-loader"
      />

      <SharedMfe
        component={InformationItemClothes}
        componentProps={{
          className: "item-clothes__information",
          discount,
          name,
          price,
          rate,
          language,
        }}
        loadingClass="item-clothes__information-loader"
      />
    </div>
  );
};

export default ItemClothes;
