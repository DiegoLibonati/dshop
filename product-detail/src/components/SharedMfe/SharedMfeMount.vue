<script setup lang="ts" generic="P extends object">
import { ref, computed, onMounted, onBeforeUnmount, inject, watch } from "vue";

import type { MfeCallbacks } from "shared-core/sdk";
import type { SharedMfeProps } from "@product-detail/types/props";

const props = defineProps<SharedMfeProps<P>>();

const containerRef = ref<HTMLDivElement | null>(null);
const callbacks = inject<MfeCallbacks | undefined>("mfeCallbacks", undefined);

const wrapperClass = computed<string | undefined>(() => {
  if (props.wrapperClass) return props.wrapperClass;

  const className = (props.componentProps as { className?: unknown }).className;
  return typeof className === "string" && className ? `${className}-wrapper` : undefined;
});

const mod = await props.loader();

const mountInto = (el: HTMLDivElement): void => {
  mod.mount(el, props.componentProps, {
    ...(callbacks ? { callbacks } : {}),
    ...(props.mfe ? { dataset: { mfe: props.mfe } } : {}),
  });
};

onMounted(() => {
  const el = containerRef.value;
  if (!el) return;

  mountInto(el);
});

watch(
  () => props.componentProps,
  () => {
    const el = containerRef.value;
    if (!el) return;

    mountInto(el);
  }
);

onBeforeUnmount(() => {
  const el = containerRef.value;
  if (!el) return;

  mod.unmount(el);
});
</script>

<template>
  <div ref="containerRef" :class="wrapperClass" />
</template>
