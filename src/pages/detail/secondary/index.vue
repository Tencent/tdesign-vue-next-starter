<template>
  <div>
    <div class="secondary-notification">
      <t-tabs v-model="tabValue">
        <t-tab-panel v-for="(tab, tabIndex) in TAB_LIST" :key="tabIndex" :value="tab.value" :label="tab.label">
          <t-list v-if="msgDataList.length > 0" class="secondary-msg-list" :split="true">
            <t-list-item v-for="(item, index) in msgDataList" :key="index">
              <p :class="['content', { unread: item.status }]" @click="setReadStatus(item)">
                <t-tag size="small" :theme="NOTIFICATION_TYPES[item.quality]" variant="light">
                  {{ item.type }}
                </t-tag>
                {{ item.content }}
              </p>
              <template #action>
                <span class="msg-date">{{ item.date }}</span>

                <div class="msg-action">
                  <t-tooltip
                    class="set-read-icon"
                    :overlay-style="{ margin: '6px' }"
                    :content="item.status ? '设为已读' : '设为未读'"
                  >
                    <span class="msg-action-icon" @click="setReadStatus(item)">
                      <t-icon v-if="!!item.status" name="queue" size="16px" />
                      <t-icon v-else name="chat" />
                    </span>
                  </t-tooltip>
                  <t-tooltip content="删除通知" :overlay-style="{ margin: '6px' }">
                    <span @click="handleClickDeleteBtn(item)">
                      <t-icon name="delete" size="16px" />
                    </span>
                  </t-tooltip>
                </div>
              </template>
            </t-list-item>
          </t-list>
          <div v-else class="secondary-msg-list__empty-list">
            <empty-icon></empty-icon>
            <p>暂无通知</p>
          </div>
        </t-tab-panel>
      </t-tabs>
    </div>
    <t-dialog
      v-model:visible="visible"
      header="删除通知"
      :body="`确认删除通知：${selectedItem && selectedItem.content}吗？`"
      :on-confirm="deleteMsg"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'DetailSecondary',
};
</script>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { NOTIFICATION_TYPES } from '@/constants';
import { NotificationItem } from '@/interface';
import EmptyIcon from '@/assets/assets-empty.svg?component';
import { useNotificationStore } from '@/store';

const TAB_LIST = [
  {
    label: '全部通知',
    value: 'msgData',
  },
  {
    label: '未读通知',
    value: 'unreadMsg',
  },
  {
    label: '已读通知',
    value: 'readMsg',
  },
];

const tabValue = ref('msgData');

const visible = ref(false);
const selectedItem = ref<NotificationItem>();

const store = useNotificationStore();
const { msgData, unreadMsg, readMsg } = storeToRefs(store);

const msgDataList = computed(() => {
  if (tabValue.value === 'msgData') return msgData.value;
  if (tabValue.value === 'unreadMsg') return unreadMsg.value;
  if (tabValue.value === 'readMsg') return readMsg.value;
  return [];
});

const handleClickDeleteBtn = (item: NotificationItem) => {
  visible.value = true;
  selectedItem.value = item;
};

const setReadStatus = (item: NotificationItem) => {
  const changeMsg = msgData.value;
  changeMsg.forEach((e: NotificationItem) => {
    if (e.id === item.id) {
      if (e.status) e.status = false;
    }
  });
  store.setMsgData(changeMsg);
};

const deleteMsg = () => {
  const item = selectedItem.value;
  const changeMsg = msgData.value;
  changeMsg.forEach((e: NotificationItem, index: number) => {
    if (e.id === item?.id) {
      changeMsg.splice(index, 1);
    }
  });
  visible.value = false;
  store.setMsgData(changeMsg);
};
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
