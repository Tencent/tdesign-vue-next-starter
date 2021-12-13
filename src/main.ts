import { createApp } from 'vue';
import TDesign from 'tdesign-vue-next';
import VueClipboard from 'vue3-clipboard';

import App from './App.vue';
import { store } from './store';
import router from './router';

import '@/style/index.less';
import './permission';

const app = createApp(App);

app.use(TDesign);
app.use(store);
app.use(router);
app.use(VueClipboard);

app.mount('#app');
