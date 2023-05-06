<script setup lang="ts">
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },

});
</script>

<template>
  <Teleport to="body">
    <div v-if="props.isOpen" class="modal">
      <slot name="content">
        <div class="h-28 w-28 p-10 flex items-center justify-center bg-white ">
          <h1>Modal content</h1>
        </div>
      </slot>
    </div>
  </Teleport>
</template>

<style scoped>
/* code */
.modal {
  /* position: fixed;
  z-index: 999999999999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
    background-color: #fff; */
  @apply fixed z-[1000] bg-gray-900 opacity-95 overflow-auto h-screen w-screen top-0 left-0 flex items-center justify-center;
}
</style>
