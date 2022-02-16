<template>
  <div :class="cardClass">
    <div class="list-card-item_detail">
      <t-row justify="space-between">
        <div :class="cardLogoClass">
          <shop-icon v-if="product.type === 1" />
          <calendar-icon v-if="product.type === 2" />
          <service-icon v-if="product.type === 3" />
          <user-avatar-icon v-if="product.type === 4" />
          <laptop-icon v-if="product.type === 5" />
        </div>
        <t-tag :theme="product.isSetup ? 'success' : 'default'" :disabled="!product.isSetup">{{
          product.isSetup ? '已启用' : '已停用'
        }}</t-tag>
      </t-row>
      <p class="list-card-item_detail--name">
        {{ product.name }}
      </p>
      <p class="list-card-item_detail--desc">
        {{ product.description }}
      </p>
      <t-row justify="space-between" align="middle" :class="cardControlClass">
        <div>
          <t-button shape="circle" :disabled="!product.isSetup">
            {{ typeMap[product.type - 1] }}
          </t-button>
          <t-button shape="circle" :disabled="!product.isSetup">
            <add-icon />
          </t-button>
        </div>
        <t-dropdown
          :disabled="!product.isSetup"
          trigger="click"
          :options="[
            {
              content: '管理',
              value: 'manage',
              onClick: () => handleClickManage(product),
            },
            {
              content: '删除',
              value: 'delete',
              onClick: () => handleClickDelete(product),
            },
          ]"
        >
          <t-button theme="default" :disabled="!product.isSetup" shape="square" variant="text">
            <more-icon />
          </t-button>
        </t-dropdown>
      </t-row>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import {
  ShopIcon,
  CalendarIcon,
  ServiceIcon,
  UserAvatarIcon,
  LaptopIcon,
  MoreIcon,
  AddIcon,
} from 'tdesign-icons-vue-next';

export interface CardProductType {
  type: number;
  isSetup: boolean;
  description: string;
  name: string;
}

export default defineComponent({
  name: 'ListCardComponent',
  components: {
    ShopIcon,
    CalendarIcon,
    ServiceIcon,
    UserAvatarIcon,
    LaptopIcon,
    MoreIcon,
    AddIcon,
  },
  props: {
    product: {
      type: Object as PropType<CardProductType>,
      default: () => {
        return {};
      },
    },
  },
  emits: ['manage-product', 'delete-item'],
  setup(props, ctx) {
    const { emit } = ctx;
    const cardClass = computed(() => [
      'list-card-item',
      {
        'list-card-item__disabled': !props.product.isSetup,
      },
    ]);

    const cardLogoClass = computed(() => [
      'list-card-item_detail--logo',
      {
        'list-card-item_detail--logo__disabled': !props.product.isSetup,
      },
    ]);

    const cardControlClass = computed(() => [
      'list-card-item_detail--control',
      {
        'list-card-item_detail--control__disabled': !props.product.isSetup,
      },
    ]);

    return {
      cardClass,
      cardLogoClass,
      cardControlClass,
      typeMap: ['A', 'B', 'C', 'D', 'E'],
      handleClickManage(product) {
        emit('manage-product', product);
      },
      handleClickDelete(product) {
        emit('delete-item', product);
      },
    };
  },
});
</script>

<style lang="less" scoped>
@import '@/style/variables';

.list-card-item {
  display: flex;
  flex-direction: column;
  border-radius: @border-radius;
  overflow: hidden;
  cursor: pointer;
  color: @text-color-secondary;

  &_detail {
    flex: 1;
    background: @bg-color-container;
    padding: 24px 32px;
    min-height: 140px;

    &--logo {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: @brand-color-1;
      font-size: 32px;
      color: @brand-color;

      &__disabled {
        color: @brand-color-3;
      }
    }

    &--name {
      margin: 24px 0 8px 0;
      font-size: 16px;
      font-weight: 400;
      color: @text-color-primary;
    }

    &--desc {
      font-size: 12px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 24px;
      height: 40px;
    }

    &--control {
      > div:first-child {
        position: relative;

        > button:last-child {
          position: absolute;
          left: 18px;
          background-color: @brand-color-2;
          --ripple-color: @brand-color-2;
          color: @brand-color;
        }
      }

      .t-icon-more {
        font-size: 24px;
        color: @text-color-primary;
      }
    }
  }

  &__disabled {
    color: @text-color-disabled;

    .list-card-item_detail--name {
      color: @text-color-disabled;
    }

    .t-icon-more {
      color: @text-color-disabled;
    }
  }
}
</style>
