import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import user from './modules/user';
import notification from './modules/notification';
import setting from './modules/setting';
export interface State {
  count: number
}

export const key: InjectionKey<Store<State>> = Symbol();
    user,
    notification,
  },
});

export default store;
