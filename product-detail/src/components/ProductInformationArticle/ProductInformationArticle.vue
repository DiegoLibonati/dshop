<script setup lang="ts">
import type {
  InformationItemClothesProps,
  ColorCircleProps,
  TagSimpleProps,
  CounterWithActionsProps,
  ButtonBlackProps,
  Color,
  Size,
  SharedComponentModule,
} from "shared-core/sdk";
import type { ProductInformationArticleProps } from "@product-detail/types/props";

import SharedMfe from "@product-detail/components/SharedMfe/SharedMfe.vue";

import { lang } from "@product-detail/constants/lang";

const props = defineProps<ProductInformationArticleProps>();

const loadInformationItemClothes = (): Promise<
  SharedComponentModule<InformationItemClothesProps>
> => import("shared-core/sdk").then((m) => m.InformationItemClothesModule);

const loadColorCircle = (): Promise<SharedComponentModule<ColorCircleProps>> =>
  import("shared-core/sdk").then((m) => m.ColorCircleModule);

const loadTagSimple = (): Promise<SharedComponentModule<TagSimpleProps>> =>
  import("shared-core/sdk").then((m) => m.TagSimpleModule);

const loadCounterWithActions = (): Promise<SharedComponentModule<CounterWithActionsProps>> =>
  import("shared-core/sdk").then((m) => m.CounterWithActionsModule);

const loadButtonBlack = (): Promise<SharedComponentModule<ButtonBlackProps>> =>
  import("shared-core/sdk").then((m) => m.ButtonBlackModule);

const handleClickColor = (): void => {
  alert("Not configured.");
};

const handleClickSize = (): void => {
  alert("Not configured.");
};

const handleClickAddCart = (): void => {
  alert("Not configured.");
};

const onChangeCounter = (value: number): void => {
  console.log(value);
};

const infoProps: InformationItemClothesProps = {
  name: props.name,
  rate: props.rate,
  price: props.price,
  discount: props.discount,
  description: props.description,
};

const colorProps = (color: Color): ColorCircleProps => ({
  color: color.color,
  isActive: false,
  className: "product-information__colors-color",
  onClick: (): void => {
    handleClickColor();
  },
});

const sizeProps = (size: Size): TagSimpleProps => ({
  children: size.size,
  className: "product-information__sizes-size",
  onClick: (): void => {
    handleClickSize();
  },
});

const counterProps: CounterWithActionsProps = {
  limit: 10,
  onChange: onChangeCounter,
  className: "product_information__confirm-counter",
};

const addCartProps: ButtonBlackProps = {
  ariaLabel: "add to cart",
  rounded: true,
  onClick: handleClickAddCart,
  className: "product_information__confirm-add-cart",
  children: lang.en.productInformation.addCart,
};
</script>

<template>
  <article class="product-information">
    <SharedMfe
      :loader="loadInformationItemClothes"
      :component-props="infoProps"
      loading-class="product-information__info-loader"
    />

    <hr class="product-information__separator" />

    <div class="product-information__color">
      <p class="product-information__subtitle">{{ lang.en.productInformation.color.subTitle }}</p>

      <div v-if="props.colors.length" class="product-information__colors">
        <SharedMfe
          v-for="color in props.colors"
          :key="color.id"
          :loader="loadColorCircle"
          :component-props="colorProps(color)"
          loading-class="product-information__color-loader"
        />
      </div>
    </div>

    <hr class="product-information__separator" />

    <div class="product-information__size">
      <p class="product-information__subtitle">{{ lang.en.productInformation.size.subTitle }}</p>

      <div v-if="props.sizes.length" class="product-information__sizes">
        <SharedMfe
          v-for="size in props.sizes"
          :key="size.id"
          :loader="loadTagSimple"
          :component-props="sizeProps(size)"
          loading-class="product-information__size-loader"
        />
      </div>
    </div>

    <hr class="product-information__separator" />

    <div class="product_information__confirm">
      <SharedMfe
        :loader="loadCounterWithActions"
        :component-props="counterProps"
        loading-class="product-information__counter-loader"
      />

      <SharedMfe
        :loader="loadButtonBlack"
        :component-props="addCartProps"
        loading-class="product-information__add-cart-loader"
      />
    </div>
  </article>
</template>

<style>
.product-information {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1.5rem;
  width: 100%;
  height: 100%;
}

.product-information__separator {
  width: 100%;
  background-color: var(--color-black-10);
}

.product-information__color,
.product-information__size {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  height: auto;
}

.product-information__subtitle {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-black-60);
}

.product-information__colors {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-start;
  gap: 0.75rem;
  width: 100%;
  height: auto;
}

.product-information__sizes {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-self: flex-start;
  gap: 0.5rem;
  width: 100%;
  height: auto;
}

.product-information__sizes-size {
  font-size: 0.875rem;
  font-weight: 400;
  background-color: var(--color-gray-light-neutral);
  color: var(--color-black-60);
}

.skeleton-shimmer.product-information__info-loader {
  width: 100%;
  height: 11rem;
  border-radius: 0.5rem;
}

.skeleton-shimmer.product-information__color-loader {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}

.skeleton-shimmer.product-information__size-loader {
  width: 3rem;
  height: 2rem;
  border-radius: 0.5rem;
}

.skeleton-shimmer.product-information__counter-loader {
  width: 35%;
  height: 100%;
  border-radius: 0.625rem;
}

.skeleton-shimmer.product-information__add-cart-loader {
  width: 65%;
  height: 100%;
  border-radius: 1.5rem;
}

.product_information__confirm {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  height: 2.75rem;
}

.product_information__confirm-counter-wrapper {
  width: 35%;
  height: 100%;
}

.product_information__confirm-add-cart-wrapper {
  width: 65%;
  height: 100%;
}

.product_information__confirm-counter {
  width: 100%;
  height: 100%;
}

.product_information__confirm-add-cart {
  width: 100%;
  height: 100%;
  padding: 0;
}

@media screen and (width >= 1024px) {
  .product-information {
    width: 50%;
  }

  .product-information__subtitle {
    font-size: 1rem;
  }

  .product-information__colors {
    gap: 1rem;
  }

  .product-information__sizes {
    gap: 0.75rem;
  }

  .product-information__sizes-size {
    font-size: 1rem;
  }

  .product_information__confirm {
    gap: 1.25rem;
    height: 3.25rem;
  }
}
</style>
