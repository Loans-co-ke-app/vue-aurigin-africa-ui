<template>
  <main class="min-h-full flex justify-center items-center flex-col w-full">
      <div class="flex flex-col items-center justify-center text-center w-full gap-4">
        <h1 class="text-5xl font-bold">! No chat selected</h1>
        <p>
          <router-link
            :to="{ name: 'index' }"
            class="hover:underline text-blue-500"
            >Go back home</router-link
          >
        </p>
        <p>
          <router-link
            class="flex justify-center items-center w-12 h-12 rounded-full bg-neutral-500 text-white absolute bottom-4 right-4 border border-white shadow shadow-whitehover:bg-blue-500 group hover:w-fit hover:px-4 hover:py-2 hover:shadow-none hover:border-none whitespace-nowrap hover:space-x-2"
            :to="{ name: 'single-chat', params: { id: 'wss' } }"
          >
            <span class="hidden group-hover:inline-block"> New chat </span>

            <fa icon="fa-plus"></fa
          ></router-link>
        </p>
    </div>
  </main>
</template>
