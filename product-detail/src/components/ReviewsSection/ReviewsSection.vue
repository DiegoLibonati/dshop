<script setup lang="ts">
import { inject } from "vue";

import type { ReviewCustomerProps } from "shared-angular/sdk";
import type { Product, Review, SharedComponentModule } from "shared-core/sdk";

import SharedMfe from "@product-detail/components/SharedMfe/SharedMfe.vue";

import { PRODUCT_CONTEXT_KEY } from "@product-detail/constants/keys";
import { lang } from "@product-detail/constants/lang";

const product = inject<Product>(PRODUCT_CONTEXT_KEY)!;

const loadReviewCustomer = (): Promise<SharedComponentModule<ReviewCustomerProps>> =>
  import("shared-angular/sdk").then((m) => m.ReviewCustomerModule);

const reviewProps = (review: Review): ReviewCustomerProps => ({
  name: review.name,
  description: review.description,
  maxStars: 5,
  valueStars: review.value,
  className: "reviews-section__review",
});
</script>

<template>
  <section v-if="product.reviews.length" class="reviews-section">
    <article class="reviews-section__header">
      <h2 class="reviews-section__title">
        {{ lang.en.reviews.title }}
        <span class="reviews-section__title-number">({{ product.reviews.length }})</span>
      </h2>
    </article>

    <article class="reviews-section__reviews">
      <SharedMfe
        v-for="review in product.reviews.slice(0, 6)"
        :key="review.id"
        :loader="loadReviewCustomer"
        :component-props="reviewProps(review)"
        loading-class="reviews-section__review-loader"
      />
    </article>
  </section>
</template>

<style>
.reviews-section {
  margin-top: 3.125rem;
}

.reviews-section__header {
  margin-bottom: 1.688rem;
}

.reviews-section__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-black);
}

.reviews-section__title-number {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-black-60);
}

.reviews-section__reviews {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.938rem;
  width: 100%;
  height: auto;
}

.reviews-section__review-wrapper {
  width: 100%;
  height: 100%;
}

.reviews-section__review {
  width: 100% !important;
  height: 100% !important;
}

.skeleton-shimmer.reviews-section__review-loader {
  width: 100%;
  height: 7rem;
  border-radius: 0.5rem;
}

@media screen and (width >= 1024px) {
  .reviews-section {
    margin-top: 5rem;
  }

  .reviews-section__header {
    margin-bottom: 2rem;
  }

  .reviews-section__title {
    font-size: 1.5rem;
  }

  .reviews-section__title-number {
    font-size: 1rem;
  }

  .reviews-section__reviews {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
}
</style>
