<template>
  <div>
    <div class="form-step-container">
      <!-- 简单步骤条 -->
      <t-card :bordered="false">
        <t-steps class="step-container" :current="activeForm" status="process">
          <t-step-item title="提交开票申请" />
          <t-step-item title="填写发票信息" />
          <t-step-item title="确认邮寄地址" />
          <t-step-item title="完成" />
        </t-steps>
      </t-card>

      <!-- 分步表单1 -->
      <div v-show="activeForm === 0" class="rule-tips">
        <t-alert theme="info" title="发票开具规则：" :close="true">
          <template #message>
            <p>
              1、申请开票后，电子发票在1～3个工作日内开具；增值税专用发票（纸质）如资质审核通过，将在电子发票开具后10个工作日内为您寄出；
            </p>
            <p>2、开票金额为您实际支付金额；</p>
            <p>3、如有疑问请直接联系：13300001111。</p>
          </template>
        </t-alert>
      </div>
      <t-form
        v-show="activeForm === 0"
        class="step-form"
        :data="formData1"
        :rules="FORM_RULES"
        label-align="right"
        @submit="(result) => onSubmit(result, 1)"
      >
        <t-form-item label="合同名称" name="name">
          <t-select v-model="formData1.name" :style="{ width: '480px' }" class="demo-select-base" clearable>
            <t-option v-for="(item, index) in NAME_OPTIONS" :key="index" :value="item.value" :label="item.label">
              {{ item.label }}
            </t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="发票类型" name="type">
          <t-select v-model="formData1.type" :style="{ width: '480px' }" class="demo-select-base" clearable>
            <t-option v-for="(item, index) in TYPE_OPTIONS" :key="index" :value="item.value" :label="item.label">
              {{ item.label }}
            </t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="开票金额"> {{ amount }} 元 </t-form-item>
        <t-form-item>
          <t-button theme="primary" type="submit"> 提交申请 </t-button>
        </t-form-item>
      </t-form>

      <!-- 分步表单2 -->
      <t-form
        v-show="activeForm === 1"
        class="step-form"
        :data="formData2"
        :rules="FORM_RULES"
        label-align="left"
        @reset="onReset(0)"
        @submit="(result) => onSubmit(result, 2)"
      >
        <t-form-item label="发票抬头" name="title">
          <t-input v-model="formData2.title" :style="{ width: '480px' }" placeholder="请输入发票抬头" />
        </t-form-item>
        <t-form-item label="纳税人识别号" name="taxNum">
          <t-input v-model="formData2.taxNum" :style="{ width: '480px' }" placeholder="请输入纳税人识别号" />
        </t-form-item>
        <t-form-item label="单位地址" name="address">
          <t-input v-model="formData2.address" :style="{ width: '480px' }" placeholder="请输入单位地址" />
        </t-form-item>
        <t-form-item label="开户行" name="bank">
          <t-input v-model="formData2.bank" :style="{ width: '480px' }" placeholder="请输入开户行" />
        </t-form-item>
        <t-form-item label="银行账号" name="bankAccount">
          <t-input v-model="formData2.bankAccount" :style="{ width: '480px' }" placeholder="请输入银行账号" />
        </t-form-item>
        <t-form-item label="通知邮箱" name="email">
          <t-input v-model="formData2.email" :style="{ width: '480px' }" placeholder="请输入通知邮箱" />
        </t-form-item>
        <t-form-item label="通知手机" name="tel">
          <t-input v-model="formData2.tel" :style="{ width: '480px' }" placeholder="请输入通知手机" />
        </t-form-item>
        <t-form-item>
          <t-button type="reset" theme="default" variant="base"> 上一步 </t-button>
          <t-button theme="primary" type="submit"> 下一步 </t-button>
        </t-form-item>
      </t-form>

      <!-- 分步表单3 -->
      <t-form
        v-show="activeForm === 2"
        class="step-form"
        :data="formData3"
        :rules="FORM_RULES"
        label-align="left"
        @reset="onReset(1)"
        @submit="(result) => onSubmit(result, 6)"
      >
        <t-form-item label="收货人" name="consignee">
          <t-input v-model="formData3.consignee" :style="{ width: '480px' }" placeholder="请输入收货人" />
        </t-form-item>
        <t-form-item label="手机号码" name="mobileNum">
          <t-input v-model="formData3.mobileNum" :style="{ width: '480px' }" placeholder="请输入手机号码" />
        </t-form-item>
        <t-form-item label="收货地址" name="deliveryAddress">
          <t-select
            v-model="formData3.deliveryAddress"
            :style="{ width: '480px' }"
            placeholder="请选择收货地址"
            class="demo-select-base"
            clearable
          >
            <t-option v-for="(item, index) in ADDRESS_OPTIONS" :key="index" :value="item.value" :label="item.label">
              {{ item.label }}
            </t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="详细地址" name="fullAddress">
          <t-textarea v-model="formData3.fullAddress" :style="{ width: '480px' }" placeholder="请输入详细地址" />
        </t-form-item>
        <t-form-item>
          <t-button type="reset" theme="default" variant="base"> 上一步 </t-button>
          <t-button theme="primary" type="submit"> 下一步 </t-button>
        </t-form-item>
      </t-form>

      <!-- 分步表单4 -->
      <div v-show="activeForm === 6" class="step-form-4">
        <t-icon name="check-circle-filled" style="color: green" size="52px" />
        <p class="text">完成开票申请</p>
        <p class="tips">预计1～3个工作日会将电子发票发至邮箱，发票邮寄请耐心等待</p>
        <div class="button-group">
          <t-button theme="primary" @click="onReset(0)"> 再次申请 </t-button>
          <t-button variant="base" theme="default" @click="complete"> 查看进度 </t-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'FormStep',
};
</script>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ValidateResultContext } from 'tdesign-vue-next';

import {
  FORM_RULES,
  NAME_OPTIONS,
  TYPE_OPTIONS,
  ADDRESS_OPTIONS,
  INITIAL_DATA1,
  INITIAL_DATA2,
  INITIAL_DATA3,
} from './constants';

const formData1 = ref({ ...INITIAL_DATA1 });
const formData2 = ref({ ...INITIAL_DATA2 });
const formData3 = ref({ ...INITIAL_DATA3 });
const activeForm = ref(0);

const amount = computed(() => {
  if (formData1.value.name === '1') {
    return '565421';
  }
  if (formData1.value.name === '2') {
    return '278821';
  }
  if (formData1.value.name === '3') {
    return '109824';
  }
  return '--';
});

const onSubmit = (result: ValidateResultContext<FormData>, val: number) => {
  if (result.validateResult === true) {
    activeForm.value = val;
  }
};
const onReset = (val: number) => {
  activeForm.value = val;
};
const complete = () => {
  const router = useRouter();
  router.replace({ path: '/detail/advanced' });
};
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
