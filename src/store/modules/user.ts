import request from '@/utils/request';

// 定义的state初始值
const state = {
  loginName: '',
  deptNameString: '',
};

const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.loginName = userInfo.EngName;
    state.deptNameString = userInfo.DeptNameString;
  },
};

const actions = {
  async getUserInfo(context) {
    try {
      console.log('当前编译环境');
      console.log(process.env.NODE_ENV);

      if (process.env.NODE_ENV === 'development') {
        context.commit('SET_USER_INFO', {
          EngName: 'user_test',
          DeptNameString: '虚拟部门test',
        });
      } else {
        request({
          method: 'get',
          url: '/ts:auth/tauth/info.ashx',
          baseURL: '',
        }).then((res) => {
          context.commit('SET_USER_INFO', res.data);
        });
      }
    } catch (err) {
      console.log(`智能网关获取用户信息错误：${err.message}`);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
