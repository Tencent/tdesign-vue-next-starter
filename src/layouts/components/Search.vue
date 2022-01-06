<template>
  <div v-if="layout === 'side'" class="header-menu-search">
    <t-input
      :class="{ 'hover-active': isSearchFocus }"
      placeholder="请输入搜索内容"
      @blur="changeSearchFocus(false)"
      @focus="changeSearchFocus(true)"
    >
      <template #prefix-icon>
        <t-icon class="icon" name="search" size="16" />
      </template>
    </t-input>
  </div>

  <div v-else class="header-menu-search-left">
    <t-button
      :class="{ 'search-icon-hide': isSearchFocus }"
      theme="default"
      shape="square"
      variant="text"
      @click="changeSearchFocus(true)"
    >
      <t-icon name="search" />
    </t-button>
    <t-input
      v-model="searchData"
      :class="['header-search', { 'width-zero': !isSearchFocus }]"
      placeholder="输入要搜索内容"
      :autofocus="isSearchFocus"
      @blur="changeSearchFocus(false)"
    >
      <template #prefix-icon>
        <t-icon name="search" size="16" />
      </template>
    </t-input>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';

export default defineComponent({
  props: {
    layout: {
      type: String as PropType<string>,
    },
  },
  setup() {
    const isSearchFocus = ref(false);
    const searchData = ref('');
    const changeSearchFocus = (value: boolean) => {
      if (!value) {
        searchData.value = '';
      }
      isSearchFocus.value = value;
    };
    return {
      isSearchFocus,
      searchData,
      changeSearchFocus,
    };
  },
});
</script>
<style lang="less">
@import '@/style/variables.less';

.header-menu-search {
  display: flex;
  margin-left: 16px;
  .hover-active {
    .t-input__inner {
      background: @bg-color-secondarycontainer;
    }
    .t-icon {
      color: @brand-color !important;
    }
  }

  .t-icon {
    font-size: 20px !important;
    color: @text-color-primary !important;
  }
  .t-input {
    border: none;
    outline: none;
    box-shadow: none;
    transition: background @anim-duration-base linear;
    .t-input__inner {
      transition: background @anim-duration-base linear;
    }
    .t-input__inner {
      background: none;
    }
    &:hover {
      background: @bg-color-secondarycontainer;
      .t-input__inner {
        background: @bg-color-secondarycontainer;
      }
    }
  }
}

.header-search {
  width: 200px;
  transition: width @anim-duration-base @anim-time-fn-easing;
  .t-input {
    border: 0;
    padding-left: 40px;
    &:focus {
      box-shadow: none;
    }
  }
  &.width-zero {
    width: 0;
    opacity: 0;
  }
}
.t-button {
  transition: opacity @anim-duration-base @anim-time-fn-easing;
}
.search-icon-hide {
  opacity: 0;
}
.header-menu-search-left {
  display: flex;
  align-items: center;
}
</style>
