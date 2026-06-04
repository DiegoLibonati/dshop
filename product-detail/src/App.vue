<script setup lang="ts">
import ProductDetailPage from "@product-detail/pages/ProductDetailPage/ProductDetailPage.vue";

import { PRODUCT_1 } from "@product-detail/constants/products";
import { CLOTHES_1 } from "@product-detail/constants/clothes";
</script>

<template>
  <ProductDetailPage :product="PRODUCT_1" :clothes-also-like="CLOTHES_1" />
</template>
