<script setup lang="ts">
// import { ref } from 'vue';
// const logoUrl = ref('https://i.pinimg.com/originals/08/78/1e/08781edde0cb5fdcd82039ce661a5604.jpg');
</script>

<template>
	<div
		class="min-h-screen bg-cover bg-center bg-no-repeat bg-gray-800 bg-blend-multiply"
	>
		<main class="py-16 px-8">
			<div class="max-w-4xl mx-auto text-center text-neutral-100">
				<!-- <img :src="logoUrl" alt="Hero Image" class="h-64 mx-auto"> -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-40 h-40 rounded-full p-4 mx-auto border-4 shadow shadow-white"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
					/>
				</svg>

				<h1 class="text-4xl font-bold mt-8">Welcome aurigin Africa</h1>
				<p class="mt-4">
					Explore about bank information via our GPT model
				</p>
				<div class="mt-8">
					<router-link
						:to="{ name: 'no-chat' }"
						class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
					>
						Get started
					</router-link>
				</div>
			</div>
		</main>
	</div>
</template>
