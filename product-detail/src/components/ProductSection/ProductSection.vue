<script setup lang="ts">
import { inject } from "vue";

import ImageViewerArticle from "@product-detail/components/ImageViewerArticle/ImageViewerArticle.vue";
import ProductInformationArticle from "@product-detail/components/ProductInformationArticle/ProductInformationArticle.vue";

import { PRODUCT_CONTEXT_KEY } from "@product-detail/constants/keys";

import type { Product } from "shared-core/sdk";

const product = inject<Product>(PRODUCT_CONTEXT_KEY)!;
</script>

<template>
  <section class="product-section">
    <ImageViewerArticle :images="product.images" />
    <ProductInformationArticle
      :name="product.name"
      :rate="product.rate"
      :price="product.price"
      :discount="product.discount"
      :description="product.description!"
      :colors="product.colors"
      :sizes="product.sizes"
    />
  </section>
</template>

<style>
.product-section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  height: auto;
}

@media screen and (width >= 1024px) {
  .product-section {
    flex-direction: row;
    gap: 2.5rem;
    width: 100%;
    height: 33.125rem;
  }
}
</style>
