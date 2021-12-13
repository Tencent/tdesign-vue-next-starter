import { createStore } from 'vuex';
import user from './modules/user';
import notification from './modules/notification';
import setting from './modules/setting';
import permission from './modules/permission';

export const store = createStore({
  modules: {
    user,
    setting,
    notification,
    permission,
  },
});

export default store;
