<template>
  <t-page-header> 通知中心 </t-page-header>
  <div class="secondary-notification">
    <t-tabs v-model="value">
      <t-tab-panel
        value="frist"
        label="全部通知"
      >
        <t-list
          v-if="msgData.length > 0"
          class="secondary-msg-list"
          :split="true"
        >
          <t-list-item
            v-for="(item, index) in msgData"
            :key="index"
          >
            <p
              :class="['content', { unread: item.status }]"
              @click="setReadStatus(item)"
            >
              {{ item.content }}<span> - {{ item.type }}</span>
            </p>
            <template #action>
              <p class="msg-date">
                {{ item.date }}
              </p>
              <div class="msg-action">
                <t-tooltip
                  class="set-read-icon"
                  :overlay-style="{ margin: '6px' }"
                  :content="item.status ? '设为已读' : '设为未读'"
                >
                  <span
                    class="msg-action-icon"
                    @click="setReadStatus(item)"
                  >
                    <t-icon
                      v-if="!!item.status"
                      name="queue"
                      size="16px"
                    />
                    <svg
                      v-else
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.63795 11.4471H8.5V12.4471H5L2.49205 14.537C2.29666 14.6999 2 14.5609 2 14.3066V4.94708C2 4.3948 2.44772 3.94708 3 3.94708H13C13.5523 3.94708 14 4.3948 14 4.94708V10H13V4.94708H3V12.812L4.63795 11.4471Z"
                        fill="black"
                      />
                      <path
                        d="M11.7786 14.9286L15.3536 11.3535L14.6464 10.6465L11.7786 13.5144L10.1318 11.8677L9.42471 12.5748L11.7786 14.9286Z"
                        fill="black"
                      /></svg></span>
                </t-tooltip>
                <t-tooltip
                  content="删除通知"
                  :overlay-style="{ margin: '6px' }"
                >
                  <span @click="handleClickDeleteBtn(item)"><t-icon
                    name="delete"
                    size="16px"
                  /></span>
                </t-tooltip>
              </div>
            </template>
          </t-list-item>
        </t-list>
        <div
          v-else
          class="secondary-msg-list__empty-list"
        >
          <img
            src="https://tdesign.gtimg.com/pro-template/personal/nothing.png"
            alt="空"
          >
          <p>暂无通知</p>
        </div>
      </t-tab-panel>
      <t-tab-panel
        value="second"
        label="未读通知"
      >
        <t-list
          v-if="unreadMsg.length > 0"
          class="secondary-msg-list"
          :split="true"
        >
          <t-list-item
            v-for="(item, index) in unreadMsg"
            :key="index"
          >
            <p
              :class="['content', { unread: item.status }]"
              @click="setReadStatus(item)"
            >
              {{ item.content }}<span> - {{ item.type }}</span>
            </p>
            <template #action>
              <p class="msg-date">
                {{ item.date }}
              </p>
              <div class="msg-action">
                <t-tooltip
                  class="set-read-icon"
                  :overlay-style="{ margin: '6px' }"
                  :content="item.status ? '设为已读' : '设为未读'"
                >
                  <span @click="setReadStatus(item)">
                    <t-icon
                      name="queue"
                      size="16px"
                    />
                  </span>
                </t-tooltip>
                <t-tooltip
                  content="删除通知"
                  :overlay-style="{ margin: '6px' }"
                >
                  <span @click="handleClickDeleteBtn(item)"><t-icon
                    name="delete"
                    size="16px"
                  /></span>
                </t-tooltip>
              </div>
            </template>
          </t-list-item>
        </t-list>
        <div
          v-else
          class="secondary-msg-list__empty-list"
        >
          <img
            src="https://tdesign.gtimg.com/pro-template/personal/nothing.png"
            alt="空"
          >
          <p>暂无未读通知</p>
        </div>
      </t-tab-panel>
      <t-tab-panel
        value="third"
        label="已读通知"
      >
        <t-list
          v-if="readMsg.length > 0"
          class="secondary-msg-list"
          :split="true"
        >
          <t-list-item
            v-for="(item, index) in readMsg"
            :key="index"
          >
            <p :class="['content', { unread: item.status }]">
              {{ item.content }}<span> - {{ item.type }}</span>
            </p>
            <template #action>
              <p class="msg-date">
                {{ item.date }}
              </p>
              <div class="msg-action">
                <t-tooltip
                  class="set-read-icon"
                  :overlay-style="{ margin: '6px' }"
                  :content="item.status ? '设为已读' : '设为未读'"
                >
                  <span
                    class="msg-action-icon"
                    @click="setReadStatus(item)"
                  >
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.63795 11.4471H8.5V12.4471H5L2.49205 14.537C2.29666 14.6999 2 14.5609 2 14.3066V4.94708C2 4.3948 2.44772 3.94708 3 3.94708H13C13.5523 3.94708 14 4.3948 14 4.94708V10H13V4.94708H3V12.812L4.63795 11.4471Z"
                        fill="black"
                      />
                      <path
                        d="M11.7786 14.9286L15.3536 11.3535L14.6464 10.6465L11.7786 13.5144L10.1318 11.8677L9.42471 12.5748L11.7786 14.9286Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                </t-tooltip>
                <t-tooltip
                  content="删除通知"
                  :overlay-style="{ margin: '6px' }"
                >
                  <span @click="handleClickDeleteBtn(item)"><t-icon
                    name="delete"
                    size="16px"
                  /></span>
                </t-tooltip>
              </div>
            </template>
          </t-list-item>
        </t-list>
        <div
          v-else
          class="secondary-msg-list__empty-list"
        >
          <img
            src="https://tdesign.gtimg.com/pro-template/personal/nothing.png"
            alt="空"
          >
          <p>暂无已读通知</p>
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
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapGetters } from 'vuex';
import { PREFIX as prefix } from '@/config/global';

// 导入样式
import './index.less';

export default defineComponent({
  name: 'DetailSecondary',
  components: {},
  data() {
    return {
      prefix,
      data: [],
      value: 'frist',
      visible: false,
      selectedItem: undefined,
    };
  },
  computed: {
    ...mapState('notification', ['msgData']),
    ...mapGetters('notification', ['unreadMsg', 'readMsg']),
  },
  methods: {
    handleClickDeleteBtn(item) {
      this.visible = true;
      this.selectedItem = item;
    },
    setReadStatus(item) {
      const changeMsg = this.msgData;
      changeMsg.forEach((e) => {
        if (e.id === item.id) {
          e.status = !e.status;
        }
      });
      this.$store.commit('notification/setMsgData', changeMsg);
    },
    deleteMsg() {
      const item = this.selectedItem;
      const changeMsg = this.msgData;
      changeMsg.forEach((e, index) => {
        if (e.id === item.id) {
          changeMsg.splice(index, 1);
        }
      });
      this.visible = false;
      this.$store.commit('notification/setMsgData', changeMsg);
    },
  },
});
</script>
