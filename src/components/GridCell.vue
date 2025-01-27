<script setup lang="ts">
import {onMounted, onUnmounted, type Ref, ref, watch} from 'vue';
import SkeletonLine from "./SkeletonLine.vue";
import CloseButton from "./CloseButton.vue";
import {skeletonItemsDrawer} from "../constants/skeleton.ts";
import ButtonElement from "./ButtonElement.vue";
import type {DrawerValueType, GridItem} from "../types.ts";

///////////////// Сетка 5x5 ////////////////
const grid = ref<(GridItem | null)[][]>(
    Array.from({length: 5}, () => Array.from({length: 5}, () => null))
);

// три стартовых элемента в разные ячейки
const gridItems = ref([
  {color: '#93bb77', id: +Date.now() + 1, quantity: 5, x: 1, y: 1},
  {color: '#b9a276', id: +Date.now() + 2, quantity: 4, x: 2, y: 2},
  {color: '#6b73c2', id: +Date.now() + 3, quantity: 8, x: 3, y: 3},
] as GridItem[])

onMounted(() => {
  if (localStorage.getItem('gridItems')) {
    gridItems.value = JSON.parse(localStorage.getItem('gridItems')!)
  }

  gridItems.value.forEach(item => {
    grid.value[item.y][item.x] = item
  })
})

watch([gridItems.value, grid.value], () => {
  localStorage.setItem('gridItems', JSON.stringify(gridItems.value))
})

///////////////// Логика перетаскивания  /////////////////
let draggedItem: { row: number; col: number } | null = null;

const onDragStart = (row: number, col: number) => {
  draggedItem = {row, col};
};

const onDrop = (targetRow: number, targetCol: number) => {
  if (draggedItem) {
    const {row: sourceRow, col: sourceCol} = draggedItem;
    if (!grid.value[targetRow][targetCol]) {
      const item: any = grid.value[sourceRow][sourceCol];
      grid.value[sourceRow][sourceCol] = null;
      grid.value[targetRow][targetCol] = item;
      item.y = targetRow;
      item.x = targetCol;
    }
    draggedItem = null;
  }
};

const onDragEnd = () => {
  draggedItem = null;
};

///////////////// Добавить новый элемент ////////////////

const add = ref<HTMLElement | null>(null);

const addActiveClass = () => {
  if (add.value) {
    add.value.classList.add('active');
  }
};

const removeActiveClass = () => {
  if (add.value) {
    add.value.classList.remove('active');
  }
};

// Выбранный цвет для нового элемента
const selectedColor = ref('#b35151');

// Добавление нового элемента в первую свободную ячейку
const addNewItem = (num: number) => {

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (!grid.value[row][col]) {
        gridItems.value.push(grid.value[row][col] = {
          color: selectedColor.value,
          id: +Date.now(),
          quantity: num,
          y: row,
          x: col
        });
        removeActiveClass();
        quantity.value = 1;
        return;
      }
    }
  }
  alert('Все ячейки заняты!');
};

///////////////// Правая модалка Drawer ////////////////

const drawer = ref<HTMLElement | null>(null);
// Значения из элемента для Drawer
const drawerValue: Ref<DrawerValueType> = ref({} as DrawerValueType);
const isDrawerOpen = ref(false);

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const closeDrawer = () => {
  isDrawerOpen.value = false;
};

const quantity = ref(1);

function setDrawerValue(color: string, quantity: number, id: number, x: number, y: number) {
  drawerValue.value.color = color;
  drawerValue.value.quantity = quantity;
  drawerValue.value.id = id;
  drawerValue.value.x = x;
  drawerValue.value.y = y;
}

const cellClickHandler = (color: string, quantity: number, id: number, x: number, y: number) => {
  setDrawerValue(color, quantity, id, x, y)
}

