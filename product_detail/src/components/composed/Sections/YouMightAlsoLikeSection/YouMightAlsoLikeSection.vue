<script setup lang="ts">
import { inject, ref } from "vue";

import GalleryClothes from "@src/components/core/Galleries/GalleryClothes/GalleryClothes.vue";

import { CLOTHES_ALSO_LIKE_CONTEXT_KEY } from "@src/constants/keys";
import { lang } from "@src/constants/lang";

import { getIdsByLength } from "shared_core/SharedCore";
import { Clothes } from "shared_core/SharedCoreEntities";

import "@src/components/composed/Sections/YouMightAlsoLikeSection/YouMightAlsoLikeSection.css"

const idRootGalleryClothes = ref<string[] | null>(getIdsByLength(1))

const clothesAlsoLike = inject(CLOTHES_ALSO_LIKE_CONTEXT_KEY) as Clothes[]

const onClothesClick = (c: Clothes) => {
    alert("Not configured.")
}

</script>

<template>
    <gallery-clothes class="you-might-also-like-section" :id-root="idRootGalleryClothes?.[0]!"
        :title="lang['en'].youMightAlsoLike.title" :clothes="clothesAlsoLike" v-on:clothes-click="onClothesClick">
    </gallery-clothes>
</template>
