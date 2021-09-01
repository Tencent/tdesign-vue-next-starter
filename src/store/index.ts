import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import user from './modules/user';
import notification from './modules/notification';
import setting from './modules/setting';
export interface State {
  count: number
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  modules: {
    user,
    setting,
    notification,
  },
});

export default store;
