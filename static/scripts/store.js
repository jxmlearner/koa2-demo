// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)

/**
 * Vuex全局状态管理
 * @param options {Array} 用于渲染tabs的数组
 */
const store = new Vuex.Store({
  state: {
      options: [],
      activeIndex: '/',
	    activeName:'首页',
      userInfo: {}
  },
  mutations: {
    // 添加tabs
    add_tabs (state, data) {
      this.state.options.push(data);
    },
    // 删除tabs
    delete_tabs (state, route) {
      let index = 0;
      for (let option of state.options) {
        if (option.route === route) {
          break;
        }
        index++;
      }
      this.state.options.splice(index, 1);
    },
    // 设置当前激活的tab
    set_active_index (state, index) {
      this.state.activeIndex = index;
	    var activeItem=this.state.options.find(item=>item.route==index);
	    this.state.activeName=activeItem.name;
    },
    // 设置详情信息
    save_detail_info (state, info) {
      this.state.userInfo = info;
    }
  }
});