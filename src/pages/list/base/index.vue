<template>
  <div :class="`${PREFIX}-panel`">
    <t-row :class="`${PREFIX}-operater-row`" justify="space-between">
      <div>
        <t-button @click="handleSetupContract"> 新建合同 </t-button>
        <t-button variant="base" theme="default" :disabled="!selectedRowKeys.length"> 导出合同 </t-button>
        <p v-if="!!selectedRowKeys.length" :class="`${PREFIX}-selected-count`">已选{{ selectedRowKeys.length }}项</p>
      </div>
      <div :class="`${PREFIX}-search-input`">
        <t-input v-model="searchValue" placeholder="请输入你需要搜索的内容" clearable>
          <template #suffix-icon>
            <t-icon-search size="20px" />
          </template>
        </t-input>
      </div>
    </t-row>
    <div class="table-container">
      <t-table
        :data="data"
        :columns="COLUMNS"
        :row-key="rowKey"
        vertical-align="top"
        :hover="true"
        :pagination="pagination"
        :selected-row-keys="selectedRowKeys"
        :loading="dataLoading"
        @page-change="rehandlePageChange"
        @change="rehandleChange"
        @select-change="rehandleSelectChange"
      >
        <template #status="{ row }">
          <t-tag v-if="row.status === CONTRACT_STATUS.FAIL" theme="danger" variant="light"> 审核失败 </t-tag>
          <t-tag v-if="row.status === CONTRACT_STATUS.AUDIT_PENDING" theme="warning" variant="light"> 待审核 </t-tag>
          <t-tag v-if="row.status === CONTRACT_STATUS.EXEC_PENDING" theme="warning" variant="light"> 待履行 </t-tag>
          <t-tag v-if="row.status === CONTRACT_STATUS.EXECUTING" theme="success" variant="light"> 履行中 </t-tag>
          <t-tag v-if="row.status === CONTRACT_STATUS.FINISH" theme="success" variant="light"> 已完成 </t-tag>
        </template>
        <template #contractType="{ row }">
          <p v-if="row.contractType === CONTRACT_TYPES.MAIN">审核失败</p>
          <p v-if="row.contractType === CONTRACT_TYPES.SUB">待审核</p>
          <p v-if="row.contractType === CONTRACT_TYPES.SUPPLEMENT">待履行</p>
        </template>
        <template #paymentType="{ row }">
          <p v-if="row.paymentType === CONTRACT_PAYMENT_TYPES.PAYMENT" class="payment-col">
            付款<trend class="dashboard-item-trend" type="up" />
          </p>
          <p v-if="row.paymentType === CONTRACT_PAYMENT_TYPES.RECIPT" class="payment-col">
            收款<trend class="dashboard-item-trend" type="down" />
          </p>
        </template>

        <template #op="slotProps">
          <a :class="`${PREFIX}-link`" @click="handleClickDetail()">详情</a>
          <a :class="`${PREFIX}-link`" @click="handleClickDelete(slotProps)">删除</a>
        </template>
      </t-table>
    </div>
  </div>
  <t-dialog
    v-model:visible="confirmVisible"
    header="是否确认删除"
    :body="confirmBody"
    :on-cancel="onCancel"
    @confirm="onConfirmDelete"
  />
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import TIconSearch from 'tdesign-vue-next/lib/icon/search';
import { MessagePlugin } from 'tdesign-vue-next';

import { PREFIX } from '@/config/global';
import { CONTRACT_STATUS, CONTRACT_TYPES, CONTRACT_PAYMENT_TYPES } from '@/constants';
import Trend from '@/components/trend/index.vue';
import { ResDataType } from '@/interface';
import request from '@/utils/request';

import { COLUMNS } from './constants';

export default defineComponent({
  name: 'ListBaseCard',
  components: {
    TIconSearch,
    Trend,
  },
  setup() {
    const data = ref([]);
    const pagination = ref({
      defaultPageSize: 20,
      total: 100,
      defaultCurrent: 1,
    });

    const searchValue = ref('');

    const dataLoading = ref(false);
    const fetchData = async () => {
      dataLoading.value = true;
      try {
        const res: ResDataType = await request.get('/api/get-list');
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
      } finally {
        dataLoading.value = false;
      }
    };

    const deleteIdx = ref(-1);
    const confirmBody = computed(() => {
      if (deleteIdx.value > -1) {
        const { no, name } = data.value[deleteIdx.value];
        return `产品编号:${no}, 产品名称: ${name}`;
      }
      return '';
    });

    onMounted(() => {
      fetchData();
    });

    const confirmVisible = ref(false);

    const selectedRowKeys = ref([1, 2]);

    const router = useRouter();

    const resetIdx = () => {
      deleteIdx.value = -1;
    };

    const onConfirmDelete = () => {
      // 真实业务请发起请求
      data.value.splice(deleteIdx.value - 1, 1);
      pagination.value.total = data.value.length;
      const selectedIdx = selectedRowKeys.value.indexOf(deleteIdx.value);
      if (selectedIdx > -1) {
        selectedRowKeys.value.splice(selectedIdx, 1);
      }
      confirmVisible.value = false;
      MessagePlugin.success('删除成功');
      resetIdx();
    };

    const onCancel = () => {
      resetIdx();
    };

    return {
      CONTRACT_STATUS,
      CONTRACT_TYPES,
      CONTRACT_PAYMENT_TYPES,
      COLUMNS,
      PREFIX,
      data,
      searchValue,
      dataLoading,
      pagination,
      confirmBody,
      confirmVisible,
      rowKey: 'index',
      onConfirmDelete,
      onCancel,
      selectedRowKeys,
      rehandleSelectChange(val: number[]) {
        selectedRowKeys.value = val;
      },
      rehandlePageChange(curr, pageInfo) {
        console.log('分页变化', curr, pageInfo);
      },
      rehandleChange(changeParams, triggerAndData) {
        console.log('统一Change', changeParams, triggerAndData);
      },
      handleClickDetail() {
        router.push('/detail/base');
      },
      handleSetupContract() {
        router.push('/form/base');
      },
      handleClickDelete({ row }) {
        deleteIdx.value = row.index;
        confirmVisible.value = true;
      },
    };
  },
  methods: {},
});
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
