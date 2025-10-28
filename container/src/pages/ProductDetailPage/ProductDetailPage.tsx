import React, { lazy } from "react";

import LayoutPrincipal from "@src/layouts/LayoutPrincipal/LayoutPrincipal";

import "@src/pages/ProductDetailPage/ProductDetailPage.css";

const ProductDetailLazy = lazy(
  () => import("@src/components/apps/AppProductDetail/AppProductDetail")
);

const ProductDetailPage = () => {
  return (
    <LayoutPrincipal>
      <ProductDetailLazy classNameWrapper="product-detail-wrapper"></ProductDetailLazy>
    </LayoutPrincipal>
  );
};

export default ProductDetailPage;
