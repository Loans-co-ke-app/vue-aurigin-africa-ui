<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/useAuthStore";
const { authStateUser } = storeToRefs(useAuthStore());
const store = useAuthStore();
const { isOpen } = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["toggleSidebar"]);
</script>
<template>
  <div
    :class="[
      'fixed',
      'top-8',
      'left-0',
      'h-screen p-4',
      'bg-gray-100',
      { 'w-64': isOpen, 'w-20': !isOpen },
      { 'lg:w-64': !isOpen },
    ]"
  >
    <button class="text-white p-4" @click="emit('toggleSidebar')">
      <i class="fas" :class="{ 'fa-bars': !isOpen, 'fa-times': isOpen }"></i>
    </button>
    <!-- Add your sidebar content here -->
    <div>
        {{ authStateUser?.username  }}
    </div>
  </div>
</template>
