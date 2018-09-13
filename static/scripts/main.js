//路由配置
const routes = [
    { path: '/', component: home,name:'首页' },
    { path: '/product-cate', component: productCate,name:'产品分类管理' },
    { path: '/product-list', component: productList,name:'产品管理' },
]
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

//Vue实例
var app=new Vue({
	el:'#app',
	router,
	store,
	data:{
		isCollapse: false,
		dialogs:[
			{header:'images/b_header.jpg',content:'我有一个Style样式需要您帮忙处理以下。',time:'3'},
			{header:'images/b_header.jpg',content:'中午一起吃个饭吧，我请客。',time:'15'},
			{header:'images/b_header.jpg',content:'需要处理一下POP展示的白边样式。',time:'18'},
			{header:'images/b_header.jpg',content:'下午3点开需求会议，准时参加。',time:'24'},
			{header:'images/b_header.jpg',content:'晚上我开车送你回家，你请我吃晚饭。',time:'45'},
		],
		//defaultTab:'product-cate'   //默认tab(测试)
	},
	mounted () {
      // 刷新时以当前路由做为tab加入tabs
      if (this.$route.path !== '/' && this.$route.path.indexOf('userInfo') == -1) {
        this.$store.commit('add_tabs', {route: '/', name: '首页'});
        this.$store.commit('add_tabs', {route: this.$route.path , name: this.$route.name });
        this.$store.commit('set_active_index', this.$route.path);
      } else {
        this.$store.commit('add_tabs', {route: '/', name: '首页'});
        this.$store.commit('set_active_index', '/');
        this.$router.push('/');
      }
    },
	methods:{
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
		toggleCallapse(){  //左侧菜单的展开和折叠
			this.isCollapse=!this.isCollapse;
		},		
		// tab切换时，动态的切换路由
		tabClick (tab) {
			//console.log(tab);
		    // 用户详情页的时候，对应了二级路由，需要拼接添加第二级路由
		    //if (this.activeIndex === '/userInfo') {
			//    path = this.activeIndex + '/' + this.$store.state.userInfo.name;
		    //}
			var activeItem=this.$store.state.options.find(c=>c.name==tab.name);
			this.$store.commit('set_active_index',activeItem.route);
		    this.$router.push({path: activeItem.route});
		},
        removeTab(targetName) {
			// 首页不可删除
			if(targetName == '首页') {
				return;
			}
			var activeItem=this.$store.state.options.find(c=>c.name==targetName);
			this.$store.commit('delete_tabs',activeItem.route);
			if(this.activeName===targetName){
				//设置当前激活的路由
				if(this.options && this.options.length>=1){
					this.$store.commit('set_active_index',this.options[this.options.length-1].route);
					this.$router.push({path:this.activeIndex});
				}else{
					this.$router.push({path:'/'});
				}
			}
		},
		logout() {  //退出登录
            axios.post('/logout').then(function () {
                window.location.replace('/login');
            });
        }
	},
	computed: {
		options () {
			return this.$store.state.options;
		},
		activeIndex: {
		    get () {
				console.log(this.$store.state.activeIndex);
			    return this.$store.state.activeIndex;
		    },
		    set (val) {
			    this.$store.commit('set_active_index', val);
		    }
		},
		activeName(){
			return this.$store.state.activeName;
		}
	},
	watch: {
		'$route'(to) {
			let flag = false;
			for (let option of this.options ) {
				if (option.name === to.name) {
				    flag = true;
				    this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
				    break
				}
			}
		    if (!flag) {
			    this.$store.commit('add_tabs', {route: '/' + to.path.split('/')[1], name: to.name});
				this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
			}
		}
    }
});