/* eslint-disable simple-import-sort/imports */
import TDesign from 'tdesign-vue-next';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import { store } from './store';

import 'tdesign-vue-next/es/style/index.css';
import '@/style/index.less';
import './permission';
<<<<<<< HEAD
=======
import App from './App.vue';
>>>>>>> b721865 (feat: remove variables)

import 'tdesign-theme-generator';

const app = createApp(App);

app.use(TDesign);
app.use(store);
app.use(router);

app.mount('#app');
