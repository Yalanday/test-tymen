<script setup lang="ts">
import GridCell from "./components/GridCell.vue";
import LeftSkeleton from "./components/LeftSkeleton.vue";
import BottomSkeleton from "./components/BottomSkeleton.vue";
</script>

<template>
  <main class="main">
    <div class="main__content">
      <left-skeleton/>
      <grid-cell/>
    </div>
    <bottom-skeleton/>
  </main>
</template>

<style scoped>
.main__content {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}
</style>
