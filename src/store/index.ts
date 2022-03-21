import { createPinia } from 'pinia';

const store = createPinia();

export { store };

export * from './modules/notification';
export * from './modules/permission';
export * from './modules/user';
export * from './modules/setting';

export default store;
