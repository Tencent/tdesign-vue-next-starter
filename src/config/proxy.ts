export default {
  isRequestProxy: true,
  development: {
    // 开发环境接口请求
    host: 'https://service-exndqyuk-1257786608.gz.apigw.tencentcs.com',
    // 开发环境 cdn 路径
    cdn: '',
  },
  test: {
    // 测试环境接口地址
    host: 'https://service-exndqyuk-1257786608.gz.apigw.tencentcs.com',
    // 测试环境 cdn 路径
    cdn: '',
  },
  release: {
    // 正式环境接口地址
    host: 'https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com',
    // 正式环境 cdn 路径
    cdn: '',
  },
};
