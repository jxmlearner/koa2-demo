const service=require('../services/todo')

module.exports={
  index:async(ctx,next)=>{
    var vm={
      title:'TODO页'
    }
    await ctx.render('todo',vm)
  },
  /*
  取所有todo列表
  */
  getall:async(ctx,next)=>{
    let {userid}=ctx.params;
    let data=await service.getall(userid);
    ctx.response.body={
      status:200,
      msg:'',
      data:data?data:[]
    };
  },
  addtodo:async(ctx,next)=>{
    let todo=ctx.request.body;
    console.log(todo);
    let data=await service.addtodo(todo);
    global.log.desc = `增加了一条新的todo:${JSON.stringify(data)}`
    ctx.response.body={
      status:200,
      msg:'',
      data:data
    };
  },
  edittodo:async(ctx,next)=>{
    let todo=ctx.request.body;
    console.log(todo);
    let flag=await service.edittodo(todo);
    if(flag){
      global.log.desc = `修改了todo:${JSON.stringify(todo)}`
    }
    ctx.response.body={
      status:flag?200:100,
      msg:flag?'修改成功':'修改失败',
      data:null
    }
  },
  delete:async(ctx,next)=>{
    let {id}=ctx.request.body;
    console.log('要删除项Id',id);
    let flag=await service.delete(id);
    ctx.response.body={
      status:flag?200:100,
      msg:flag?'删除成功':'删除失败'
    }
  },
  reverseComplete:async(ctx,next)=>{
    let {id}=ctx.request.body;
    let flag=await service.reverseComplete(id);
    ctx.response.body={
      status:flag?200:100,
      msg:flag?'成功':'失败'
    }
  }
}
