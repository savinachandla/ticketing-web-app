import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia'; 

// Vuetify
import vuetify from './plugins/vuetify'

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(vuetify)
app.mount('#app');

