<script setup lang="ts">
import { computed, ref, watch } from "vue";

import type { ImageWithBackgroundColorProps, Image, SharedComponentModule } from "shared-core/sdk";
import type { ImageViewerArticleProps } from "@product-detail/types/props";

import SharedMfe from "@product-detail/components/SharedMfe/SharedMfe.vue";

const props = defineProps<ImageViewerArticleProps>();

const loadImageWithBackgroundColor = (): Promise<
  SharedComponentModule<ImageWithBackgroundColorProps>
> => import("shared-core/sdk").then((m) => m.ImageWithBackgroundColorModule);

const visibleImages = computed<Image[]>(() => props.images.slice(0, 3));

const currentImageRef = ref<Image | null>(null);

const handleClickImage = (img: Image): void => {
  currentImageRef.value = img;
};

const showingProps = computed<ImageWithBackgroundColorProps>(() => ({
  src: currentImageRef.value?.src ?? "",
  alt: currentImageRef.value?.alt ?? "",
  bgColor: "#f0eeed",
  isActive: false,
  className: "image-viewer__showing-img",
}));

const thumbProps = (img: Image): ImageWithBackgroundColorProps => ({
  src: img.src,
  alt: img.alt,
  bgColor: "#f0eeed",
  isActive: currentImageRef.value?.id === img.id,
  className: "image-viewer__to-show-img",
  onClick: (): void => {
    handleClickImage(img);
  },
});

watch(
  visibleImages,
  (list) => {
    currentImageRef.value = list[0] ?? null;
  },
  { immediate: true }
);
</script>

<template>
  <article class="image-viewer">
    <div class="image-viewer__showing">
      <SharedMfe
        :key="currentImageRef?.id ?? ''"
        :loader="loadImageWithBackgroundColor"
        :component-props="showingProps"
        loading-class="image-viewer__showing-loader"
      />
    </div>
    <div class="image-viewer__to-show">
      <SharedMfe
        v-for="img in visibleImages"
        :key="img.id"
        :loader="loadImageWithBackgroundColor"
        :component-props="thumbProps(img)"
        loading-class="image-viewer__to-show-loader"
      />
    </div>
  </article>
</template>

<style>
.image-viewer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  height: 100%;
}

.image-viewer__showing {
  width: 100%;
  height: 18.125rem;
}

.image-viewer__showing-img-wrapper {
  width: 100%;
  height: 100%;
}

.image-viewer__showing-img {
  width: 100%;
  height: 100%;
}

.skeleton-shimmer.image-viewer__showing-loader {
  width: 100%;
  height: 100%;
  border-radius: 1rem;
}

.image-viewer__to-show {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  height: 100%;
  width: 100%;
}

.image-viewer__to-show-img-wrapper {
  width: 100%;
  height: 6.625rem;
}

.image-viewer__to-show-img {
  width: 100%;
  height: 100%;
}

.skeleton-shimmer.image-viewer__to-show-loader {
  width: 100%;
  height: 6.625rem;
  border-radius: 1rem;
}

@media screen and (width >= 1024px) {
  .image-viewer {
    flex-direction: row-reverse;
    gap: 0.875rem;
    width: 50%;
  }

  .image-viewer__showing {
    width: 70%;
    height: 100%;
  }

  .image-viewer__to-show {
    grid-template-columns: repeat(1, 1fr);
    gap: 0.875rem;
    width: 30%;
    height: 100%;
  }

  .image-viewer__to-show-img-wrapper {
    height: 10.438rem;
  }

  .skeleton-shimmer.image-viewer__to-show-loader {
    height: 10.438rem;
  }
}
</style>
