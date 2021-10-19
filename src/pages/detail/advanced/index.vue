<template>
  <div>
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
            content
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
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="33"
                  height="33"
                  rx="16.5"
                  stroke="white"
                />
                <path d="M16.35 17.6501V21.5H17.65V17.6501H21.5V16.3501H17.65V12.5H16.35V16.3501H12.5V17.6501H16.35Z" />
              </svg>
              <span>新增产品</span>
            </div>
          </div>
        </t-col>
        <t-col :flex="1">
          <div class="operater-block operater-gap">
            <div class="operater-content">
              <div class="operater-title">
                <svg
                  class="operater-title-icon"
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="28"
                    cy="28"
                    r="28"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14 18H17.1529L19.93 34.663C20.0586 35.4345 20.7261 36 21.5083 36H40V34H21.8471L21.1805 30H38.4478C39.182 30 39.8219 29.5003 40 28.7881L41.7 21.9881C41.9525 20.9782 41.1887 20 40.1478 20H19.5138L19.07 17.337C18.9414 16.5655 18.2739 16 17.4917 16H14V18ZM38.1355 28H20.8471L19.8471 22H39.6355L38.1355 28Z"
                  />
                  <path
                    d="M21.5 41C22.3284 41 23 40.3284 23 39.5C23 38.6716 22.3284 38 21.5 38C20.6716 38 20 38.6716 20 39.5C20 40.3284 20.6716 41 21.5 41Z"
                  />
                  <path
                    d="M37.6259 41C38.4543 41 39.1259 40.3284 39.1259 39.5C39.1259 38.6716 38.4543 38 37.6259 38C36.7975 38 36.1259 38.6716 36.1259 39.5C36.1259 40.3284 36.7975 41 37.6259 41Z"
                  />
                </svg>

                <h1>Macbook Pro 2021</h1>
                <div class="operater-title-subtitle">
                  Macbook Pro 2021
                </div>
                <div class="operater-title-tags">
                  <t-tag
                    class="operater-title-tag"
                    theme="success"
                    size="small"
                  >
                    13.3 英寸
                  </t-tag>
                  <t-tag
                    class="operater-title-tag"
                    size="small"
                  >
                    Apple M1
                  </t-tag>
                  <t-tag
                    class="operater-title-tag"
                    size="small"
                  >
                    RAM 16GB
                  </t-tag>
                </div>
              </div>
              <div class="operater-item">
                <span
                  class="operater-item-info"
                >最高可选配 16GB 内存 · 最高可选配 2TB 存储设备 电池续航最长达 18 小时</span>
                <t-icon
                  class="operater-item-icon"
                  name="chevron-right"
                  size="small"
                  style="color: rgba(0, 0, 0, .26)"
                />
              </div>
              <div class="operater-footer">
                <span class="operater-footer-percentage">1420 / 1500（台）</span>
                <t-progress
                  class="operater-progress"
                  theme="line"
                  :percentage="(1420 / 1500) * 100"
                  :label="false"
                  track-color="#D4E3FC"
                />
              </div>
            </div>
          </div>
        </t-col>
        <t-col :flex="1">
          <div class="operater-block operater-gap">
            <div class="operater-content">
              <div class="operater-title">
                <svg
                  class="operater-title-icon"
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="28"
                    cy="28"
                    r="28"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14 18H17.1529L19.93 34.663C20.0586 35.4345 20.7261 36 21.5083 36H40V34H21.8471L21.1805 30H38.4478C39.182 30 39.8219 29.5003 40 28.7881L41.7 21.9881C41.9525 20.9782 41.1887 20 40.1478 20H19.5138L19.07 17.337C18.9414 16.5655 18.2739 16 17.4917 16H14V18ZM38.1355 28H20.8471L19.8471 22H39.6355L38.1355 28Z"
                  />
                  <path
                    d="M21.5 41C22.3284 41 23 40.3284 23 39.5C23 38.6716 22.3284 38 21.5 38C20.6716 38 20 38.6716 20 39.5C20 40.3284 20.6716 41 21.5 41Z"
                  />
                  <path
                    d="M37.6259 41C38.4543 41 39.1259 40.3284 39.1259 39.5C39.1259 38.6716 38.4543 38 37.6259 38C36.7975 38 36.1259 38.6716 36.1259 39.5C36.1259 40.3284 36.7975 41 37.6259 41Z"
                  />
                </svg>
                <h1>Surface Laptop Go</h1>
                <div class="operater-title-subtitle">
                  微软（Microsoft Corporation）
                </div>
                <div class="operater-title-tags">
                  <t-tag
                    class="operater-title-tag"
                    theme="success"
                    size="small"
                  >
                    12.4 英寸
                  </t-tag>
                  <t-tag
                    class="operater-title-tag"
                    size="small"
                  >
                    Core i7
                  </t-tag>
                  <t-tag
                    class="operater-title-tag"
                    size="small"
                  >
                    RAM 16GB
                  </t-tag>
                </div>
              </div>
              <div class="operater-item">
                <span class="operater-item-info">常规使用 Surface，续航时间最长可达13小时 随时伴您工作</span>
                <t-icon
                  class="operater-item-icon"
                  name="chevron-right"
                  size="small"
                  style="color: rgba(0, 0, 0, .26)"
                />
              </div>
            </div>
            <div class="operater-footer">
              <span class="operater-footer-percentage">120 / 2000（台）</span>
              <t-progress
                class="operater-progress"
                theme="line"
                :percentage="(120 / 2000) * 100"
                :label="false"
                color="#E24D59"
                track-color="#FCD4D4"
              />
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
        :hover="hover"
        row-key="index"
        size="large"
        @sort-change="sortChange"
        @change="rehandleChange"
      >
        <template #pdName="{ row }">
          <span>
            {{ row.pdName }}
            <t-tag
              v-if="row.pdType"
              size="small"
            >{{ row.pdType }}</t-tag>
          </span>
        </template>

        <template #purchaseNum="{ row }">
          <span>
            {{ row.purchaseNum }}
            <t-tag
              v-if="row.purchaseNum > 50"
              theme="danger"
              variant="light"
              size="small"
            >超预算</t-tag>
          </span>
        </template>

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

        <template #op-column>
          <t-icon name="descending-order" />
        </template>
      </t-table>
    </div>
    <t-dialog
      v-model:visible="visible"
      header="基本信息"
      @confirm="onConfirm"
    >
      <template #body>
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
      </template>
    </t-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { PREFIX as prefix } from '@/config/global';
import model from './index';

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
