<template>
  <!-- 密码登陆 -->
  <div v-if="type == 'pwd'" class="item-container login-pwd">
    <div class="input-container">
      <t-input v-model="userInfo.EngName" style="width: 400px" size="large" placeholder="请输入您的邮箱/手机号">
        <template #prefix-icon>
          <t-icon name="user" />
        </template>
      </t-input>
      <t-popup placement="right" trigger="focus" show-arrow>
        <t-input
          v-model="psw"
          style="width: 400px"
          size="large"
          :type="showPsw ? 'text' : 'password'"
          clearablec
          placeholder="请输入密码"
          @keyup="checkPsw"
        >
          <template #prefix-icon>
            <t-icon name="lock-on" />
          </template>
          <template #suffix-icon>
            <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />
          </template>
        </t-input>
        <template #content>
          <div>
            <div :class="['rex-check', { 'format-correct': check1 }]">
              <t-icon name="check-circle-filled" size="large" />
              <span>1-20个英文字符</span>
            </div>
            <div :class="['rex-check', { 'format-correct': check2 }]">
              <t-icon name="check-circle-filled" size="large" />
              <span>需包含下划线</span>
            </div>
          </div>
        </template>
      </t-popup>
      <div class="check-container">
        <t-checkbox>记住账号</t-checkbox>
        <span class="tip">忘记账号？</span>
      </div>
      <t-button class="button-container" style="width: 400px" size="large" @click="handleClickToLogIn"> 登录 </t-button>
    </div>
    <div class="bottom-container">
      <span class="tip" @click="switchType('qrcode')">使用微信扫码登录</span>
      <i>|</i>
      <span class="tip" @click="switchType('phone')">使用短信登录</span>
    </div>
  </div>

  <!-- 扫码登陆 -->
  <div v-else-if="type == 'qrcode'" class="item-container login-qrcode">
    <div class="input-container">
      <div class="tip-container">
        <span class="tip1">请使用微信扫一扫登录</span>
        <span class="tip2 refresh">刷新 <t-icon name="refresh" color="#0052D9" /> </span>
      </div>
      <qrcode-vue value="" :size="192" level="H" />
    </div>
    <div class="bottom-container">
      <span class="tip" @click="switchType('pwd')">使用账号密码登录</span>
      <i>|</i>
      <span class="tip" @click="switchType('phone')">使用短信登录</span>
    </div>
  </div>

  <!-- 手机号登陆 -->
  <div v-else class="item-container login-phone">
    <div class="input-container">
      <t-input v-model="userInfo.EngName" style="width: 400px" size="large" placeholder="请输入您的手机号">
        <template #prefix-icon>
          <t-icon name="user" />
        </template>
      </t-input>
      <div class="verification-code">
        <t-input style="width: 282px" size="large" placeholder="请输入验证码" />
        <t-button variant="outline" :disabled="countDown > 0" @click="handleCounter">
          {{ countDown == 0 ? '发送验证码' : `${countDown}秒后可重发` }}
        </t-button>
      </div>
      <t-button class="button-container" style="width: 400px" size="large" @click="handleClickToLogIn"> 登录 </t-button>
    </div>
    <div class="bottom-container">
      <span class="tip" @click="switchType('pwd')">使用账号密码登录</span>
      <i>|</i>
      <span class="tip" @click="switchType('qrcode')">使用微信扫码登录</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import QrcodeVue from 'qrcode.vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { useCounter } from '@/utils/hooks';

const INITIAL_DATA = {
  EngName: '',
};

export default defineComponent({
  components: { QrcodeVue },
  setup() {
    const type = ref('pwd');
    const psw = ref('');
    const check1 = ref(false);
    const check2 = ref(false);

    const userInfo = ref({ ...INITIAL_DATA });
    const showPsw = ref(false);

    const [countDown, handleCounter] = useCounter();

    const checkPsw = () => {
      const regExp = /^[a-z0-9_]{1,20}$/;
      if (regExp.test(psw.value)) {
        check1.value = true;
      } else {
        check1.value = false;
      }
      if (psw.value.indexOf('_') !== -1) {
        check2.value = true;
      } else {
        check2.value = false;
      }
    };

    const switchType = (val: string) => {
      type.value = val;
    };

    const router = useRouter();
    const store = useStore();

    const handleClickToLogIn = () => {
      store.commit('user/SET_USER_INFO', userInfo.value);

      MessagePlugin.success('登录成功');

      router.push({
        path: '/',
      });
    };

    return {
      showPsw,
      psw,
      userInfo,
      checkPsw,
      check1,
      check2,
      type,
      switchType,
      countDown,
      handleCounter,
      handleClickToLogIn,
    };
  },
});
</script>
