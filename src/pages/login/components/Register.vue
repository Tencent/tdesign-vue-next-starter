<template>
  <div v-if="type == 'phone'" class="item-container register-phone">
    <div class="input-container">
      <t-select
        v-model="userInfo.EngName"
        placeholder="请输入您的邮箱"
        filterable
        style="width: 400px"
        size="large"
        :empty="''"
        :options="emailOptions"
        :on-search="remoteMethod"
      >
        <template #t-input>
          <t-icon name="lock-on" />
        </template>
      </t-select>
      <t-popup placement="right" trigger="focus" show-arrow>
        <t-input
          v-model="psw"
          style="width: 400px"
          size="large"
          :type="showPsw ? 'text' : 'password'"
          clearablec
          placeholder="请输入登录密码"
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
        <t-checkbox>我已阅读并同意 </t-checkbox><span>TDesign服务协议</span> 和 <span>TDesign 隐私声明</span>
      </div>
      <t-button class="button-container" style="width: 400px" size="large" @click="handleRegister"> 注册 </t-button>
    </div>
    <div class="bottom-container">
      <span class="tip" @click="type = 'eamil'">使用手机号注册</span>
    </div>
  </div>

  <div v-else class="item-container register-email">
    <div class="input-container">
      <t-input v-model="userInfo.EngName" style="width: 400px" size="large" placeholder="请输入您的手机号">
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
          placeholder="请输入登录密码"
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
      <div class="verification-code">
        <t-input style="width: 282px" size="large" placeholder="请输入验证码" />
        <t-button variant="outline" :disabled="countDown > 0" @click="handleCounter">
          {{ countDown == 0 ? '发送验证码' : `${countDown}秒后可重发` }}
        </t-button>
      </div>
      <div class="check-container">
        <t-checkbox>我已阅读并同意 </t-checkbox> <span>TDesign服务协议</span> 和 <span>TDesign 隐私声明</span>
      </div>
      <t-button class="button-container" style="width: 400px" size="large" @click="handleRegister"> 注册 </t-button>
    </div>
    <div class="bottom-container">
      <span class="tip" @click="type = 'phone'">使用邮箱注册</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useCounter } from '@/utils/hooks';

const getEmails = (search: string) => [
  {
    value: `${search}@qq.com`,
    label: `${search}@qq.com`,
  },
  {
    value: `${search}@gmail.com`,
    label: `${search}@gmail.com`,
  },
  {
    value: `${search}@126.com`,
    label: `${search}@126.com`,
  },
  {
    value: `${search}@163.com`,
    label: `${search}@163.com`,
  },
  {
    value: `${search}@hotmail.com`,
    label: `${search}@hotmail.com`,
  },
  {
    value: `${search}@21cn.com`,
    label: `${search}@21cn.com`,
  },
  {
    value: `${search}@yahoo.com`,
    label: `${search}@yahoo.com`,
  },
];

const INITIAL_DATA = {
  EngName: '',
};

export default defineComponent({
  setup(props, ctx) {
    const type = ref('default');
    const emailOptions = ref([]);
    const remoteMethod = (search: string) => {
      if (search && search.indexOf('@') === -1) {
        emailOptions.value = getEmails(search);
      }
    };

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

    const handleRegister = () => {
      const { emit } = ctx;
      emit('registerSuccess');
    };

    return {
      showPsw,
      psw,
      userInfo,
      checkPsw,
      check1,
      check2,
      type,
      emailOptions,
      remoteMethod,
      countDown,
      handleCounter,
      handleRegister,
    };
  },
});
</script>
