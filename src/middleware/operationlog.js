//操作日志中间件
//参照：https://blog.csdn.net/dahongdahong/article/details/80084521

const OpLogController=require('../controllers/operationlog')

module.exports=async(ctx,next)=>{
  //不记录get请求
  if(ctx.method==='GET'){
    await next()
  }else{
    global.log={
      username:'admin',
      userid:'u123456',
      method:ctx.request.method,
      host:ctx.request.header.host,
      url:ctx.request.url,
      status:null,
      desc:null
    }
    await next()
    //保存操作日志
    if(global.log.desc){
      global.log.status = ctx.response.status
      OpLogController.add(global.log)  //写入到数据库中
    }
  }
}
