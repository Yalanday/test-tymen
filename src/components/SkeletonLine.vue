<script setup lang="ts">
import type {PropsSkeleton} from "../types.ts";

const props = defineProps<PropsSkeleton>();

</script>

<template>
  <div
      v-for="(item, index) in props.skeletonItems"
      :key="index"
      class="left-skeleton__placeholder"
      :style="{ width: item.width, height: item.height, marginBottom: item.margin }"
  ></div>
</template>

<style scoped>
.left-skeleton__placeholder {
  background: linear-gradient(to right, #3c3c3c, #444444, #333333);
  border-radius: 4px;
  background-size: 200% 100%;
  animation: gradient-shift 3s infinite;
}

@keyframes gradient-shift {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>