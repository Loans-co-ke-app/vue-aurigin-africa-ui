import type { RouteRecordRaw } from 'vue-router';

const chatRouter: RouteRecordRaw = {
	path: '/chat',
	name: 'chat',
	component: () => import('@/layouts/ChatLayout.vue'),
	children: [
		{
			path: '',
			name: 'no-chat',
			component: () => import('@/components/chats/EmptyChat.vue'),
		},
		{
			path: ':id',
			name: 'single-chat',
			component: () => import('@/components/chats/Chat.vue'),
		},
	],
};

export default chatRouter;
