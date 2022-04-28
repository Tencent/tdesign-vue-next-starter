<template>
  <div>
    <div class="list-card-operation">
      <t-button @click="formDialogVisible = true"> 新建产品 </t-button>
      <div class="search-input">
        <t-input v-model="searchValue" placeholder="请输入你需要搜索的内容" clearable>
          <template #suffix-icon>
            <search-icon v-if="searchValue === ''" size="20px" />
          </template>
        </t-input>
      </div>
    </div>

    <dialog-form v-model:visible="formDialogVisible" :data="formData" />

    <template v-if="pagination.total > 0 && !dataLoading">
      <div class="list-card-items">
        <t-row :gutter="[16, 12]">
          <t-col
            v-for="product in productList.slice(
              pagination.pageSize * (pagination.current - 1),
              pagination.pageSize * pagination.current,
            )"
            :key="product.index"
            :lg="4"
            :xs="6"
            :xl="3"
          >
            <product-card
              class="list-card-item"
              :product="product"
              @delete-item="handleDeleteItem"
              @manage-product="handleManageProduct"
            />
          </t-col>
        </t-row>
      </div>
      <div class="list-card-pagination">
        <t-pagination
          v-model="pagination.current"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-size-options="[12, 24, 36]"
          @page-size-change="onPageSizeChange"
          @current-change="onCurrentChange"
        />
      </div>
    </template>

    <div v-else-if="dataLoading" class="list-card-loading">
      <t-loading size="large" text="加载数据中..." />
    </div>

    <t-dialog
      v-model:visible="confirmVisible"
      header="确认删除所选产品？"
      :body="confirmBody"
      :on-cancel="onCancel"
      @confirm="onConfirmDelete"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'ListCard',
};
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { SearchIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import ProductCard from '@/components/product-card/index.vue';
import DialogForm from './components/DialogForm.vue';
import request from '@/utils/request';
import { ResDataType } from '@/interface';

const INITIAL_DATA = {
  name: '',
  status: '',
  description: '',
  type: '',
  mark: '',
  amount: 0,
};

const pagination = ref({ current: 1, pageSize: 12, total: 0 });
const deleteProduct = ref(undefined);

const productList = ref([]);
const dataLoading = ref(true);

const fetchData = async () => {
  try {
    const res: ResDataType = await request.get('/api/get-card-list');
    if (res.code === 0) {
      const { list = [] } = res.data;
      productList.value = list;
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

const confirmBody = computed(() =>
  deleteProduct.value ? `确认删除后${deleteProduct.value.name}的所有产品信息将被清空, 且无法恢复` : '',
);

onMounted(() => {
  fetchData();
});

const formDialogVisible = ref(false);
const searchValue = ref('');
const confirmVisible = ref(false);
const formData = ref({ ...INITIAL_DATA });

const onPageSizeChange = (size: number) => {
  pagination.value.pageSize = size;
  pagination.value.current = 1;
};
const onCurrentChange = (current: number) => {
  pagination.value.current = current;
};
const handleDeleteItem = (product) => {
  confirmVisible.value = true;
  deleteProduct.value = product;
};
const onConfirmDelete = () => {
  const { index } = deleteProduct.value;
  productList.value.splice(index - 1, 1);
  confirmVisible.value = false;
  MessagePlugin.success('删除成功');
};
const onCancel = () => {
  deleteProduct.value = undefined;
  formData.value = { ...INITIAL_DATA };
};
const handleManageProduct = (product) => {
  formDialogVisible.value = true;
  formData.value = { ...product, status: product?.isSetup ? '1' : '0' };
};
</script>

<style lang="less" scoped>
@import '@/style/variables.less';

.list-card {
  height: 100%;

  &-operation {
    display: flex;
    justify-content: space-between;

    .search-input {
      width: 360px;
    }
  }

  &-items {
    margin-top: 14px;
    margin-bottom: 24px;
  }

  &-pagination {
    padding: 16px;
  }

  &-loading {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
