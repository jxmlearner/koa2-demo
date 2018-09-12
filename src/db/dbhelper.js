const mongoose = require('mongoose')
mongoose.connect('mongodb://192.168.0.237:27017/test', {useNewUrlParser:true})
mongoose.Promise = global.Promise
const Schema = mongoose.Schema


var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  //连接成功
  console.log('数据库连接成功');
  //查找数据库中有没有用户，如果没有则新加入一个用户数据
  
});

module.exports = Schema
