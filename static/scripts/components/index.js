//1-主页组件
var home=Vue.component('home',{
	template:`
		<div>
			<h1>我是首页</h1>
			
		</div>
		
	`,
	data(){
		return {
			
		}
	},
	methods: {
		
	}
});

//产品分类页
var productCate=Vue.component('product-cate',{
	template:`
		<h1>我是产品分类页</h1>
	`,
	data(){
		return {
			pageDatas:[
				{Id:'001',CateName:'产品类别一',OrderNum:1},
				{Id:'002',CateName:'产品类别二',OrderNum:2},
				{Id:'003',CateName:'产品类别三',OrderNum:3}
			]
		}
	}
});

//产品列表页
var productList=Vue.component('product-list',{
	template:`
		<h1>我是产品列表页</h1>
	`,
	data(){
		return {}
	}
});