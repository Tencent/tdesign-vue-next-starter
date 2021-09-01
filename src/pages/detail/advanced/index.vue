<template>
  <div>
    <t-page-header>合同详情页</t-page-header>

    <div :class="prefix + '-panel'">
      <div class="base-info">
        <t-row
          :class="prefix + '-operater-row'"
          justify="space-between"
        >
          <p :class="prefix + '-operater-title'">
            基本信息
          </p>
        </t-row>
        <div class="info-block">
          <div
            v-for="(item, index) in baseInfoData"
            :key="index"
            class="info-item"
          >
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
      </div>
    </div>

    <!-- 发票进度 -->
    <div :class="prefix + '-panel'">
      <t-row
        :class="prefix + '-operater-row'"
        justify="space-between"
      >
        <p :class="prefix + '-operater-title'">
          发票进度
        </p>
      </t-row>
      <t-row
        :class="prefix + '-operater-row row-padding'"
        justify="space-between"
      >
        <t-steps
          theme="dot"
          :current="updateCurrent"
        >
          <t-step-item
            title="申请提交"
            content="已于12月21日提交"
          />
          <t-step-item
            title="电子发票"
            content="预计1～3个工作日"
          />
          <t-step-item
            title="发票已邮寄"
            content="电子发票开出后7个工作日内联系"
          />
          <t-step-item
            title="完成"
            content=""
          />
        </t-steps>
      </t-row>
    </div>

    <!-- 产品目录 -->
    <div :class="prefix + '-panel'">
      <t-row
        :class="prefix + '-operater-row'"
        justify="space-between"
      >
        <p :class="prefix + '-operater-title'">
          产品目录
        </p>
      </t-row>
      <t-row class="operater-block-container">
        <t-col :flex="1">
          <div class="operater-add">
            <div class="operater-sub">
              <t-icon
                name="add"
                size="20px"
              />
              <span>新增产品</span>
            </div>
          </div>
        </t-col>
        <t-col :flex="1">
          <div class="operater-block operater-gap">
            <div class="operater-title">
              <t-icon
                name="server"
                size="2em"
              />
              <h1>Macbook</h1>
            </div>
            <div class="operater-item">
              <h1>产品编号</h1>
              <span>p_tmp_60a637cd0d</span>
            </div>
            <div class="operater-item">
              <h1>计费方式</h1>
              <span>按量计费</span>
            </div>
            <div class="operater-item">
              <h1>交付时间</h1>
              <span>2020-12-21 11:05:17</span>
            </div>
          </div>
        </t-col>
        <t-col :flex="1">
          <div class="operater-block operater-gap">
            <div class="operater-title">
              <t-icon
                name="server"
                size="2em"
              />
              <h1>椅子</h1>
            </div>
            <div class="operater-item">
              <h1>产品编号</h1>
              <span>p_tmp_60a637cd0C</span>
            </div>
            <div class="operater-item">
              <h1>计费方式</h1>
              <span>按量计费</span>
            </div>
            <div class="operater-item">
              <h1>交付时间</h1>
              <span>2020-12-21 13:08:09</span>
            </div>
          </div>
        </t-col>
      </t-row>
    </div>

    <!-- 产品采购明细 -->
    <div :class="prefix + '-panel'">
      <t-row
        :class="prefix + '-operater-row'"
        justify="space-between"
      >
        <p :class="prefix + '-operater-title'">
          产品采购明细
        </p>
      </t-row>

      <t-table
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :bordered="bordered"
        :hover="hover"
        row-key="index"
        @sort-change="sortChange"
        @change="rehandleChange"
      >
        <template #op="slotProps">
          <a
            :class="prefix + '-link'"
            @click="listClick(slotProps)"
          >管理</a>
          <a
            :class="prefix + '-link'"
            @click="deleteClickOp(slotProps)"
          >删除</a>
        </template>
        <t-icon
          slot="op-column"
          name="descending-order"
        />
      </t-table>
    </div>
    <t-dialog
      v-model:visible="visible"
      header="基本信息"
      @confirm="onConfirm"
    >
      <div slot="body">
        <div class="dialog-info-block">
          <div
            v-for="(item, index) in baseInfoData"
            :key="index"
            class="info-item"
          >
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
      </div>
    </t-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import model from './index';
import { Prefix as prefix } from '@/config/global';

// 导入样式
import './index.less';

export default defineComponent({
  name: 'DetailAdvanced',
  data() {
    return {
      data: [],
      prefix,
      updateCurrent: 0,
      columns: model.getTableColumns(),
      baseInfoData: model.getBaseInfoData(),
      bordered: true,
      hover: true,
      visible: false,
      pagination: {
        defaultPageSize: 10,
        total: 100,
        defaultCurrent: 1,
      },
    };
  },
  async mounted() {
    // 模拟进度
    setInterval(() => {
      if (this.updateCurrent > 5) {
        this.updateCurrent = -1;
      }
      this.updateCurrent = this.updateCurrent + 1;
    }, 2000);

    this.$request
      .get('/api/get-purchase-list')
      .then((res) => {
        if (res.code === 0) {
          const { list = [] } = res.data;
          this.data = list;
          this.pagination = {
            ...this.pagination,
            total: list.length,
          };
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    sortChange(val) {
      console.log(val);
    },
    rehandleChange(changeParams, triggerAndData) {
      console.log('统一Change', changeParams, triggerAndData);
    },
    listClick(e) {
      console.log(e);
      this.visible = true;
    },
    deleteClickOp(e) {
      this.data.splice(e.index, 1);
    },
    onConfirm() {
      this.visible = false;
    },
  },
});

</script>
<style>

</style>
