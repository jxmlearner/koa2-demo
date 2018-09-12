const OperationLog=require('../db/schemas/operationlog')

class OperationLogService{
  static async add(content){  //日志使用静态方法
    let log=new OperationLog(content)
    await log.save()
  }
  //取操作日志的分页数据
  static async getpagelog(condition,page,size){
    let logs=await OperationLog.find(condition,'_id username date host status desc').skip((page-1)*size).sort({date:-1}).limit(size)
    let count=await OperationLog.count(condition)
    return {rows:logs,total:count,page,size}
  }
}

module.exports=OperationLogService
