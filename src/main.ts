import { createApp } from 'vue';

import TDesign from 'tdesign-vue-next';
import 'tdesign-vue-next/es/style/index.css';
import { store } from './store';
import router from './router';
import '@/style/index.less';
import './permission';
import i18n from './locales';
import App from './App.vue';

const app = createApp(App);

app.use(TDesign);
app.use(store);
app.use(router);
app.use(i18n);

app.mount('#app');
