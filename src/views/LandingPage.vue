<template>
  <main>
    <section
      class="grid relative items-center pt-14 pb-28 overflow-hidden mx-auto bg-banner-1"
    >
      <div class="h-full absolute bg-banner-1 w-1/2 left-0"></div>
      <div class="flex flex-row-reverse gap-4 z-20 w-full px-6">
        <div class="w-2/4 flex flex-col gap-4  justify-center bg-white p-4">
          <div>
            <span class="w-5 h-1 bg-blue-600 rounded-md"></span>
          </div>
          <h1 class="font-poppins mr-5 font-bold text-6xl">
            Welcome to auriginAfrica

            <br />
          </h1>
          <p class="text-lg">
            The best place to get all your agricultural needs,
            <br />
            from seeds to fertilizers, we got you covered. vegetables, fruits,
            and more. Learn from our academy and get the best of our services.
            Connect with other farmers and get the best of our services.
          </p>
          <div class="border flex rounded-lg p-2">
            <input
              type="text"
              placeholder="Email us...."
              class="flex-1 border-none outline-none focus:outline-none focus:ring-0"
            />
            <button class="bg-blue-600 text-white rounded-md px-4 py-2 w-fit">
              Get Started
            </button>
          </div>
          <div class="flex items-center">
            <div
              v-for="i of [
                {
                  icon: 'fab fa-facebook',
                  link: 'https://www.facebook.com/',
                  title: 'Facebook',
                },
                {
                  icon: 'fab fa-twitter',
                  link: 'https://twitter.com/',
                  title: 'Twitter',
                },
                {
                  icon: 'fab fa-instagram',
                  link: 'https://www.instagram.com/',
                  title: 'Instagram',
                },
                {
                  icon: 'fab fa-linkedin',
                  link: 'https://www.linkedin.com/',
                  title: 'Linkedin',
                },
              ]"
              class="flex gap-4 items-center border p-2"
            >
              <a :href="i.link" class="">
                <fa
                  :icon="i.icon"
                  size="30"
                  class="text-5xl text-gray-600"
                ></fa>
              </a>
              <h1>
                {{ i.title }}
              </h1>
            </div>
          </div>
        </div>
        <div class="w-1/4"></div>
        <div class="w-3/6 flex items-center justify-center">
          <img src="https://freesvg.org/img/welsummer_cockerel.png" alt="" />
        </div>
      </div>
    </section>
  </main>
</template>
<style scoped>
.bg-banner-1 {
  background-image: repeating-linear-gradient(
      90deg,
      hsla(196, 0%, 79%, 0.06) 0px,
      hsla(196, 0%, 79%, 0.06) 1px,
      transparent 1px,
      transparent 96px
    ),
    repeating-linear-gradient(
      0deg,
      hsla(196, 0%, 79%, 0.06) 0px,
      hsla(196, 0%, 79%, 0.06) 1px,
      transparent 1px,
      transparent 96px
    ),
    repeating-linear-gradient(
      0deg,
      rgba(141, 141, 141, 0.09) 0px,
      rgba(141, 141, 141, 0.09) 1px,
      transparent 1px,
      transparent 12px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(141, 141, 141, 0.09) 0px,
      rgba(141, 141, 141, 0.09) 1px,
      transparent 1px,
      transparent 12px
    ),
    linear-gradient(90deg, rgb(235 250 255), rgb(252 255 242));
}
</style>
