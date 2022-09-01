<script lang="ts">
import { defineComponent, PropType, h } from 'vue';

type FnIconRender = {
  render: () => void;
};

export default defineComponent({
  props: {
    icon: {
      type: Object as PropType<FnIconRender>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      if (typeof props.icon.render === 'function') {
        return h(props.icon, {
          class: 't-icon',
        });
      }
      return undefined;
    };
  },
});
</script>
