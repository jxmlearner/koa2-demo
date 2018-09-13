const User=require('./schemas/user')

var user={
  username:'jiang',
  password:'123456',
  addtime:'2018-09-12 16:22:20',
  headpic:''
}
User.insertMany([user],(err,result)=>{
  console.log('初始化用户数据成功！',result)
})