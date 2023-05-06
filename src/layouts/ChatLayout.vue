<script  setup lang="ts" >
import ChatSidebar from "@/components/chat/ChatSidebar.vue";
import ChatHeader from "@/components/chat/ChatHeader.vue";
import ChatItem from "@/components/chat/ChatItem.vue";
import { computed, ref } from "vue";
const sidebarOpen = ref<boolean>(false);
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
</script>
<template>
  <main
    style="
      background-image: url('https://images.unsplash.com/photo-1624523979864-60c8f816be3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80');
    "
    class="min-h-screen bg-slate-900 bg-no-repeat bg-cover bg-center bg-blend-overlay flex flex-col justify-center items-center"
  >
    <div class="container max-w-7xl mx-auto p-4  min-h-screen">
      <!-- Sidebar -->
      <chat-sidebar :isOpen="sidebarOpen" @toggleSidebar="toggleSidebar" />
      <!-- header -->
      <chat-header />
      <chat-item />
    </div>
  </main>
</template>
