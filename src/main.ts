import { createApp } from 'vue';

import TDesign from 'tdesign-vue-next/esm';

import { store } from './store';
import router from './router';
import '@/style/index.less';
import './permission';
import App from './App.vue';

const app = createApp(App);

app.use(TDesign);
app.use(store);
app.use(router);

app.mount('#app');
