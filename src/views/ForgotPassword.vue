<script setup lang="ts">
import { publicAuriginAfricaRequest } from "@/api/requests";
import { AxiosError } from "axios";
import { ref, onMounted, watch } from "vue";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";

const email = ref("");
const isSent = ref(false);
const isLoading = ref(false);
const toast = useToast();
const router = useRouter();
const requestPasswordResetLink = async (e: Event) => {
  e.preventDefault();

  try {
    if (!email.value) {
      toast.error("Email is required", {
        position: "top-right",
        duration: 5000,
        pauseOnHover: true,
        type: "error",
      });
      return;
    }
    isLoading.value = true;
    const response = await publicAuriginAfricaRequest.post(
      "/auth/request-password-reset",
      {
        email: email.value,
      }
    );
    const data = response.data;
    toast.success(data.message, {
      position: "top-right",
      duration: 5000,
      pauseOnHover: true,
      type: "success",
    });
    isSent.value = true;
    // await router.push({ name: 'login' })
  } catch (err: any) {
    if (err instanceof AxiosError) {
      toast.error(err.response!.data.message, {
        position: "top-right",
        duration: 5000,
        pauseOnHover: true,
        type: "error",
      });
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <main class="min-h-screen bg-slate-300 flex justify-center items-center">
    <div v-if="isSent" class="p-10 bg-white rounded">
      <p class="text-center">
        Password reset link sent to your email address.
        <span class="block"> Please check your email </span>
      </p>
      <div class="flex justify-center">
        <router-link
          :to="{ name: 'login' }"
          class="bg-primary-600 text-white mt-4 px-5 py-2 rounded"
          >Back to login</router-link
        >
      </div>
    </div>
    <div v-else>
      <form
        @submit="requestPasswordResetLink"
        class="p-10 bg-white rounded shadow"
      >
        <h1 class="text-center font-medium text-2x my-2">
          Reset your account password
        </h1>
        <div>
          <label for="email" class="block">Email</label>
          <input
            v-model="email"
            type="email"
            name="email"
            id="email"
            class="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter your email address"
          />
        </div>
        <div class="py-4">
          <button
            :disabled="isLoading"
            :class="[{ 'opacity-50 cursor-not-allowed': isLoading }]"
            type="submit"
            class="w-full block text-center text-white bg-primary-500 hover:bg-bg-primary-700 px-2 py-1.5 rounded-md"
          >
            <span
              v-if="isLoading"
              class="flex items-center justify-center gap-2"
            >
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
              Send link
            </span>
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
/* code */
</style>
