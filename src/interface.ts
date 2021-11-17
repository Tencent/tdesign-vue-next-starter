export interface ResDataType {
  code: number,
  data: any
}

export interface MenuRoute {
  path: string;
  title?: string;
  icon?: string;
  children: MenuRoute[];
}
