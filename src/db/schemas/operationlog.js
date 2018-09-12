//操作日志
const mongoose=require('mongoose')
const Schema=require('../dbhelper.js')

const OperationLogSchema=new Schema({
  //index: Number,
  username: String,
  userid: String,
  date: {type: Date, default: Date.now},
  // request
  method: String,
  host: String,
  url: String,
  // response
  status: Number,
  desc: String
},{versionKey:false})
//{versionKey:false}是不让产生 __v字段

var OperationLog=mongoose.model('OperationLog',OperationLogSchema)

module.exports=OperationLog
