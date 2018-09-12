//定义策略
const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const User=require('../db/schemas/user')


// 序列化ctx.login()触发
passport.serializeUser(function(user, done) {
  console.log('serializeUser: ', user)
  done(null, user)
})
// 反序列化（请求时，session中存在"passport":{"user":"1"}触发）
passport.deserializeUser(async function(user, done) {
  console.log('deserializeUser: ', user)
  await User.findOne({username:user.username,password:user.password}).then(function(data){
    if(data){
      console.log('deseralize数据库返回数据',data);
      done(null,data)
    }else{
      done(null,false)
    }
  })
})
// 提交数据(策略)
passport.use(new LocalStrategy({
   usernameField: 'username',
   passwordField: 'userpwd'
}, async function(username, password, done) {
  console.log('passport:',username,password)
  await User.findOne({username,password}).then(function(user){
    if(user){
      console.log('验证用户名和密码：',user)
      done(null,user);
    }else{
      done(null,false);
    }
  })
}))


module.exports = passport
