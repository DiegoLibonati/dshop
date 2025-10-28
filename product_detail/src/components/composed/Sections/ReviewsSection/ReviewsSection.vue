<script setup lang="ts">
import { inject, ref, watch } from "vue";

import ReviewCustomer from "@src/components/core/Reviews/ReviewCustomer/ReviewCustomer.vue";

import { PRODUCT_CONTEXT_KEY } from "@src/constants/keys";
import { lang } from "@src/constants/lang";

import { getIdsByLength } from "shared_core/SharedCore";
import { Product } from "shared_core/SharedCoreEntities";

import "@src/components/composed/Sections/ReviewsSection/ReviewsSection.css"

const idsRootReviews = ref<string[] | null>(null);

const product = inject(PRODUCT_CONTEXT_KEY) as Product

watch(() => product, () => {
    const reviewsLength = product.reviews?.length

    idsRootReviews.value = getIdsByLength(reviewsLength)
}, { deep: true, immediate: true });
</script>

<template>
    <section class="reviews-section" v-if="idsRootReviews?.length">
        <article class="reviews-section__header">
            <h2 class="reviews-section__title">{{ lang["en"].reviews.title }} <span
                    class="reviews-section__title-number">({{ product.reviews.length
                    }})</span></h2>
        </article>

        <article class="reviews-section__reviews">
            <review-customer v-for="(review, i) in product.reviews.slice(0, 6)" :key="review.id"
                :id-root="idsRootReviews?.[i]!" :name="review.name" :description="review.description" :max-stars="5"
                :value-stars="review.value" class-name-wrapper="reviews-section__review-wrapper"
                class-name="reviews-section__review">
            </review-customer>
        </article>
    </section>
</template>
