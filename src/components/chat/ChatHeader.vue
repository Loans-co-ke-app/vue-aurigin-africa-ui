<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/useAuthStore";
const { authStateUser } = storeToRefs(useAuthStore());
const store = useAuthStore();
</script>
<template>
  <header
    class="fixed top-0 right-0 w-full h-16 shadow z-50 bg-gray-100 flex items-center"
  >
    <div class="max-w-7xl mx-auto w-full flex justify-between">
      <fa
        :icon="['fas', 'bars']"
        class="text-2xl text-gray-700 ml-4 cursor-pointer"
      />
      <div class="flex items-center gap-2">
        <h1 class="text-sm text-gray-700 ">{{ authStateUser?.username }}</h1>
        <button class="flex items-center bg-red-400 px-4 py-2 rounded" @click="store.logoutUser()">
          <fa
            :icon="['fas', 'sign-out-alt']"
            class="text-2xl text-gray-700 ml-4 cursor-pointer"
          />
          <span class="text-sm text-gray-700">Logout</span>
        </button>
      </div>
    </div>
  </header>
</template>
