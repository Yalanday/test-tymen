<script setup lang="ts">
import {ref} from "vue";

const skeletonItems = ref([
  {width: '95%', height: '36px', margin: '0'},
]);

</script>

<template>
  <div class="bottom-skeleton">
    <div
        v-for="(item, index) in skeletonItems"
        :key="index"
        class="bottom-skeleton__placeholder"
        :style="{ width: item.width, height: item.height, marginBottom: item.margin }"
    ></div>
    <button class="close">✖</button>
  </div>
</template>

<style scoped>
.bottom-skeleton {
  position: relative;
  padding: 18px;
  border: 1px solid #4d4d4d;
  border-radius: 12px;
}

.bottom-skeleton__placeholder {
  background: linear-gradient(to right, #3C3C3C, #444444, #333333);
  border-radius: 12px;
}

.bottom-skeleton .close {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  width: 24px;
  height: 24px;
  padding: 0;

}

</style>
