<template>
  <div class="login-wrapper">
    <login-header />

    <div class="login-container">
      <div class="title-container">
        <h1 class="title margin-no">登录到</h1>
        <h1 class="title">TDesign Starter</h1>
        <div class="sub-title">
          <p class="tip">{{ type == 'register' ? '已有账号?' : '没有账号吗?' }}</p>
          <p class="tip" @click="switchType(type == 'register' ? 'login' : 'register')">
            {{ type == 'register' ? '登录' : '注册新账号' }}
          </p>
        </div>
      </div>

      <login v-if="type === 'login'" />
      <register v-else @register-success="switchType('login')" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';

import Login from './components/Login.vue';
import Register from './components/Register.vue';
import LoginHeader from './components/Header.vue';

/** 高级详情 */
export default defineComponent({
  name: 'LoginIndex',
  components: {
    Login,
    Register,
    LoginHeader,
  },
  setup() {
    const type = ref('login');
    const store = useStore();
    const switchType = (val: string) => {
      type.value = val;
    };

    const mode = computed(() => {
      return store.state.setting.mode;
    });

    return {
      type,
      switchType,
      mode,
    };
  },
});
</script>
<style lang="less">
@import url('./index.less');
</style>
