<template>
  <t-dialog v-model:visible="formVisible" header="新建产品" :width="680" :footer="false">
    <template #body>
      <!-- 表单内容 -->
      <t-form ref="form" :data="formData" :rules="rules" :label-width="100" @submit="onSubmit">
        <t-form-item label="产品名称" name="name">
          <t-input v-model="formData.name" :style="{ width: '480px' }" placeholder="请输入产品名称" />
        </t-form-item>
        <t-form-item label="产品状态" name="status">
          <t-radio-group v-model="formData.status">
            <t-radio value="0">已停用</t-radio>
            <t-radio value="1">已启用</t-radio>
          </t-radio-group>
        </t-form-item>
        <t-form-item label="产品描述" name="description">
          <t-input v-model="formData.description" :style="{ width: '480px' }" placeholder="请输入产品描述" />
        </t-form-item>
        <t-form-item label="产品类型" name="type">
          <t-select v-model="formData.type" clearable :style="{ width: '480px' }">
            <t-option v-for="(item, index) in SELECT_OPTIONS" :key="index" :value="item.value" :label="item.label">
              {{ item.label }}
            </t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="备注" name="mark">
          <t-textarea v-model="textareaValue" :style="{ width: '480px' }" placeholder="请输入内容" name="description" />
        </t-form-item>
        <t-form-item style="float: right">
          <t-button variant="outline" @click="onClickCloseBtn">取消</t-button>
          <t-button theme="primary" type="submit">确定</t-button>
        </t-form-item>
      </t-form>
    </template>
  </t-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

const INITIAL_DATA = {
  name: '',
  status: '',
  description: '',
  type: '',
  mark: '',
  amount: 0,
};

const SELECT_OPTIONS = [
  { label: '网关', value: '1' },
  { label: '人工智能', value: '2' },
  { label: 'CVM', value: '3' },
];

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const formVisible = ref(false);
const formData = ref(props.data);
const textareaValue = ref('');

const onSubmit = ({ result, firstError }) => {
  if (!firstError) {
    MessagePlugin.success('提交成功');
    formVisible.value = false;
  } else {
    console.log('Errors: ', result);
    MessagePlugin.warning(firstError);
  }
};

const onClickCloseBtn = () => {
  formVisible.value = false;
  formData.value = { ...INITIAL_DATA };
};

const emit = defineEmits(['update:visible']);
watch(
  () => formVisible.value,
  (val) => {
    emit('update:visible', val);
  },
);

watch(
  () => props.visible,
  (val) => {
    formVisible.value = val;
  },
);

watch(
  () => props.data,
  (val) => {
    formData.value = val;
  },
);

const rules = {
  name: [{ required: true, message: '请输入产品名称', type: 'error' }],
};
</script>