const checkIfNoItemClass = (evt: MouseEvent) => {
  const parentElement = evt.currentTarget as HTMLElement;
  const items = parentElement.querySelectorAll('.item');
  if (items.length === 0) {
    addActiveClass()
  } else {
    toggleDrawer()
    removeActiveClass()
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isDrawerOpen.value) {
    closeDrawer();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

///////////////// Модалка выплывашка для ввода значения ////////////////

const isDrawerFormOpen = ref(false);

const toggleFormDrawer = () => {
  isDrawerFormOpen.value = !isDrawerFormOpen.value;
};

const closeFormDrawer = () => {
  isDrawerFormOpen.value = false;
};

const inputValue: Ref<string> = ref('');

const combinationHandler = () => {
  closeDrawer();
  closeFormDrawer();
  inputValue.value = ''
}

const handleDeleteItems = (id: number, value: number) => {
  gridItems.value.filter((item) => {
    if (item.id === id && value === item.quantity) {
      gridItems.value.splice(gridItems.value.indexOf(item), 1);
      grid.value[item.y][item.x] = null;
      combinationHandler()
    } else if (item.id === id && value < item.quantity) {
      item.quantity = item.quantity - value;
      combinationHandler()
    }
  });
}

const handleChangeInputValue = (maxValue: number) => {
  inputValue.value = inputValue.value.replace(/\D/g, '');
  if (Number(inputValue.value) > maxValue) {
    inputValue.value = String(maxValue);
  }
}

</script>

<template>

  <!-- Выплывашка Добавить элемент -->
  <div class="grid-cell">
    <div ref="add" class="grid-cell__add">
      <label for="colorPicker">Выберите цвет: </label>
      <input class="color" type="color" id="colorPicker" v-model="selectedColor"/>
      <input class="quantity" type="number" id="quantity" v-model="quantity"/>
      <button-element @click="addNewItem(quantity)" bcg-color="#ff8888" color="#ffffff" text="Добавить"/>
      <close-button @click="removeActiveClass"/>
    </div>

    <!-- Сетка 5x5 -->
    <div class="grid-cell__grid grid">
      <div
          v-for="(row, rowIndex) in grid"
          :key="rowIndex"
          class="grid-cell__row row"
      >
        <div
            @click="(evt)=> {checkIfNoItemClass(evt)}"
            v-for="(cell, colIndex) in row"
            :key="colIndex"
            class="grid-cell__cell cell"
            @dragover.prevent
            @drop="onDrop(rowIndex, colIndex)"
        >
          <div
              v-if="cell"
              @click="cellClickHandler(cell.color, cell.quantity, cell.id, cell.x, cell.y)"
              class="grid-cell__item item"
              :data-id="cell.id"
              :key="cell.id"
              draggable="true"
              @dragstart="onDragStart(rowIndex, colIndex)"
              @dragend="onDragEnd"
          >
            <svg width="90" height="90" xmlns="http://www.w3.org/2000/svg">
              <!-- Нижний квадрат -->
              <rect x="25" y="20" width="48" height="48" :fill="cell.color" style="opacity: 0.8"/>
              <!-- Верхний смещенный квадрат -->
              <rect x="15" y="30" width="48" height="48" :fill="cell.color"/>
            </svg>
            <div class="item__id">
              <span>{{ cell.quantity }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Правая модалка Drawer -->
    <div ref="drawer" class="drawer" :class="{ active: isDrawerOpen }">
      <close-button @click="closeDrawer"/>
      <div class="drawer__svg-wrap">
        <svg width="130" height="130" xmlns="http://www.w3.org/2000/svg">
          <!-- Нижний квадрат -->
          <rect x="0" y="15" width="115" height="115" :fill="drawerValue.color" style="opacity: 0.8"/>
          <!-- Верхний смещенный квадрат -->
          <rect x="15" y="0" width="115" height="115" :fill="drawerValue.color"/>
        </svg>
      </div>
      <skeleton-line :skeleton-items="skeletonItemsDrawer"/>
      <button-element @click="toggleFormDrawer"
                      bcg-color="#ff8888" color="#ffffff"
                      text="Удалить предмет"/>

      <!-- Нижняя модалка в левой модалке Drawer -->
      <div class="drawer__form" :class="{ active: isDrawerFormOpen }">
        <input class="drawer__form-input"
               @input="handleChangeInputValue(Number(drawerValue.quantity))"
               v-model="inputValue"
               type="text" name="" id="" placeholder="Введите количество">
        <div class="drawer__button-wrap">
          <button-element @click="closeFormDrawer"
                          bcg-color="#ffffff"
                          color="#2d2d2d"
                          text="Отмена"/>
          <button-element @click="handleDeleteItems(drawerValue.id, Number(inputValue))"
                          bcg-color="#ff8888"
                          color="#ffffff"
                          text="Подтвердить"/>
        </div>
      </div>
    </div>
    <div class="overlay" v-if="isDrawerOpen" @click="closeDrawer"></div>
  </div>
</template>

<style scoped>

.grid-cell {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #ccc;
  box-sizing: initial;
  cursor: pointer;
}

.grid-cell__add {
  position: absolute;
  border-radius: 10px;
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: center;
  top: -100%;
  left: 0;
  right: 0;
  opacity: 0;
  padding: 10px 40px 10px 10px;
  background-color: silver;
  transition: top 0.3s ease, opacity 0.3s ease;
}

.grid-cell__add label {
  color: #000000;
  flex-shrink: 0;
}

.grid-cell__add .color {
  width: 70px;
  flex-shrink: 0;
}

.grid-cell__add .quantity {
  width: 70px;
  flex-shrink: 0;
}

.grid-cell__add.active {
  top: 0; /* Когда класс active, элемент появляется в контейнере */
  opacity: 1; /* Элемент становится видимым */
  z-index: 1000;
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
  min-width: 16px;
  height: 16px;
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;
  border-radius: 25% 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
}

.item__id span {
  font-size: 10px;
}

.drawer {
  position: absolute;
  top: 0;
  right: -250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  height: 100%;
  background-color: #262626;
  transition: right 0.3s ease-in-out;
  z-index: 2;
  padding: 60px 15px 20px;
}

.drawer__svg-wrap {
  margin-bottom: 30px;
}

.drawer__form {
  position: absolute;
  bottom: -133px;
  padding: 20px 21px;
  z-index: 3;
  background-color: #262626;
  transition: bottom 0.3s ease-in-out;
}

.drawer__form.active {
  bottom: 0;
}

.drawer__form-input {
  width: 100%;
  height: 40px;
  padding: 11px;
  margin-bottom: 18px;
}

.drawer__button-wrap {
  display: flex;
  gap: 10px;
}

.drawer.active {
  right: 0;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
</style>