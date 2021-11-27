<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="title-container">
        <img class="icon" src="https://tdesign.gtimg.com/pro-template/logo%402x.png" />
        <div class="side-title">
          <p class="tip1">
            {{ type == 'register' ? '没有账号吗?' : '已有账号?' }}
          </p>
          <p class="tip2" @click="switchType(type == 'register' ? 'login' : 'register')">
            {{ type == 'register' ? '登录' : '注册新账号' }}
          </p>
        </div>
      </div>

      <login v-if="type === 'login'" />
      <register v-else @registerSuccess="switchType('login')" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

/** 高级详情 */
export default defineComponent({
  name: 'LoginIndex',
  components: {
    Login,
    Register,
  },
  setup() {
    const type = ref('login');

    const switchType = (val: string) => {
      type.value = val;
    };

    return {
      type,
      switchType,
    };
  },
});
</script>
<style lang="less">
@import url('./index.less');
</style>
