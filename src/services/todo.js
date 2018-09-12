//先使用json静态数据
//const todos=require('../../static/jsonData/todo.json')
const Todo=require('../db/schemas/todo')

module.exports={
  /*
  取所有的todo数据
  */
  getall:async(userid)=>{
    // if(userid){
    //   var filterData=todos.filter(u=>u.userid==userid);
    //   return filterData;
    // }
    // return todos;
    var query=Todo.find(userid?{userid}:{},{"__v":0});    //不查询显示__v字段
    var res=[];
    await query.exec().then(data=>{
        res=data;
    }).catch(err=>{
      console.log('获取数据出错了',err);
    });
    return res;
  },
  addtodo:async(todo)=>{
    //todo.id=todos.length+1;
    //todo: 将todo添加到数据库中
    //todos.push(todo);
    var addTodo=new Todo({
      title:todo.title,
      desc:todo.desc,
      addtime:todo.addtime,   //应该统一用服务器端的时间
      complete:false,
      userid:1
    });
    var res={};
    await addTodo.save().then(data=>{
      res=data;
    });
    return res;
  },
  edittodo:async(todo)=>{
    var flag=false;
    //如下方式可以指定更新单个或某几个字段
    await Todo.findByIdAndUpdate(todo._id,{$set:todo}).then(d=>{
      flag=true;
    });
    //或者用如下的方式
    //var editTodo=new Todo(todo)
    //await editTodo.save().then(d=>flag=true) //不指定字段的全量更新
    return flag;
  },
  delete:async(id)=>{
    var flag=false;
    await Todo.remove({_id:id}).then(data=>{
      flag=true;
    })
    return flag;
  },
  reverseComplete:async(id)=>{       //完成状态取反
    var todo;
    let flag=false;
    await Todo.findById(id).then(d=>{
      todo=d;
    });
    console.log(todo);
    todo.complete=!todo.complete;
    await todo.save().then(d=>flag=true)
    return flag;
  }
}
