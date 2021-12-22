import { createApp } from 'vue';

import TDesign from '@tencent/ivring-peng-vue-next';
import '@tencent/ivring-peng-vue-next/es/style/index.css';
import VueClipboard from 'vue3-clipboard';
import { store } from './store';
import router from './router';
import '@/style/index.less';
import './permission';

import App from './App.vue';

const app = createApp(App);

app.use(TDesign);
app.use(store);
app.use(router);
app.use(VueClipboard);

app.mount('#app');
