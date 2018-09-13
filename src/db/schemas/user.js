const mongoose=require('mongoose')
const Schema=require('../dbhelper.js')
const bcrypt = require('bcrypt')
const saltSounds=10     //bcrypt生成salt的迭代次数

const UserSchema=new Schema({
  username:String,
  password:String,
  addtime:String,
  headpic:String,  //用户头像，用于模拟文件上传的用法
  lastlogintime: {type: Date, default: Date.now}
},{versionKey:false})
//{versionKey:false}是不让产生 __v字段

UserSchema.pre('save',next=>{
  //如果密码没有修改则直接返回
  if(!this.isMidified('password')) return next()        
  bcrypt.genSalt(saltSounds,(err,salt)=>{
    if(err) return next(err)
    bcrypt.hash(this.password,salt,(error,hash)=>{  //生成salt并获取hash值
      if(error) return next(error)
      this.password=hash
      next()
    })
  })
  next()
})

UserSchema.methods={
  comparePassword:(_password,password)=>{
    return new Promise((resolve,reject)=>{
      bcrypt.compare(_password,password,(err,isMatch)=>{
        if(!err) resolve(isMatch)
        else
          reject(err)
      })
    })
  }
}

var UserModel=mongoose.model('User',UserSchema)

module.exports=UserModel
