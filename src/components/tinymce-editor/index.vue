<template>
  <editor ref="editorRef" v-model="editorContent" :init="editorInitOptions"></editor>
</template>

<script lang="ts">
export default {
  name: 'TinymceEditor',
};
</script>

<script setup lang="ts">
// 接下来定义编辑器所需要的插件数据
import { ref, onMounted, defineEmits, watch, computed } from 'vue';
// JS部分
// 在js中引入所需的主题和组件
import tinymce from 'tinymce/tinymce';
import Editor from '@tinymce/tinymce-vue';

// import 'tinymce/skins/content/default/content.min.css' // 这个不能要，会污染全局样式
import 'tinymce/icons/default'; // 引入编辑器图标icon，不引入则不显示对应图标
import 'tinymce/models/dom'; // 这里是个坑 一定要引入
import 'tinymce/themes/silver'; // 引入编辑器主题

// 在TinyMce.vue中接着引入相关插件
import 'tinymce/plugins/code'; // 源码
import 'tinymce/plugins/codesample'; // 代码示例
import 'tinymce/plugins/emoticons'; // 表情符号
import 'tinymce/plugins/fullscreen'; // 全屏
import 'tinymce/plugins/help'; // 关于插件
import 'tinymce/plugins/image'; // 插入上传图片插件
import 'tinymce/plugins/link'; // 预览
import 'tinymce/plugins/lists'; // 列表插件
import 'tinymce/plugins/media'; // 插入视频插件
import 'tinymce/plugins/preview'; // 预览
import 'tinymce/plugins/table'; // 插入表格插件
import 'tinymce/plugins/wordcount'; // 字数统计插件

import axios from 'axios';
import { useSettingStore } from '@/store';

const settingStore = useSettingStore();

// 为组件定义事件
const emits = defineEmits(['change']);

