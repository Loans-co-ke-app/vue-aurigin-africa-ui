<script setup lang="ts">
import { publicAuriginAfricaRequest } from "@/api/requests";
import AuriginAfricaValidator from "@/validators/AuriginAfricaValidator";
import useVuelidate from "@vuelidate/core";
import { helpers, minLength, required, sameAs } from "@vuelidate/validators";
import { AxiosError } from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

const toast = useToast();
const router = useRouter();
const showPassword = ref(false);
const token = router.currentRoute.value.query.token as string;
const redirecting = ref(false);
const formData = ref({
  password: "",
  confirmPassword: "",
});
const resetRules = {
  password: {
    required: helpers.withMessage("Password is required", required),
    minLength: helpers.withMessage(
      "Password must be at least 8 characters",
      minLength(8)
    ),
    lowercase: helpers.withMessage(
      "Password must contain at least one lowercase letter",
      AuriginAfricaValidator.passwordLowercase
    ),
    uppercase: helpers.withMessage(
      "Password must contain at least one uppercase letter",
      AuriginAfricaValidator.passwordUppercase
    ),
    number: helpers.withMessage(
      "Password must contain at least one number",
      AuriginAfricaValidator.passwordNumbers
    ),
    special: helpers.withMessage(
      "Password must contain at least one special character (e.g. !@#$%^&*)",
      AuriginAfricaValidator.passwordSpecialCharacters
    ),
  },
  confirmPassword: {
    equalToPassword: helpers.withMessage(
      "Passwords do not match",
      (value: string) => value === formData.value.password
    ),
  },
};
const isLoading = ref(false);
const $v = useVuelidate(resetRules, formData.value);
const handleFormSubmit = async (e: Event) => {
  e.preventDefault();
  if ($v.value.$invalid) {
    $v.value.$validate();
  } else {
    try {
      isLoading.value = true;
      const dataToSend = {
        password: formData.value.password,
        confirmPassword: formData.value.confirmPassword,
        token,
      };
      await publicAuriginAfricaRequest.post(`/auth/reset-password`, dataToSend);
      toast.success("Password reset successful", {
        position: "top-right",
        duration: 5000,
        pauseOnHover: true,
        type: "success",
      });
      redirecting.value = true;
      setTimeout(async () => {
        await router.push({ name: "login" });
      }, 5000);
    } catch (error: any) {
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
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-400 flex justify-center items-center">
    <form
      @submit.prevent="handleFormSubmit"
      action=""
      class="m-4 bg-white px-6 lg:max-w-md w-full rounded py-10"
    >
      <div class="text-center">
        <h1 class="font-bold text-xl">Reset Password</h1>
      </div>
      <div class="w-full">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-password"
        >
          New Password
        </label>
        <input
          v-model="formData.password"
          class="input"
          id="grid-new-password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="******"
          autocomplete="new-password"
          aria-autocomplete="both"
        />
        <ul class="error">
          <li v-for="err in $v.password.$errors">
            {{ err.$message }}
          </li>
        </ul>
      </div>
      <div class="w-full">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-confirm-password"
        >
          Confirm Password
        </label>
        <input
          v-model="formData.confirmPassword"
          class="input"
          id="grid-confirm-password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="******"
          autocomplete="new-password"
          aria-autocomplete="both"
        />
        <ul class="error">
          <li v-for="err in $v.confirmPassword.$errors">
            {{ err.$message }}
          </li>
        </ul>
      </div>
      <div class="w-full flex flex-row-reverse justify-end gap-2">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-first-name"
        >
          Show Password
        </label>
        <input
          v-model="showPassword"
          id="grid-password-show"
          type="checkbox"
          class="rounded-full"
        />
      </div>
      <div class="py-2">
        <button
          :disabled="isLoading||redirecting"
          :class="[{ 'opacity-50 cursor-not-allowed': isLoading }]"
          type="submit"
          class="w-full block text-center text-white bg-primary-500 hover:bg-bg-primary-700 px-2 py-1.5 rounded-md"
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
            Reset Password
          </span>
        </button>
      </div>
      <p class="py-2">
        Back to
        <router-link
          :to="{ name: 'login' }"
          class="text-blue-500 hover:text-primary-700"
          >Back to Login</router-link
        >
        or
        <router-link
          :to="{ name: 'forgotPassword' }"
          class="text-blue-500 hover:text-primary-700"
          >Get reset link</router-link
        >
      </p>
    </form>
  </div>
</template>

<style scoped>
/* code */
.input {
  @apply appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500;
}
.error {
  @apply text-red-500 text-xs italic;
}
</style>
