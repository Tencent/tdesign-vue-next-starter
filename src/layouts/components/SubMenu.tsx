import { defineComponent, PropType, computed } from 'vue';
import { PREFIX as prefix } from '@/config/global';
import { MenuRoute } from '@/interface';

const getMenuList = (list: MenuRoute[], basePath?: string): MenuRoute[] => {
  if (!list) {
    return [];
  }
  return list.map((item) => {
    const path = basePath ? `${basePath}/${item.path}` : item.path;
    return {
      path,
      title: item.meta?.title,
      icon: item.meta?.icon || '',
      children: getMenuList(item.children, path),
      meta: item.meta,
      redirect: item.redirect,
    };
  });
};

const useRenderNav = (list: Array<MenuRoute>) => {
  return list.map((item) => {
    if (!item.children || !item.children.length || item.meta?.single) {
      return (
        <t-menu-item
          name={item.path}
          value={item.meta?.single ? item.redirect : item.path}
          to={item.path}
          icon={() => item.icon && <t-icon name={item.icon} />}
        >
          {item.title}
        </t-menu-item>
      );
    }
    return (
      <t-submenu
        name={item.path}
        value={item.path}
        title={item.title}
        icon={() => item.icon && <t-icon name={item.icon} />}
      >
        {item.children && useRenderNav(item.children)}
      </t-submenu>
    );
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
