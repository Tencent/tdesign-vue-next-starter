import { defineComponent, PropType, computed, h } from 'vue';
import { prefix } from '@/config/global';
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

const renderIcon = (item) => {
  if (typeof item.icon === 'string') {
    return () => item.icon && <t-icon name={item.icon}></t-icon>;
  }
  if (item.icon && typeof item.icon.render === 'function') {
    return () =>
      h(item.icon.render(), {
        class: 't-icon',
      });
  }
  return () => '';
};

const useRenderNav = (list: Array<MenuRoute>) => {
  return list.map((item) => {
    if (!item.children || !item.children.length || item.meta?.single) {
      return (
        <t-menu-item
          name={item.path}
          value={item.meta?.single ? item.redirect : item.path}
          to={item.path}
          icon={renderIcon(item)}
        >
          {item.title}
        </t-menu-item>
      );
    }
    return (
      <t-submenu name={item.path} value={item.path} title={item.title} icon={renderIcon(item)}>
        {item.children && useRenderNav(item.children)}
      </t-submenu>
    );
  });
};

export default defineComponent({
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
