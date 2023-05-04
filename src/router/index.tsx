import { createRouter, createWebHistory } from 'vue-router';
import chatRouter from './chat.routes';
import baseRouter from './base.routes';

const router = createRouter({
	history: createWebHistory(),
	routes: [baseRouter, chatRouter],
});

export default router;
