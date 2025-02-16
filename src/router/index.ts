import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import PageNotFound from '@/views/PageNotFound.vue';
import AdminView from '@/views/AdminView.vue';
import CartView from '@/views/CartView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/admin', name: 'Admin', component: AdminView},
  { path: '/cart', name: 'Cart', component: CartView },
  { path: "/:catchAll(.*)", name: 'PageNotFound', component: PageNotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
