var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.0.237:27017/test', {useNewUrlParser:true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('连接成功！端口')
});
