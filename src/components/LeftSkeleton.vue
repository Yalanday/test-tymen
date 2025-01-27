<script setup lang="ts">
import SkeletonLine from "./SkeletonLine.vue";
import {leftSkeletonItems} from "../constants/skeleton.ts";

</script>

<template>
  <div class="left-skeleton">
    <img class="left-skeleton__img" alt="left_skeleton" src="/left-skeleton-img.png"/>
    <skeleton-line :skeleton-items="leftSkeletonItems" />
  </div>
</template>

<style scoped>
.left-skeleton {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18px 14px 24px;
  border: 1px solid #4d4d4d;
  border-radius: 12px;
}

.left-skeleton__img {
  margin-bottom: 20px;
}

</style>
