const service=require('../services/user')
const passport=require('../auth/passport')

module.exports={
  /*
  取所有用户列表
  */
  getall:async(ctx,next)=>{

  },
  getUserById:async(ctx,next)=>{
    let {id}=ctx.params;
    let data=await service.getUserById(id);
    ctx.response.body={
      status:200,
      msg:'',
      data:data?data:[]
    };
  },
  getUserByNameAndPass:async(ctx)=>{
    // return passport.authenticate('local',function(err,user,info,status){
    //   if(user===false){
    //     ctx.body={
    //       status:100,
    //       msg:'用户名或密码错误'
    //     }
    //   }else{
    //     ctx.body={
    //       status:200,
    //       msg:'登录成功'
    //     }
    //     return ctx.login(user)
    //   }
    //   // let data=await service.getUserByNameAndPass(username,password);
    //   // console.log('service返回的用户数据',data);
    //   // ctx.response.body={
    //   //   status:data?200:100,
    //   //   msg:data?'':'用户名或密码错误',
    //   //   data:data?data:[]
    //   // };
    // })(ctx)    
    // 会调用策略
    return passport.authenticate('local',function(err, user, info, status) {
      if(user===false){
        ctx.body={
          status:100,
          msg:'用户名或密码错误'
        }
      }else{
        ctx.body={
          status:200,
          msg:'登录成功'
        }
        return ctx.login(user)
      }
    })(ctx)
  }
}
