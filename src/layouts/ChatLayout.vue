<script setup lang="ts">
import Sidebar from '@/components/chats/ChatSidebar.vue'
</script>
<template>
  <div>
    <div class="chat-layout">
      <div class="chat-layout__sidebar">
        <sidebar />
      </div>
      <div class="chat-layout__main">
        <router-view />
      </div>
    </div>
  </div>
</template>
