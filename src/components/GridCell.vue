<script setup lang="ts">
import {ref} from 'vue';

// Тип для элемента в ячейке
interface GridItem {
  color: string;
  id: number
}

// Сетка 5x5
const grid = ref<(GridItem | null)[][]>(
    Array.from({length: 5}, () => Array.from({length: 5}, () => null))
);

// Добавляем три элемента в разные ячейки
const gridItems = ref([
  grid.value[0][0] = {color: '#93bb77', id: 1},
  grid.value[1][1] = {color: '#b9a276', id: 2},
  grid.value[2][2] = {color: '#6b73c2', id: 3},
] as GridItem[])


// Выбранный цвет для нового элемента
const selectedColor = ref('#000000');

// Добавление нового элемента в первую свободную ячейку
const addNewItem = () => {

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (!grid.value[row][col]) {
        gridItems.value.push(grid.value[row][col] = {color: selectedColor.value, id: gridItems.value.length + 1});
        return;
      }
    }
  }
  alert('Все ячейки заняты!');
};

// Логика перетаскивания
let draggedItem: { row: number; col: number } | null = null;

const onDragStart = (row: number, col: number) => {
  draggedItem = {row, col};
};

const onDrop = (targetRow: number, targetCol: number) => {
  if (draggedItem) {
    const {row: sourceRow, col: sourceCol} = draggedItem;
    if (!grid.value[targetRow][targetCol]) {
      const item = grid.value[sourceRow][sourceCol];
      grid.value[sourceRow][sourceCol] = null;
      grid.value[targetRow][targetCol] = item;
    }

    draggedItem = null;
  }
};

const onDragEnd = () => {
  draggedItem = null;
};

const cellClickHandler = (evt: MouseEvent) => {
  console.log(evt.target)
}

</script>

<template>
  <div class="grid-cell">
    <div class="grid-cell__add">
      <label for="colorPicker">Выберите цвет: </label>
      <input type="color" id="colorPicker" v-model="selectedColor"/>
      <button @click="addNewItem">Добавить элемент</button>
    </div>

    <!-- Сетка 5x5 -->
    <div class="grid-cell__grid grid">
      <div
          v-for="(row, rowIndex) in grid"
          :key="rowIndex"
          class="grid-cell__row row"
      >
        <div
            v-for="(cell, colIndex) in row"
            :key="colIndex"
            class="grid-cell__cell cell"
            @dragover.prevent
            @drop="onDrop(rowIndex, colIndex)"
        >
          <div
              v-if="cell"
              @click="(evt) => cellClickHandler(evt)"
              class="grid-cell__item item"
              :data-id="cell.id"
              draggable="true"
              @dragstart="onDragStart(rowIndex, colIndex)"
              @dragend="onDragEnd"
          >
            <!-- SVG-элемент -->
            <svg width="90" height="90" xmlns="http://www.w3.org/2000/svg">
              <!-- Нижний квадрат -->
              <rect x="25" y="20" width="48" height="48" :fill="cell.color" style="opacity: 0.8"/>
              <!-- Верхний смещенный квадрат -->
              <rect x="15" y="30" width="48" height="48" :fill="cell.color"/>
            </svg>
            <div class="item__id">
              <span>{{ cell.id }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.grid-cell {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #ccc;
  box-sizing: initial;
}

.grid-cell__add {
  position: absolute;
}

.grid {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
}

.cell {
  width: 105px;
  height: 100px;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item {
  cursor: grab;
  user-select: none;
  position: relative;
  width: 100%;
  height: 100%;
}

.item__id {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;
  border-radius: 25% 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item__id span {
  font-size: 10px;
}
</style>