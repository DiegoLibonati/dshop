import { Fragment, useMemo } from "react";

import type { JSX } from "react";
import type { InformationItemClothesProps } from "@shared-core/types/props";

import RateStars from "@shared-core/components/Ratings/RateStars/RateStars";

import { getFinalPriceByDiscount } from "@shared-core/helpers/getFinalPriceByDiscount";

import "@shared-core/components/Informations/InformationItemClothes/InformationItemClothes.css";

const InformationItemClothes = ({
  name,
  rate,
  price,
  discount,
  description,
  language,
  className,
}: InformationItemClothesProps): JSX.Element => {
  const maxStars = 5;

  const finalPrice = useMemo(() => getFinalPriceByDiscount(price, discount), [discount, price]);

  return (
    <div className={`information-item-clothes ${className}`}>
      <h2 className="information-item-clothes__title" title={name}>
        {name}
      </h2>
      <div className="information-item-clothes__rating">
        <RateStars
          max={maxStars}
          value={rate}
          outColor={"#FFFFFF"}
          inColor="#FFC633"
          language={language!}
          className="information-item-clothes__rating-stars"
          classNameStar="information-item-clothes__rating-star"
        ></RateStars>
        <p className="information-item-clothes__rating-rate">
          {rate}/{maxStars}
        </p>
      </div>

      <div className="information-item-clothes__price">
        <h3 className="information-item-clothes__price-final">${finalPrice}</h3>

        {discount !== 0 && (
          <Fragment>
            <h3 className="information-item-clothes__price-current">${price}</h3>
            <div className="information-item-clothes__price-wrapper-discount">
              <p className="information-item-clothes__price-discount">-{discount}%</p>
            </div>
          </Fragment>
        )}
      </div>

      {description && <p className="information-item-clothes__description">{description}</p>}
    </div>
  );
};

export default InformationItemClothes;
