const Router=require('koa-router')
const todoController=require('../controllers/todo')
const userController=require('../controllers/user')
const adminController=require('../controllers/admin')

//加入 koa-passport身份验证
const passport=require('koa-passport')


module.exports= (app)=>{
  const router=new Router();
  const apiRouter=new Router();

  //页面路由
  router.get('/', async(ctx,next)=>{
    var vm={
      title:'首页'
    }
    await ctx.render('index',vm)
  })

  router.get('/todo',todoController.index)    //todo页面

  router.get('/login',async(ctx,next)=>{      //登录页面    
    var vm={
      title:'登录'
    }
    await ctx.render('login',vm)
  })
  //用户登录验证
  router.post('/login/ValidateLogin',userController.getUserByNameAndPass)
  router.post('/logout',userController.logout)

  //后台管理首页
  router.get('/admin',adminController.indexPage)
  


  //api数据接口路由
  apiRouter.get('/todo/getall/:userid?',todoController.getall)   //userid参数可选
  apiRouter.post('/todo/addtodo',todoController.addtodo)
  apiRouter.post('/todo/edittodo',todoController.edittodo)
  apiRouter.post('/todo/delete',todoController.delete)
  apiRouter.post('/todo/reverseComplete',todoController.reverseComplete)   //完成和未完成状态的相互取反


  //设定api路由为子router的子路由
  router.use('/api',apiRouter.routes(),apiRouter.allowedMethods())

  //如果匹配不到路由则返回404
  router.all('/*',async(ctx,next)=>{
    ctx.response.status=404;
    ctx.response.body=`<h1>~~page not found!</h1>`
  })
  app.use(router.routes()).use(router.allowedMethods())
}
