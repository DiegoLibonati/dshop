<script setup lang="ts">
import { inject } from "vue";

import ImageViewerArticle from "@src/components/composed/Articles/ImageViewerArticle/ImageViewerArticle.vue";
import ProductInformationArticle from "@src/components/composed/Articles/ProductInformationArticle/ProductInformationArticle.vue";

import { PRODUCT_CONTEXT_KEY } from "@src/constants/keys";

import { Product } from "shared_core/SharedCoreEntities";

import "@src/components/composed/Sections/ProductSection/ProductSection.css"


const product = inject(PRODUCT_CONTEXT_KEY) as Product
</script>

<template>
    <section class="product-section">
        <image-viewer-article :images="product.images"></image-viewer-article>
        <product-information-article :name="product.name" :rate="product.rate" :price="product.price"
            :discount="product.discount" :description="product.description!" :colors="product.colors"
            :sizes="product.sizes"></product-information-article>
    </section>
</template>
