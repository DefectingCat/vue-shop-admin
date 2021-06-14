import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// tsparticles
import Particles from 'particles.vue3';

import components from './element';

// css
import 'normalize.css';
import '@/assets/css/base.scss';

const app = createApp(App);

app.use(Particles).use(store).use(router).mount('#app');
components.forEach((component) => {
  app.use(component);
});
