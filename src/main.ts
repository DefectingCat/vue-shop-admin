import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// element-plus
import 'element-plus/packages/theme-chalk/src/base.scss';
// international
import lang from 'element-plus/lib/locale/lang/zh-cn';
import 'dayjs/locale/zh-cn';
import locale from 'element-plus/lib/locale';
locale.use(lang);
// tsparticles
import Particles from 'particles.vue3';

// css
import 'normalize.css';
import '@/assets/css/base.scss';

createApp(App).use(Particles).use(store).use(router).mount('#app');
