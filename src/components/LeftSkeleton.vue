<script setup lang="ts">
import {ref} from "vue";

const skeletonItems = ref([
  {width: '190px', height: '26px', margin: '24px'},
  {width: '155px', height: '10px', margin: '16px'},
  {width: '190px', height: '10px', margin: '16px'},
  {width: '170px', height: '10px', margin: '16px'},
  {width: '160px', height: '10px', margin: '16px'},
  {width: '140px', height: '10px', margin: '24px'},
  {width: '80px', height: '10px', margin: '0'}
]);

</script>

<template>
  <div class="left-skeleton">
    <img class="left-skeleton__img" alt="left_skeleton" src="/left-skeleton-img.png"/>
    <div
        v-for="(item, index) in skeletonItems"
        :key="index"
        class="left-skeleton__placeholder"
        :style="{ width: item.width, height: item.height, marginBottom: item.margin }"
    ></div>
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

.left-skeleton__placeholder {
  background: linear-gradient(to right, #3C3C3C, #444444, #333333);
  border-radius: 4px;
}
</style>
