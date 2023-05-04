<script setup lang="ts">
import Sidebar from '@/components/chats/ChatSidebar.vue';
</script>
<template>
	<div>
		<div class="flex bg-neutral-800 text-neutral-100">
			<div class="w-60">
				<sidebar></sidebar>
			</div>
			<div class="left-60 p-4 w-full">
				<router-view />
			</div>
		</div>
	</div>
</template>
