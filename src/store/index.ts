import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import user from './modules/user';
import notification from './modules/notification';
import setting from './modules/setting';

export const store = createStore({
  modules: {
    user,
    setting,
    notification,
  },
});

export default store;
