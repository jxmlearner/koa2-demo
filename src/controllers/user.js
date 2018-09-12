const service=require('../services/user')

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
  getUserByNameAndPass:async(ctx,next)=>{
    let {username,password}=ctx.request.body;  //获取post中的数据
    let data=await service.getUserByNameAndPass(username,password);
    ctx.response.body={
      status:200,
      msg:'',
      data:data?data:[]
    };
  }
}
