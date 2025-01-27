<script setup lang="ts">
import GridCell from "./components/GridCell.vue";
import LeftSkeleton from "./components/LeftSkeleton.vue";
</script>

<template>
  <main class="main">
    <left-skeleton/>
    <grid-cell/>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  gap: 24px;

}

</style>
