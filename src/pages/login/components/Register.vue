<template>
  <t-form
    ref="form"
    :class="['item-container', `register-${type}`]"
    :data="formData"
    :rules="FORM_RULES"
    label-width="0"
    @submit="onSubmit"
  >
    <template v-if="type == 'phone'">
      <t-form-item name="phone">
        <t-input
          v-model="formData.phone"
          :maxlength="11"
          style="width: 400px"
          size="large"
          placeholder="请输入您的手机号"
        >
          <template #prefix-icon>
            <t-icon name="user" />
          </template>
        </t-input>
      </t-form-item>
    </template>

    <template v-if="type == 'email'">
      <t-form-item name="email">
        <t-select
          v-model="formData.email"
          placeholder="请输入您的邮箱"
          filterable
          size="large"
          :empty="''"
          :options="emailOptions"
          :on-search="remoteMethod"
        >
          <template #t-input>
            <t-icon name="lock-on" />
          </template>
        </t-select>
      </t-form-item>
    </template>

    <t-form-item name="password">
      <t-input
        v-model="formData.password"
        size="large"
        :type="showPsw ? 'text' : 'password'"
        clearable
        placeholder="请输入登录密码"
      >
        <template #prefix-icon>
          <t-icon name="lock-on" />
        </template>
        <template #suffix-icon>
          <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />
        </template>
      </t-input>
    </t-form-item>

    <template v-if="type == 'phone'">
      <t-form-item class="verification-code" name="verifyCode">
        <t-input v-model="formData.verifyCode" size="large" placeholder="请输入验证码" />
        <t-button variant="outline" :disabled="countDown > 0" @click="handleCounter">
          {{ countDown == 0 ? '发送验证码' : `${countDown}秒后可重发` }}
        </t-button>
      </t-form-item>
    </template>

    <t-form-item class="check-container" name="checked">
      <t-checkbox v-model="formData.checked">我已阅读并同意 </t-checkbox> <span>TDesign服务协议</span> 和
      <span>TDesign 隐私声明</span>
    </t-form-item>

    <t-form-item>
      <t-button block size="large" type="submit"> 注册 </t-button>
    </t-form-item>

    <div class="switch-container">
      <span class="tip" @click="switchType(type == 'phone' ? 'email' : 'phone')">{{
        type == 'phone' ? '使用邮箱注册' : '使用手机号注册'
      }}</span>
    </div>
  </t-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { useCounter } from '@/utils/hooks';
import { passwordValidator, getEmails } from '../helper';

const INITIAL_DATA = {
  phone: '',
  email: '',
  password: '',
  verifyCode: '',
  checked: false,
};

const FORM_RULES = {
  phone: [{ required: true, message: '手机号必填', type: 'error' }],
  email: [{ required: true, email: true, message: '邮箱必填', type: 'error' }],
  password: [{ required: true, message: '密码必填', type: 'error' }, { validator: passwordValidator }],
  verifyCode: [{ required: true, message: '验证码必填', type: 'error' }],
};

export default defineComponent({
  setup(props, ctx) {
    const type = ref('phone');
    const emailOptions = ref([]);
    const remoteMethod = (search: string) => {
      if (search && search.indexOf('@') === -1) {
        emailOptions.value = getEmails(search);
      }
    };

    const form = ref();
    const formData = ref({ ...INITIAL_DATA });

    const showPsw = ref(false);

    const [countDown, handleCounter] = useCounter();

    const onSubmit = ({ validateResult }) => {
      if (validateResult === true) {
        if (!formData.value.checked) {
          MessagePlugin.error('请同意TDesign服务协议和TDesign 隐私声明');
          return;
        }
        MessagePlugin.success('注册成功');
        const { emit } = ctx;
        emit('registerSuccess');
      }
    };

    const switchType = (val) => {
      form.value.reset();
      type.value = val;
    };

    return {
      FORM_RULES,
      formData,
      showPsw,
      form,
      type,
      emailOptions,
      remoteMethod,
      countDown,
      handleCounter,
      onSubmit,
      switchType,
    };
  },
});
</script>
