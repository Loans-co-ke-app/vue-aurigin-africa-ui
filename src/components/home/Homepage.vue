<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
// import socket from "@/socket";


// slider component
const connected = ref(false);
// onMounted(() => {
//   socket.connect();
//   socket.on("connect", () => {
//     connected.value = true;
//     console.log("connected");

//   });
//   socket.on("disconnect", () => {
//     connected.value = false;
//     console.log("disconnected");
//   });
//   socket.on("connect_error", () => {
//     connected.value = false;
//     console.log("connect_error");
//   });
//   socket.on("connect_timeout", () => {
//     connected.value = false;
//     console.log("connect_timeout");
//   });
//   socket.on("reconnect", () => {
//     connected.value = true;
//     console.log("reconnect");
//   });
//   socket.on("welcome", (data) => {
//     connected.value = false;
//     console.log(data);
//   });
// });
</script>

<template>
  <main
    style="background-image: url('https://images.unsplash.com/photo-1624523979864-60c8f816be3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80');"
    class="min-h-screen bg-slate-900 bg-no-repeat bg-cover bg-center bg-blend-overlay flex flex-col justify-center items-center">
    <div class="container mx-auto flex flex-col justify-center items-center gap-4">
      <div class="text-white space-y-4 text-center">
        <h1 class="text-4xl uppercase font-bold">Aurigin Africa</h1>
        <p class="max-w-lg text-lg">
          Aurigin Africa is new Banking AI that helps you manage know your banks and manage your finances.
        </p>
      </div>
      <div>
        <div class="h-16 w-2 bg-white rounded"></div>
      </div>
      <div>
        <button class="px-4 py-2 bg-red-600 rounded-md font-bold text-white text-lg">
          Try it now
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* code */
</style>
