const mongoose=require('mongoose')
const Schema=require('../dbhelper.js')

const TodoSchema=new Schema({
  username:String,
  password:String,
  addtime:String,
  headpic:String,  //用户头像，用于模拟文件上传的用法
  lastlogintime: {type: Date, default: Date.now}
},{versionKey:false})
//{versionKey:false}是不让产生 __v字段

var UserModel=mongoose.model('User',TodoSchema)

module.exports=UserModel
