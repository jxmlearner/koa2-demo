const OpLogService=require('../services/operationlog')

class OpLogController{
  static async add(content){
    await OpLogService.add(content)
  }

  static async getpagelog(ctx){
    let opt=ctx.request.query
    let {page=1,size=10,...condition}= opt
    let {rows,total} =await OpLogService.getpagelog(condition,Number(page),Number(size))
    ctx.response.body={
      status:200,
      data:rows,
      msg:'获取成功',
      total,
      page,
      size
    }
  }
}

module.exports=OpLogController
