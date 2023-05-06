<script setup lang="ts">
import { publicAuriginAfricaRequest } from "@/api/requests";
import { SignUpFormPropType } from "@/types";
import { useVuelidate } from "@vuelidate/core";
import { useToast } from "vue-toast-notification";
import { required, minLength, helpers, maxLength } from "@vuelidate/validators";
import { AuriginAfricaValidator } from "@/validators/AuriginAfricaValidator";
import { AxiosError } from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { countries } from "@/data/countries";

const availableCountries = ref(countries);
const router = useRouter();
const toast = useToast();
const isLoading = ref<boolean>(false);
type SignUpStep = "personal" | "account";
const step1Rules = {
  first_name: {
    required: helpers.withMessage("First name is required", required),
  },
  last_name: {
    required: helpers.withMessage("Last name is required", required),
  },
  username: {
    required: helpers.withMessage("Username is required", required),
    minLength: helpers.withMessage(
      "Username must be at least 3 characters",
      minLength(3)
    ),
  },
  email: {
    // required: helpers.withMessage("Email is required", required),
    email: helpers.withMessage("Email is invalid", required),
  },
  password: {
    required: helpers.withMessage("Password is required", required),
    minLength: helpers.withMessage(
      "Password must be at least 8 characters",
      minLength(8)
    ),
    // lowercase: helpers.withMessage(
    //   "Password must contain at least one lowercase letter",
    //   AuriginAfricaValidator.passwordLowercase
    // ),
    // uppercase: helpers.withMessage(
    //   "Password must contain at least one uppercase letter",
    //   AuriginAfricaValidator.passwordUppercase
    // ),
    // number: helpers.withMessage(
    //   "Password must contain at least one number",
    //   AuriginAfricaValidator.passwordNumbers
    // ),
    // special: helpers.withMessage(
    //   "Password must contain at least one special character (e.g. !@#$%^&*)",
    //   AuriginAfricaValidator.passwordSpecialCharacters
    // ),
  },
};

const signUpStep = ref<SignUpStep>("personal");

const formData = ref<SignUpFormPropType>({
  username: "",
  password: "",
  email: "",
  last_name: "",
  first_name: "",
});

const showPassword = ref<boolean>(false);
const $s1 = useVuelidate(step1Rules, formData.value);

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  if ($s1.value.$invalid) {
    $s1.value.$validate();
    toast.error("Please fill in all the fields", {
      position: "top-right",
      duration: 5000,
      pauseOnHover: true,
      type: "error",
    });
  } else {
    try {
      isLoading.value = true;
      await publicAuriginAfricaRequest.post("/auth/register", formData.value);

      toast.success("Account created successfully", {
        position: "top-right",
        duration: 10000,
        pauseOnHover: true,
        type: "success",
      });
      setTimeout(async () => {
        await router.push({ name: "login" });
      }, 2000);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        const { errors } = error.response!.data as any;
        let msg = "";
        if (Array.isArray(errors)) {
          errors.forEach((err: any) => {
            msg += err !== "" ? err + " " : "";
          });
        }
        toast.error(msg, {
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
  <main
    style="
      background-image: url('https://images.unsplash.com/photo-1624523979864-60c8f816be3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80');
    "
    class="min-h-screen bg-slate-900 bg-no-repeat bg-cover bg-center bg-blend-overlay flex flex-col justify-center items-center"
  >
    <!-- component -->
    <!-- Container -->
    <div
      class="flex flex-wrap min-h-screen w-full content-center justify-center py-10 px-4"
    >
      <!-- Register component -->
      <div class="flex shadow-md bg-white rounded w-full md:max-w-xl">
        <!-- Register form -->
        <div
          class="flex w-full flex-wrap content-center justify-center rounded-l-md bg-white bg-opacity-80 p-4 rounded"
        >
          <div class="p-4 w-full">
            <!-- Heading -->
            <div class="p-4 text-center">
              <h1 class="text-xl font-semibold">Create new account</h1>
              <small class="text-gray-700">
                Enter your details to create your account
              </small>
            </div>

            <!-- Form -->
            <form @submit="handleSubmit" class="mt-4">
              <!-- Part 1 -->
              <div class="w-full">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  First Name
                </label>
                <input
                  v-model="formData.first_name"
                  class="input"
                  id="grid-first-name"
                  type="text"
                  placeholder="First name"
                  autocomplete="given-name"
                  aria-autocomplete="both"
                />
                <p class="error">
                  <span v-for="err in $s1.first_name.$errors">{{
                    err.$message
                  }}</span>
                </p>
              </div>
              <div class="w-full">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Last Name
                </label>
                <input
                  v-model="formData.last_name"
                  class="input"
                  id="grid-last-name"
                  type="text"
                  placeholder="Last name"
                  autocomplete="family-name"
                  aria-autocomplete="list"
                />
                <ul class="error">
                  <li v-for="err in $s1.last_name.$errors">
                    {{ err.$message }}
                  </li>
                </ul>
              </div>
              <div class="w-full">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Username
                </label>
                <input
                  v-model="formData.username"
                  class="input"
                  id="grid-username"
                  type="text"
                  placeholder="Username"
                  autocomplete="username"
                  aria-autocomplete="both"
                />
                <ul class="error">
                  <li v-for="err in $s1.username.$errors">
                    {{ err.$message }}
                  </li>
                </ul>
              </div>
              <div class="w-full">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Email
                </label>
                <input
                  v-model="formData.email"
                  class="input"
                  id="grid-email"
                  type="text"
                  placeholder="example@gmail.com"
                  autocomplete="email"
                />
                <ul class="error">
                  <li v-for="err in $s1.email.$errors">
                    {{ err.$message }}
                  </li>
                </ul>
              </div>

              <div class="w-full">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Password
                </label>
                <input
                  v-model="formData.password"
                  class="input"
                  id="grid-password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="********"
                  autocomplete="new-password"
                  aria-autocomplete="list"
                />
                <ul class="error">
                  <li v-for="err in $s1.password.$errors">
                    {{ err.$message }}
                  </li>
                </ul>
              </div>
              <div
                class="w-full flex flex-row-reverse items-center justify-end gap-2"
              >
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
                />
              </div>

              <div class="my-3 flex items-center gap-2">
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
                    Create Account
                  </span>
                </button>
                <!-- <button
                  class="flex flex-wrap justify-center w-full border border-gray-300 hover:border-gray-500 px-2 py-1.5 rounded-md"
                >
                  <img
                    class="w-5 mr-2"
                    src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                  />
                  Sign in with Google
                </button> -->
              </div>
            </form>

            <!-- Footer -->
            <div class="text-center">
              <span class="text-xs text-gray-700 font-semibold"
                >Already have account?</span
              >
              <router-link
                :to="{ name: 'login' }"
                class="text-xs ml-1 font-semibold text-primary-700"
                >Sign in</router-link
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Credit -->
      <!-- <div class="mt-3 w-full">
        <p class="text-center">
          Made by
          <a
            target="_blank"
            href="https://github.com/forinda"
            class="text-primary-700"
            >Felix Orinda @{{ new Date().getFullYear() }}</a
          >
        </p>
      </div> -->
    </div>
  </main>
</template>

<style scoped>
/* code */
.input {
  @apply appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500;
}

.textarea {
  @apply appearance-none h-32 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500;
}

.select {
  @apply block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500;
}

.error {
  @apply text-red-500 text-xs italic;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: inherit !important;
  margin: initial !important;
}

.phone {
  @apply appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 relative;
}

.phone::before {
  content: "+254";
  @apply absolute text-gray-500 text-sm font-semibold;
}
</style>
