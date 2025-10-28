<script setup lang="ts">
import { defineProps, provide, watch } from "vue";

import { AppProps } from "@src/entities/props";

import ProductSection from '@src/components/composed/Sections/ProductSection/ProductSection.vue';
import ReviewsSection from "@src/components/composed/Sections/ReviewsSection/ReviewsSection.vue";
import YouMightAlsoLikeSection from "@src/components/composed/Sections/YouMightAlsoLikeSection/YouMightAlsoLikeSection.vue";

import { PRODUCT_CONTEXT_KEY, CLOTHES_ALSO_LIKE_CONTEXT_KEY } from "@src/constants/keys";

import "@src/App.css"


const props = defineProps<AppProps>();

watch(() => props, (nv, ov) => {
    const oldProduct = ov?.content.product
    const oldClothesAlsoLike = ov?.content.clothesAlsoLike

    const newProduct = nv?.content.product
    const newClothesAlsoLike = nv?.content.clothesAlsoLike

    if (JSON.stringify(oldProduct) !== JSON.stringify(newProduct)) {
        provide(PRODUCT_CONTEXT_KEY, newProduct);
    }

    if (JSON.stringify(oldClothesAlsoLike) !== JSON.stringify(newClothesAlsoLike)) {
        provide(CLOTHES_ALSO_LIKE_CONTEXT_KEY, newClothesAlsoLike);
    }

}, { deep: true, immediate: true });
</script>

<template>
    <main class="main-product-detail">
        <product-section></product-section>
        <reviews-section></reviews-section>
        <you-might-also-like-section></you-might-also-like-section>
    </main>
</template>
