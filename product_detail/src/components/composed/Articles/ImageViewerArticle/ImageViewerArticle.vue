<script setup lang="ts">
import { computed, defineProps, ref, toRef, watch } from "vue";

import { ImageViewerArticleProps } from "@src/entities/props";

import ImageWithBackgroundColor from "@src/components/core/Images/ImageWithBackgroundColor/ImageWithBackgroundColor.vue";

import { getIdsByLength } from "shared_core/SharedCore";
import { Image } from "shared_core/SharedCoreEntities";

import "@src/components/composed/Articles/ImageViewerArticle/ImageViewerArticle.css"

const props = defineProps<ImageViewerArticleProps>();

const idsRoot = ref<string[] | null>(getIdsByLength(4));

const imagesProp = toRef(props, "images");
const images = computed<Image[]>(() => (imagesProp.value ?? []).slice(0, 3));

const currentImageRef = ref<Image | null>(null);

const handleClickImage = (_: MouseEvent, img: Image) => {
    currentImageRef.value = img
}

watch(
    images,
    (list) => {
        currentImageRef.value = list[0] ?? null;
    },
    { immediate: true }
);
</script>

<template>
    <article class="image-viewer">
        <div class="image-viewer__showing">
            <image-with-background-color :key="currentImageRef?.id" :id-root="idsRoot?.[0]!" :src="currentImageRef?.src!"
                :alt="currentImageRef?.alt!" bg-color="#f0eeed" :is-active=false
                class-name-wrapper="image-viewer__showing-img-wrapper" class-name="image-viewer__showing-img">
            </image-with-background-color>
        </div>
        <div class="image-viewer__to-show">
            <image-with-background-color v-for="(img, i) in images" :key="img.id" :id-root="idsRoot?.[i + 1]!"
                :src="img?.src!" :alt="img?.alt!" bg-color="#f0eeed" :is-active="currentImageRef?.id === img.id"
                class-name-wrapper="image-viewer__to-show-img-wrapper" class-name="image-viewer__to-show-img"
                :on-click="(e: MouseEvent) => handleClickImage(e, img)">
            </image-with-background-color>
        </div>
    </article>
</template>
