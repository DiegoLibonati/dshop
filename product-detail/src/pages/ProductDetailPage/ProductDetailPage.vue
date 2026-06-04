<script setup lang="ts">
import { provide } from "vue";

import type { ProductDetailPageProps } from "@product-detail/types/props";

import ProductSection from "@product-detail/components/ProductSection/ProductSection.vue";
import ReviewsSection from "@product-detail/components/ReviewsSection/ReviewsSection.vue";
import YouMightAlsoLikeSection from "@product-detail/components/YouMightAlsoLikeSection/YouMightAlsoLikeSection.vue";

import { PRODUCT_CONTEXT_KEY, CLOTHES_ALSO_LIKE_CONTEXT_KEY } from "@product-detail/constants/keys";

const props = defineProps<ProductDetailPageProps>();

provide(PRODUCT_CONTEXT_KEY, props.product);
provide(CLOTHES_ALSO_LIKE_CONTEXT_KEY, props.clothesAlsoLike);
</script>

<template>
  <main class="main-product-detail">
    <ProductSection />
    <ReviewsSection />
    <YouMightAlsoLikeSection />
  </main>
</template>

<style>
.main-product-detail {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 0rem 1rem 0rem 1rem;
}

@media screen and (width >= 1024px) {
  .main-product-detail {
    padding: 0rem 6.25rem 0rem 6.25rem;
  }
}
</style>