// 这里我选择将数据定义在props里面，方便在不同的页面也可以配置出不同的编辑器，当然也可以直接在组件中直接定义
const props = defineProps({
  selector: {
    type: String,
    default: 'textarea',
  },
  value: {
    type: String,
    default: '',
  },
  baseUrl: {
    type: String,
    default: '/tinymce',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  plugins: {
    type: [String, Array],
    default: 'lists image media table wordcount code codesample fullscreen emoticons preview help',
  }, // 必填
  toolbar: {
    type: [String, Array],
    default: `undo redo | blocks | bold italic underline alignleft aligncenter alignright alignjustify | forecolor backcolor removeformat | bullist numlist outdent indent | image media | fullscreen`,
  }, // 必填
  width: {
    type: [String, Number],
    default: '100%',
  },
  height: {
    type: [String, Number],
    default: 650,
  },
  inline: {
    type: Boolean,
    default: false,
  },
  // 是否使用菜单栏
  menu: {
    type: Boolean,
    default: true,
  },
  uploadHandlerUrl: {
    type: String,
    default: `/UpFilesControllers/uploadHandler`,
  },
  theme: {
    type: String,
    default: 'auto',
  },
});

// 用于接收外部传递进来的富文本
const editorContent = ref(props.value);

// 主题选项，动态计算 skin 及 content 路径名称
const ThemeOptions = computed(() => {
  switch (props.theme) {
    case 'light':
      return {
        skin: 'oxide',
        content: 'default',
      };
    case 'dark':
      return {
        skin: 'oxide-dark',
        content: 'dark',
      };
    case 'auto':
    case 'default':
    default:
      return settingStore.displayMode === 'light'
        ? {
            skin: 'oxide',
            content: 'default',
          }
        : {
            skin: 'oxide-dark',
            content: 'dark',
          };
  }
});

// 定义一个对象 init 初始化
const editorInitOptions = computed(() => ({
  selector: props.selector,
  base_url: props.baseUrl,
  skin_url: `${props.baseUrl}/skins/ui/${ThemeOptions.value.skin}`, // skin路径，具体路径看自己的项目
  content_css: `${props.baseUrl}/skins/content/${ThemeOptions.value.content}/content.min.css`, // 以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
  language_url: `${props.baseUrl}/langs/zh-Hans.js`, // 语言包的路径，具体路径看自己的项目，文档后面附上中文js文件
  language: 'zh-Hans', // 语言
  content_style:
    'html,body { height: 100%; margin: 0; } body { box-sizing: border-box; overflow-y: auto; padding: 1em; } img { max-width: 100% }', // 自定义 CSS 样式应用与内容
  plugins: props.plugins, // 这里的数据是在props里面就定义好了的
  toolbar: props.toolbar, // 这里的数据是在props里面就定义好了的
  width: props.width, // 宽度，默认 100%
  height: props.height, // 编辑器高度 默认 650
  resize: 'both', // 编辑器调整大小
  branding: true, // 是否禁用 “Powered by TinyMCE”
  menubar: props.menu && !props.inline, // 顶部菜单栏显示
  inline: props.inline, // 内联编辑模式, 默认 false
  image_dimensions: false, // 允许或禁用图像对话框中的图像描述输入字段，true 允许，false 禁用
  paste_data_images: true, // 允许粘贴图像
  paste_webkit_styles: 'all', // 指定在 WebKit 中粘贴时要保留的样式
  paste_merge_formats: true, // 是否启用合并格式功能
  smart_paste: true, // 智能粘贴
  nonbreaking_force_tab: false,

  // 此选项使您能够控制 TinyMCE 是否智能并将 URL 恢复为其原始值。默认情况下，URL 会自动转换（混乱），因为浏览器的内置逻辑就是这样工作的。除非您将其存储起来，否则无法获取真实的 URL。如果将此选项设置为 false，它会尝试保持这些 URL 不变。此选项默认设置为 true，这意味着 URL 被强制为绝对或相对，具体取决于 relative_urls 的状态。
  convert_urls: false, // 这个参数加上去就可以了

  // 图片上传
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  images_upload_handler: (blobInfo, progress: any) =>
    new Promise((resolve, reject) => {
      const blob = blobInfo.blob();
      if (typeof blob === 'object' && blobInfo.blob().size / 1024 / 1024 > 5) {
        reject(new Error('上传失败，图片大小请控制在 5M 以内'));
        return;
      }

      const formData = new FormData();
      formData.append('file', blobInfo.blob());

      axios
        .post(props.uploadHandlerUrl, formData)
        .then((res) => {
          console.log('tinymce editor upload result:', res);
          if (res.status === 200) {
            resolve(res.data.absUrl); // 上传成功，在成功函数里填入图片路径
          } else {
            reject(new Error(`HTTP Error: 上传失败${res.statusText}`));
          }
        })
        .catch((e) => {
          console.error(e);
          reject(new Error('上传出错，服务器开小差了呢'));
        });
    }),

  // 文件选择器类型
  file_picker_types: 'file image media', // 指定所需的文件选择器类型
  // 文件上传
  file_picker_callback: (callback, value, meta) => {
    console.log(callback, value, meta);
    const input = document.createElement('input'); // 创建一个隐藏的input
    input.setAttribute('type', 'file');
    switch (meta.filetype) {
      case 'image':
        input.setAttribute('accept', 'image/*');
        break;
      case 'media':
        input.setAttribute('accept', 'video/*,audio/*');
        break;
      case 'file': {
        const mimeList = [
          'text/plain',
          'application/x-gzip',
          'application/zip',
          'application/x-rar-compressed',
          'application/x-7z-compressed',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-powerpoint',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          'application/pdf',
        ];
        input.setAttribute('accept', mimeList.join(','));
        break;
      }
      default:
        return;
    }
    input.addEventListener('change', (_) => {
      const formData = new FormData();
      const fileblob = input.files[0]; // 选取第一个文件
      formData.append('file', fileblob);
      axios
        .post(props.uploadHandlerUrl, formData)
        .then((res) => {
          console.log('tinymce editor upload result:', res);
          callback(res.data.absUrl, { title: fileblob.name });
        })
        .catch((e) => {
          console.error(e);
        });
    });
    // 触发点击
    input.click();
  },
}));

// 监听外部传递进来的的数据变化
watch(
  () => props.value,
  (newVal) => {
    editorContent.value = props.value;
    emits('change', editorContent.value);
  },
);

// 监听富文本中的数据变化
watch(
  () => editorContent.value,
  (newVal) => {
    emits('change', editorContent.value);
  },
);

// 拿到组件实例，必须在 script 标签根部抛出
const editorRef = ref<any>(null);

// 监控主题发生变化，重新渲染，以变更编辑器 light 和 dark 主题样式
watch(
  () => settingStore.displayMode,
  () => {
    editorRef.value.rerender(editorInitOptions.value);
  },
);

// 在onMounted中初始化编辑器
onMounted(() => {
  tinymce.init({});
});
</script>
