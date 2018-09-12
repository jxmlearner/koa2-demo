const Koa=require('koa')
const path=require('path')
const views=require('koa-views')   //koa-views模板中间件
const cors = require('kcors')       //跨域
const json = require('koa-json')
const koaLogger=require('koa-logger')   //开发日志中间件
const bodyparser = require('koa-bodyparser')
const static = require('koa-static')
const session=require('koa-session')
const passport=require('koa-passport')
const router = require('./router/routes')
//自定义的操作日志中间件
const oplog=require('./middleware/operationlog')



const app=new Koa();

// 静态资源目录对于相对入口文件app.js的路径
app.use(static(path.join( __dirname,  '../static')))

//ejs模板路径
app.use(views(path.join(__dirname, './views'),{
  extension:'ejs'
}))

//auth相关
//sessions
app.keys=['jiang-koa-sessionkey']
app.use(session(app))
//authentication
require('./auth/passport')
app.use(passport.initialize())
app.use(passport.session())


app.use(koaLogger())  //开发日志
app.use(oplog)   //记录操作日志的中间件 --写入到数据库中
app.use(cors())
app.use(json())
app.use(bodyparser())

//加载路由
router(app);

app.listen(3000,()=>{
  console.log('Server is running at port 3000');
})
