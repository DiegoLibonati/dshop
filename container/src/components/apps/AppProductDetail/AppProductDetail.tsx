import React, { useRef, useEffect, useState } from "react";

import { AppProductDetailProps } from "@src/entities/props";

import { useRouter } from "@src/hooks/useRouter";

import { getParseClothes } from "@src/helpers/getParseClothes";
import { getParseProduct } from "@src/helpers/getParseProduct";

import { getProducts } from "@src/api/get/getProducts";
import { getProductById } from "@src/api/get/getProductById";

import { mount, MountOptions, unMount } from "product_detail/ProductDetailApp";
import { Clothes, Product } from "shared_core/SharedCoreEntities";

const AppProductDetail = ({ classNameWrapper }: AppProductDetailProps) => {
  const [clothes, setClothes] = useState<Clothes[] | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  const { params } = useRouter();

  const handleGetProducts = async (): Promise<void> => {
    const products = await getProducts();

    setClothes(getParseClothes(products));
  };

  const handleGetProduct = async (): Promise<void> => {
    const idProduct = params.id as string;

    const product = await getProductById(idProduct);

    setProduct(getParseProduct(product!));
  };

  const onInit = () => {
    handleGetProducts();
    handleGetProduct();
  };

  const onDestroy = () => {
    unMount();
  };

  const onContentChange = () => {
    if (!clothes || !product) return;

    const options: MountOptions = {
      props: {
        content: {
          product: product,
          clothesAlsoLike: clothes,
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
  useEffect(onContentChange, [clothes, product]);

  return <div ref={ref} className={classNameWrapper}></div>;
};

export default AppProductDetail;
