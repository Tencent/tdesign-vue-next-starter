<template>
  <div class="detail-advanced">
    <t-card title="基本信息">
      <div class="info-block">
        <div v-for="(item, index) in BASE_INFO_DATA" :key="index" class="info-item">
          <h1>{{ item.name }}</h1>
          <span
            :class="{
              ['inProgress']: item.type && item.type.value === 'inProgress',
              ['pdf']: item.type && item.type.value === 'pdf',
            }"
          >
            <i v-if="item.type && item.type.key === 'contractStatus'" />
            {{ item.value }}
          </span>
        </div>
      </div>
    </t-card>

    <!-- 发票进度 -->
    <t-card title="发票进度" class="container-base-margin-top">
      <t-row justify="space-between">
        <t-steps :current="updateCurrent">
          <t-step-item title="申请提交" content="已于12月21日提交" />
          <t-step-item title="电子发票" content="预计1～3个工作日" />
          <t-step-item title="发票已邮寄" content="电子发票开出后7个工作日联系" />
          <t-step-item title="完成" content />
        </t-steps>
      </t-row>
    </t-card>

    <!-- 产品目录 -->
    <t-card title="产品目录" class="container-base-margin-top">
      <template #option>
        <t-radio-group default-value="dateVal">
          <t-radio-button value="dateVal"> 季度 </t-radio-button>
          <t-radio-button value="monthVal"> 月份 </t-radio-button>
        </t-radio-group>
      </template>
      <t-row :gutter="16" class="product-block-container">
        <t-col :xl="4">
          <div class="product-add">
            <div class="product-sub">
              <t-icon name="add" class="product-sub-icon" />
              <span>新增产品</span>
            </div>
          </div>
        </t-col>
        <t-col v-for="(item, index) in PRODUCT_LIST" :key="index" :xl="4">
          <product :data="item" />
        </t-col>
      </t-row>
    </t-card>

    <!-- 产品采购明细 -->
    <t-card title="产品采购明细" class="container-base-margin-top">
      <t-table
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :hover="true"
        row-key="index"
        size="large"
        @sort-change="sortChange"
        @change="rehandleChange"
      >
        <template #pdName="{ row }">
          <span>
            {{ row.pdName }}
            <t-tag v-if="row.pdType" size="small">{{ row.pdType }}</t-tag>
          </span>
        </template>

        <template #purchaseNum="{ row }">
          <span>
            {{ row.purchaseNum }}
            <t-tag v-if="row.purchaseNum > 50" theme="danger" variant="light" size="small">超预算</t-tag>
          </span>
        </template>

        <template #op="slotProps">
          <a :class="prefix + '-link'" @click="listClick()">管理</a>
          <a :class="prefix + '-link'" @click="deleteClickOp(slotProps)">删除</a>
        </template>

        <template #op-column>
          <t-icon name="descending-order" />
        </template>
      </t-table>
    </t-card>

    <t-dialog v-model:visible="visible" header="基本信息" @confirm="onConfirm">
      <template #body>
        <div class="dialog-info-block">
          <div v-for="(item, index) in BASE_INFO_DATA" :key="index" class="info-item">
            <h1>{{ item.name }}</h1>
            <span
              :class="{
                ['inProgress']: item.type && item.type.value === 'inProgress',
                ['pdf']: item.type && item.type.value === 'pdf',
              }"
            >
              <i v-if="item.type && item.type.key === 'contractStatus'" />
              {{ item.value }}
            </span>
          </div>
        </div>
      </template>
    </t-dialog>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DetailAdvanced',
};
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { prefix } from '@/config/global';
import { BASE_INFO_DATA, TABLE_COLUMNS_DATA as columns, PRODUCT_LIST } from './constants';
import request from '@/utils/request';
import { ResDataType } from '@/interface';

import Product from './components/Product.vue';

const data = ref([]);
const pagination = ref({
  defaultPageSize: 10,
  total: 100,
  defaultCurrent: 1,
});

const updateCurrent = ref(0);

const stepUpdate = () => {
  setInterval(() => {
    if (updateCurrent.value > 5) {
      updateCurrent.value = -1;
    }
    updateCurrent.value += 1;
  }, 2000);
};

const fetchData = async () => {
  try {
    const res: ResDataType = await request.get('/api/get-purchase-list');
    if (res.code === 0) {
      const { list = [] } = res.data;
      data.value = list;
      pagination.value = {
        ...pagination.value,
        total: list.length,
      };
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  stepUpdate();
  fetchData();
});

const visible = ref(false);
const sortChange = (val) => {
  console.log(val);
};
const rehandleChange = (changeParams, triggerAndData) => {
  console.log('统一Change', changeParams, triggerAndData);
};
const listClick = () => {
  visible.value = true;
};
const deleteClickOp = (columns) => {
  data.value.splice(columns.rowIndex, 1);
};
const onConfirm = () => {
  visible.value = false;
};
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
