<script setup lang="ts">
import { inject } from "vue";

import type { GalleryClothesProps } from "shared-react/sdk";
import type { Clothes, MfeCallbacks, SharedComponentModule } from "shared-core/sdk";

import SharedMfe from "@product-detail/components/SharedMfe/SharedMfe.vue";

import { CLOTHES_ALSO_LIKE_CONTEXT_KEY } from "@product-detail/constants/keys";
import { lang } from "@product-detail/constants/lang";

const clothesAlsoLike = inject<Clothes[]>(CLOTHES_ALSO_LIKE_CONTEXT_KEY)!;
const callbacks = inject<MfeCallbacks | undefined>("mfeCallbacks", undefined);

const loadGalleryClothes = (): Promise<SharedComponentModule<GalleryClothesProps>> =>
  import("shared-react/sdk").then((m) => m.GalleryClothesModule);

const onClothesClick = (clothes: Clothes): void => {
  callbacks?.onNavigate(`/product/${clothes.id}`);
};

const galleryProps: GalleryClothesProps = {
  title: lang.en.youMightAlsoLike.title,
  clothes: clothesAlsoLike,
  onClothesClick,
};
</script>

<template>
  <div class="you-might-also-like-section">
    <SharedMfe
      :loader="loadGalleryClothes"
      :component-props="galleryProps"
      loading-class="you-might-also-like-section-loader"
    />
  </div>
</template>

<style>
.you-might-also-like-section {
  margin-top: 3.125rem;
}

.skeleton-shimmer.you-might-also-like-section-loader {
  width: 100%;
  height: 22rem;
  border-radius: 1rem;
}

@media screen and (width >= 1024px) {
  .you-might-also-like-section {
    margin-top: 4rem;
  }
}
</style>
