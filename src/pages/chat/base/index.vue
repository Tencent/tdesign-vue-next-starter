<template>
  <t-card :bordered="false">
    <t-chat
      :data="[
        {
          avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
          content: '它叫 McMurdo Station ATM，是美国富国银行安装在南极洲最大科学中心麦克默多站的一台自动提款机。',
          role: 'assistant',
        },
        {
          avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
          content: '南极的自动提款机叫什么名字？',
          role: 'user',
        },
      ]"
    >
    </t-chat>
  </t-card>
</template>
<script setup lang="ts"></script>
