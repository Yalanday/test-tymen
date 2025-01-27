<script setup lang="ts">
import CloseButton from "./CloseButton.vue";
import SkeletonLine from "./SkeletonLine.vue";
import {bottomSkeletonItems} from "../constants/skeleton.ts";

</script>

<template>
  <div class="bottom-skeleton">
    <skeleton-line :skeleton-items="bottomSkeletonItems"/>
    <close-button/>
  </div>
</template>

<style scoped>
.bottom-skeleton {
  position: relative;
  padding: 18px;
  border: 1px solid #4d4d4d;
  border-radius: 12px;
}

</style>
