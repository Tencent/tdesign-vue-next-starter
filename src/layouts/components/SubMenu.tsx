import { defineComponent, PropType, computed } from 'vue';
import { PREFIX as prefix } from '@/config/global';
import { MenuRoute } from '@/interface';

// utils
const isSingleNav = (list: Array<MenuRoute>) => list.every((item) => !item.children || item.children.length === 0);

const getMenuList = (list: MenuRoute[], basePath?: string): MenuRoute[] => {
  if (!list) {
    return [];
  }
  return list.map((item) => {
    const path = basePath ? `${basePath}/${item.path}` : item.path;
    return {
      path,
      title: item.title,
      icon: item.icon || '',
      children: getMenuList(item.children, path),
      meta: item.meta || {},
    };
  });
};

const useRenderNav = (list: Array<MenuRoute>, deep = 0, maxLevel = 2) => {
  if (isSingleNav(list)) {
    return list.map((item) => (
      <t-menu-item
        key={item.path}
        value={item.path}
        to={item.path}
        icon={() => item.icon && <t-icon name={item.icon} />}
      >
        {item.title}
      </t-menu-item>
    ));
  }

  return list.map((item) => {
    if (deep < maxLevel) {
      if (deep === 0) {
        return (
          <t-submenu
            name={item.path}
            value={item.path}
            title={item.title}
            icon={() => item.icon && <t-icon name={item.icon} />}
          >
            {item.children && useRenderNav(item.children, deep + 1)}
          </t-submenu>
        );
      }
      return (
        <t-menu-item
          name={item.path}
          value={item.path}
          to={item.path}
          icon={() => item.icon && <t-icon name={item.icon} />}
        >
          {item.title}
          {item.children && useRenderNav(item.children, deep + 1)}
        </t-menu-item>
      );
    }
    return '';
  });
};

export default defineComponent({
  name: 'SubMenu',
  props: {
    navData: {
      type: Array as PropType<MenuRoute[]>,
      default: () => [],
    },
  },
  setup(props) {
    const list = computed(() => {
      const { navData } = props;
      return getMenuList(navData);
    });

    return {
      prefix,
      list,
      useRenderNav,
    };
  },
  render() {
    return <div>{this.useRenderNav(this.list)}</div>;
  },
});
