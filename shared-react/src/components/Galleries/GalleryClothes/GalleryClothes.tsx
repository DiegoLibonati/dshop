import { lazy } from "react";

import type { JSX } from "react";
import type { GalleryClothesProps } from "@shared-react/types/props";

import SharedMfe from "@shared-react/components/SharedMfe/SharedMfe";
import ItemClothes from "@shared-react/components/Items/ItemClothes/ItemClothes";

import "@shared-react/components/Galleries/GalleryClothes/GalleryClothes.css";

const SliderSnapX = lazy(() => import("shared-core/sdk").then((m) => ({ default: m.SliderSnapX })));

const GalleryClothes = ({
  title,
  clothes,
  className,
  onClothesClick,
}: GalleryClothesProps): JSX.Element => {
  const items = clothes ?? [];

  return (
    <div className={`gallery-clothes ${className}`}>
      <h2 className="gallery-clothes__title">{title}</h2>

      <div className="gallery-clothes__slider-wrapper">
        <SharedMfe
          component={SliderSnapX}
          componentProps={{
            className: "gallery-clothes__slider",
            children: items.map((c) => (
              <ItemClothes
                key={c.id}
                src={c.src}
                discount={c.discount}
                name={c.name}
                price={c.price}
                rate={c.rate}
                onClick={() => {
                  onClothesClick(c);
                }}
              ></ItemClothes>
            )),
          }}
          loadingClass="gallery-clothes__slider-loader"
        />
      </div>

      <div className="gallery-clothes__clothes">
        {items.slice(0, 4).map((c) => (
          <ItemClothes
            key={c.id}
            src={c.src}
            discount={c.discount}
            name={c.name}
            price={c.price}
            rate={c.rate}
            onClick={() => {
              onClothesClick(c);
            }}
          ></ItemClothes>
        ))}
      </div>
    </div>
  );
};

export default GalleryClothes;
