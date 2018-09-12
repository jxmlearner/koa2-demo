const User=require('../db/schemas/user')

module.exports={
  getUserById:async (id)=>{   //根据用户id获取用户信息
    var user;
    await User.findById(id).then(d=>{
      user=d;
    });
    return user;
  },
  async getUserByNameAndPass(username,password){    //根据用户名和密码获取用户
    var user;
    await User.findOne({username,password}).then(d=>{
      user=d;
    })
    return user;
  },
  async addUser(user){   //增加新用户
    var addUser=new User(user);
    var res;
    await addUser.save().then(d=>{
      res=d;
    });
    return res;
  },
  async editUser(user){  //修改用户信息
    var flag=false;
    //如下方式可以指定更新单个或某几个字段
    await User.findByIdAndUpdate(user._id,{$set:{user.username,user.password,user.headpic,user.lastlogintime}}).then(d=>{
      flag=true;
    });
    return flag;
  },
  delete:async(id)=>{
    var flag=false;
    await User.remove({_id:id}).then(data=>{
      flag=true;
    })
    return flag;
  },
}
