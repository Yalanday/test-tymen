<script setup lang="ts">
import type {PropsButtonType} from "../types.ts";

const props = defineProps<PropsButtonType>();

</script>

<template>
  <button class="button"
          :style="{backgroundColor: props.bcgColor, color: props.color}"
          v-html="props.text">
  </button>
</template>

<style scoped>
.button {
  width: 100%;
  outline: none;
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  transition: opacity 0.3s ease-in-out;
  border: none
}

.button:hover {
  opacity: 0.7;
}
</style>