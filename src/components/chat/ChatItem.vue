<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted, watch } from "vue";
const autoSize = () => {
  const el = ref<HTMLTextAreaElement | null>(null);
  const resize = () => {
    if (el.value) {
      el.value.style.height = "auto";
      el.value.style.height = el.value.scrollHeight + "px";
    }
  };
  onMounted(() => {
    resize();
  });
  onBeforeUnmount(() => {
    if (el.value) {
      el.value.style.height = "auto";
    }
  });
  return { el, resize };
};
</script>
<template>
  <main class="min-h-[90vh] relative ">
    <!-- Chat history -->
    <div class="absolute top-0 left-0 right-0 bottom-20  overflow-auto">
      <div
        ref="chatHistory"
        class="flex flex-col flex-grow justify-end h-full px-4 py-2 space-y-2 rounded mb-4"
      >
        <!-- Chat item -->
        <div
          class="flex flex-col py-8 bg-gray-100 rounded p-2"
          v-for="x of Array.from({ length: 20 })"
        >
          <!-- Question -->
          <p
            class="flex-grow text-primary-800 rounded p-2 font-bold text-lg border-b-2 border-primary-700 w-fit"
          >
            What is the best bank in Kenya?
          </p>
          <!-- Answer -->
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit perspiciatis voluptatibus facere assumenda enim
            repudiandae alias error velit, commodi quia libero, dicta fuga natus
            magnam autem nostrum. Quas similique hic quo. Corrupti neque
            repellat obcaecati nam soluta optio dicta quam.
          </p>
        </div>
      </div>
    </div>

    <!-- Chat input -->
    <div
      class="fixed bottom-5 left-0 right-0 mx-auto bg-white max-w-2xl rounded border border-primary-700 shadow"
    >
      <div class="flex items-center space-x-2 p-2">
        <textarea
            ref="chatInput"
            autoSize
          placeholder="Type a message"
          class="flex-grow px-4 py-2 bg-gray-100 rounded shadow focus:outline-none focus:ring-2 focus:ring-primary-700 resize-none"
        />
        <button
          class="px-4 py-2 bg-primary-700 text-white rounded shadow focus:outline-none focus:ring-2 focus:ring-primary-700"
        >
          Send
        </button>
      </div>
    </div>
  </main>
</template>
<style scoped>
textarea {
  min-height: 2rem;
  /* max-height: 10rem; */
  overflow-y: auto;
}
</style>
