const mongoose=require('mongoose')
const Schema=require('../dbhelper.js')

//{"id":5,"title":"看电影","desc":"这周把预约的电影票用掉","addtime":"2018-09-10 09:20:15","complete":true,"userid":1}

const TodoSchema=new Schema({
  title:String,
  desc:String,
  addtime:String,
  complete:{
    type:Boolean,
    default:false
  },
  userid:Number
},{versionKey:false})
//{versionKey:false}是不让产生 __v字段

var TodoModel=mongoose.model('Todo',TodoSchema)

module.exports=TodoModel
