<script setup lang="ts">
import privateAuriginAfricaRequest from "@/api/requests";
import { ref, onBeforeUnmount, onMounted, watch } from "vue";
import {QuestionAnswerType} from "@/types";

const chatInput = ref<HTMLTextAreaElement | null>(null);
const isLoading = ref<boolean>(false);
const chatMessages = ref<
  Array<QuestionAnswerType>
>([]);
const postQuestion = async () => {
  isLoading.value = true;
  try {
    const question = chatInput.value?.value;
    if (!question) {
      alert("Please enter a question");
      return;
    }
    const response = await privateAuriginAfricaRequest.post("/api/questions/", {
      question,
    });
    const data = await response.data;
    
    // console.log(Object.keys(data));
    chatMessages.value.push(data);
    chatInput.value!.value = "";
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
  const chatHistory = ref<HTMLDivElement | null>(null);

  onMounted(() => {
    chatHistory.value?.scrollIntoView();
  });

  onBeforeUnmount(() => {
    chatHistory.value?.scrollIntoView();
  });

  watch(chatMessages, () => {
    chatHistory.value?.scrollIntoView();
  });

  // console.log(data);
};
</script>
<template>
  <main class="h-[90vh] relative overflow-y-scroll">
    <!-- Chat history -->
    <div class="mt-10 py-4 left-0 right-0 bottom-20">
      <div
        ref="chatHistory"
        class="flex flex-col p-4 justify-end h-full px-4 py-2 space-y-2 rounded mb-4"
      >
        <!-- Chat item -->
        <div
          class="flex flex-col py-8 bg-gray-100 rounded p-2"
          v-for="x of chatMessages"
        >
          <!-- Question -->
          <p
            class="flex-grow text-primary-800 rounded p-2 font-bold text-lg border-b-2 border-primary-700 w-fit"
          >
            {{ x.question }}
          </p>
          <!-- Answer -->
          <p>
            {{ x.answer }}
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
          @click="postQuestion"
          class="px-4 py-2 bg-primary-700 text-white rounded shadow focus:outline-none focus:ring-2 focus:ring-primary-700"
        >
          <span v-if="isLoading" class="flex items-center justify-center gap-2">
            <svg class="animate-spin -ml-1 mr-1 h-4 w-4" viewBox="0 0 24 24">
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-2.009a5.995 5.995 0 01-2-10.69L4.701 6.7z"
              ></path>
            </svg>
            <span> Loading </span>
          </span>
          <span
            v-else="!isLoading"
            class="flex items-center flex-row-reverse justify-center gap-2"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
            Send
          </span>
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
