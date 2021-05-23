import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// element-plus
import 'element-plus/packages/theme-chalk/src/base.scss';

// css
import 'normalize.css';
import '@/assets/css/base.scss';

createApp(App).use(store).use(router).mount('#app');
