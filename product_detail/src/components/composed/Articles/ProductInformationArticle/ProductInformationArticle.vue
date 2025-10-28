<script setup lang="ts">
import { defineProps, ref, watch } from "vue";

import { ProductInformationArticleProps } from "@src/entities/props";

import InformationItemClothes from "@src/components/core/Informations/InformationItemClothes/InformationItemClothes.vue";
import ColorCircle from "@src/components/core/Colors/ColorCircle/ColorCircle.vue";
import TagSimple from "@src/components/core/Tags/TagSimple/TagSimple.vue";
import CounterWithActions from "@src/components/core/Counters/CounterWithActions/CounterWithActions.vue";
import ButtonBlack from "@src/components/core/Buttons/ButtonBlack/ButtonBlack.vue";

import { lang } from "@src/constants/lang";

import { getIdsByLength } from "shared_core/SharedCore";
import { Color, Size } from "shared_core/SharedCoreEntities";

import "@src/components/composed/Articles/ProductInformationArticle/ProductInformationArticle.css"


const props = defineProps<ProductInformationArticleProps>();

const idsRootStatic = ref<string[] | null>(getIdsByLength(3));
const idsRootColors = ref<string[] | null>(null);
const idsRootTags = ref<string[] | null>(null);

const handleClickColor = (_: MouseEvent, color: Color) => {
    alert("Not configured.")
}

const handleClickSize = (_: MouseEvent, size: Size) => {
    alert("Not configured.")
}

const handleClickAddCart = () => {
    alert("Not configured.")
}

const onChangeCounter = (value: number) => {
    console.log(value)
}

watch(() => props, (nv) => {
    const colorsLength = nv.colors.length
    const tagsLength = nv.sizes.length

    idsRootColors.value = getIdsByLength(colorsLength)
    idsRootTags.value = getIdsByLength(tagsLength)
}, { deep: true, immediate: true });

</script>

<template>
    <article class="product-information">
        <information-item-clothes :key="props.name" :id-root="idsRootStatic?.[0]!" :name="props.name" :rate="props.rate"
            :price="props.price" :discount="props.discount" :description="props.description"></information-item-clothes>

        <hr class="product-information__separator">

        <div class="product-information__color">
            <p class="product-information__subtitle">{{ lang["en"].productInformation.color.subTitle }}</p>

            <div class="product-information__colors" v-if="idsRootColors?.length">
                <color-circle v-for="(color, i) in props.colors" :key="color.id" :id-root="idsRootColors?.[i]!"
                    :color="color.color" :is-active="false"
                    class-name-wrapper="product-information__colors-color-wrapper"
                    class-name="product-information__colors-color"
                    :on-click="(e: MouseEvent) => handleClickColor(e, color)">
                </color-circle>
            </div>
        </div>

        <hr class="product-information__separator">

        <div class="product-information__size">
            <p class="product-information__subtitle">{{ lang["en"].productInformation.size.subTitle }}</p>

            <div class="product-information__sizes" v-if="idsRootTags?.length">
                <tag-simple v-for="(size, i) in props.sizes" :id-root="idsRootTags?.[i]!" :key="size.id"
                    class-name-wrapper="product-information__sizes-size-wrapper"
                    class-name="product-information__sizes-size"
                    :on-click="(e: MouseEvent) => handleClickSize(e, size)">{{ size.size }}</tag-simple>
            </div>
        </div>

        <hr class="product-information__separator">

        <div class="product_information__confirm">
            <counter-with-actions :key="idsRootStatic?.[1]!" :id-root="idsRootStatic?.[1]!" :limit="10"
                :on-change="onChangeCounter" class-name="product_information__confirm-counter"
                class-name-wrapper="product_information__confirm-counter-wrapper"></counter-with-actions>

            <button-black :key="idsRootStatic?.[2]!" :id-root="idsRootStatic?.[2]!" ariaLabel="add to cart"
                :rounded="true" :on-click="handleClickAddCart" class-name="product_information__confirm-add-cart"
                class-name-wrapper="product_information__confirm-add-cart-wrapper">{{
                    lang["en"].productInformation.addCart }}</button-black>
        </div>
        </hr>
    </article>
</template>
