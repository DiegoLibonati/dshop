<script setup lang="ts">
import "@shared-core/components/Skeletons/SkeletonShimmer/SkeletonShimmer.css";

defineProps<{
  rounded?: boolean;
  loadingClass?: string;
}>();
</script>

<template>
  <div :class="['skeleton-shimmer', rounded && 'skeleton-shimmer--rounded', loadingClass]" />
</template>
