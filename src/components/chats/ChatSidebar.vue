<template>
  <div class="min-h-screen flex flex-col gap-4 p-4 border-r">
    <div class="w-full border-neutral-400">
      <div class="flex flex-col gap-2 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-12 h-12 rounded-full p-4 mx-auto border-4 shadow shadow-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>
        <div class="flex flex-col gap-4 justify-center items-center">
          <span class="rounded-full border px-2"> Anonymous user</span>
          <div>
            <router-link
              :to="{ name: 'index' }"
              class="hover:underline text-blue-500"
              >Go back home</router-link
            >
          </div>
        </div>
      </div>
      <div>
        <router-link
          class="flex justify-center items-center w-12 h-12 rounded-full bg-neutral-500 text-white absolute bottom-4 right-4 border border-white shadow shadow-whitehover:bg-blue-500 group hover:w-fit hover:px-4 hover:py-2 hover:shadow-none hover:border-none whitespace-nowrap hover:space-x-2"
          :to="{ name: 'single-chat', params: { id: 'wss' } }"
        >
          <span class="hidden group-hover:inline-block"> New chat </span>

          <fa icon="fa-plus"></fa
        ></router-link>
      </div>
    </div>
  </div>
</template>
