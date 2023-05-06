<!-- <script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/useAuthStore";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toast-notification";
import { AxiosError } from "axios";
import privateAuriginAfricaRequest from "@/api/requests";

const store = useAuthStore();
const router = useRouter();
const { authStateUser } = storeToRefs(useAuthStore());
const isLoading = ref<boolean>(false);
const toast = useToast();
const otp = ref("");
const tabActionType = ref<"resend-token" | "activate-account">(
  "activate-account"
);

const logout = async () => {
  store.logoutUser();
  await router.push({ name: "login" });
};

const handleActivateAccount = async (e: Event) => {
  e.preventDefault();
  isLoading.value = true;
  try {
    await privateAuriginAfricaRequest.post("/auth/activate-account", {
      email: authStateUser.value?.email,
      otp: otp.value,
    });
    toast.success("Account activated successfully", {
      position: "top-right",
      duration: 5000,
      pauseOnHover: true,
      type: "success",
    });
    const res = await privateAuriginAfricaRequest.get("/auth/profile");
    console.log(res.data);

    store.updateUser(res.data[0]);
    await router.push({ name: "home" });
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message, {
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
const handleResendOTP = async () => {
  try {
    isLoading.value = true;
    const response = await privateAuriginAfricaRequest.post(
      "auth/resend-activation-otp",
      {
        email: authStateUser.value?.email,
      }
    );
    const data = response.data;
    toast.success(data.message, {
      position: "top-right",
      duration: 5000,
      pauseOnHover: true,
      type: "success",
    });
    setTimeout(() => {
        otp.value = "";
      tabActionType.value = "activate-account";
    }, 5000);
  } catch (err: any) {
    if (err instanceof AxiosError) {
      toast.error(err.response?.data.message, {
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
  <main>
    <div class="flex flex-col items-center justify-center min-h-screen">
      <form
        @submit="handleActivateAccount"
        v-if="tabActionType === 'activate-account'"
        action=""
        class="w-full max-w-sm lg:max-w-lg border p-10 rounded shadow-md"
      >
        <div class="text-center flax flex-col gap-2">
          <h1 class="font-medium text-2xl">Activate your account</h1>
          <p>
            Enter the OTP sent to your email
            <span class="text-blue-500 cursor-pointer hover:underline">{{
              authStateUser?.email
            }}</span>
          </p>
        </div>
        <div class="flex flex-col items-center justify-center">
          <label for="otp" class="text-gray-700 text-sm font-bold mb-2 block"
            >OTP</label
          >

          <input
            type="text"
            class="input font-system-ui font-bold text-2xl w-fit text-center"
            v-model="otp"
            maxlength="6"
            minlength="6"
            placeholder="Enter OTP"
          />
        </div>
        <div class="flex items-center justify-center">
          <button
            :disabled="isLoading"
            :class="[{ 'opacity-50 cursor-not-allowed': isLoading }]"
            type="submit"
            class="mb-1.5 block w-full text-center text-white bg-primary-500 hover:bg-bg-primary-700 px-2 py-1.5 rounded-md"
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
              Activate account
            </span>
          </button>
        </div>
        <p class="text-gray-500 text-sm py-5 text-center">
          Didn't receive the OTP?
          <button
            type="button"
            class="text-blue-500 cursor-pointer hover:underline"
            @click="tabActionType = 'resend-token'"
          >
            Resend OTP
          </button>
        </p>
      </form>
      <div v-else class="p-4 shadow-sm flex justify-center items-center border">
        <div class="flex flex-col gap-4">
          <h1>
            Resend OTP to <span>{{ authStateUser?.email }}</span>
          </h1>
          <div>
            <button
              :disabled="isLoading"
              :class="[{ 'opacity-50 cursor-not-allowed': isLoading }]"
              type="button"
              @click="handleResendOTP"
              class="mb-1.5 block w-full text-center text-white bg-primary-500 hover:bg-bg-primary-700 px-2 py-1.5 rounded-md"
            >
              <span
                v-if="isLoading"
                class="flex items-center justify-center gap-2"
              >
                <svg
                  class="animate-spin -ml-1 mr-1 h-4 w-4"
                  viewBox="0 0 24 24"
                >
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
                Resend OTP
              </span>
            </button>
          </div>
        </div>
      </div>
      <p>
        <button
          type="button"
          class="text-blue-500 cursor-pointer hover:underline"
          @click="logout"
        >
          Logout
        </button>
      </p>
      <p class="text-gray-500 text-xs py-5">&copy;2023. All rights reserved.</p>
    </div>
  </main>
</template>
<style scoped>
.input {
  @apply appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500;
}
</style> -->
