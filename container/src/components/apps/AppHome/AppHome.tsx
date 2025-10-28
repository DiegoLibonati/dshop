import React, { useRef, useEffect, useState } from "react";

import { AppHomeProps } from "@src/entities/props";

import { useRouter } from "@src/hooks/useRouter";

import { getParseClothes } from "@src/helpers/getParseClothes";
import { getRandomBetweenWithDecimals } from "@src/helpers/getRandomBetweenWithDecimals";

import { reviews } from "@src/constants/reviews";

import { getProducts } from "@src/api/get/getProducts";

import { mount, MountOptions, unMount } from "home/HomeApp";
import { Clothes } from "shared_core/SharedCoreEntities";

const AppHome = ({ classNameWrapper }: AppHomeProps) => {
  const [clothes, setClothes] = useState<Clothes[] | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  const { navigateToProductDetail } = useRouter();

  const handleGetProducts = async (): Promise<void> => {
    const products = await getProducts();

    setClothes(getParseClothes(products));
  };

  const onInit = () => {
    handleGetProducts();
  };

  const onDestroy = () => {
    unMount();
  };

  const onContentChange = () => {
    if (!clothes) return;

    const options: MountOptions = {
      props: {
        callbacks: { navigateToProductDetail: navigateToProductDetail },
        content: {
          brands: ["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"],
          newArrivals: clothes.slice(0, 10),
          topSellings: clothes.slice(10, 20).map((c) => {
            return {
              ...c,
              discount: getRandomBetweenWithDecimals(10, 30),
            };
          }),
          reviews: reviews,
        },
      },
    };

    mount(ref.current!, options);
  };

  useEffect(() => {
    onInit();

    return () => {
      onDestroy();
    };
  }, []);
  useEffect(onContentChange, [clothes]);

  return <div ref={ref} className={classNameWrapper}></div>;
};

export default AppHome;
