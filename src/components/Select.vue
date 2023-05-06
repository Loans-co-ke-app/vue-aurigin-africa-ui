<template>
  <div>
    <label>Select options:</label>
    <div>
      <select @select="hadleSelect" v-model="selected">
        <option v-for="(option, index) in availableOptions" :key="index" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <div>
      <button @click="clearSelections">Clear Selections</button>
    </div>
    <div>
      <p>Selected Options:</p>
      <ul>
        <li v-for="(option, index) of selectedOptions" :key="index">
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
  <div>
    <label>Select options:</label>
    <div>
      <input type="checkbox" v-model="selectAll" @click="selectAllOptions" />
      <span>Select All</span>
    </div>
    <div v-for="(option, index) in options" :key="index">
      <input type="checkbox" :id="'option-' + index" :value="option" v-model="selectedOptions" />
      <label :for="'option-' + index">{{ option }}</label>
    </div>
    <div>
      <button @click="clearSelections">Clear Selections</button>
    </div>
    <div>
      <p>Selected Options:</p>
      <ul>
        <li v-for="(option, index) in selectedOptions" :key="index">
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
const options = ref([
  "Option 1",
  "Option 2",
  "Option 3",
  "Option 4",
  "Option 5",
]);
const selectedOptions = ref<Array<any>>([]);
const selectAll = ref(false);
const selectAllOptions = () => {
  if (selectAll.value) {
    selectedOptions.value = options.value.slice();
  } else {
    selectedOptions.value = [];
  }
};
const clearSelections = () => {
  selectedOptions.value = [];
  selectAll.value = false;
};
const availableOptions = computed(() => {
  return options.value.filter((option) => {
    return !selectedOptions.value.includes(option);
  });
});
const selected = ref('')
const hadleSelect = (option: any) => {
  if (selectedOptions.value.includes(option)) {

    !selectedOptions.value.includes(option) && selectedOptions.value.push(option)
  } else {
    selectedOptions.value.push(option);
  }
};
</script>
