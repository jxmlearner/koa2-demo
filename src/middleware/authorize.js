//有些页面需要登录了才能访问，统一用中间件来控制

const needAuthPage=[/^\/admin/i,/^\/todo/i]  //需要登录才可以访问的url地址,这里使用了简单的正则数组

module.exports=async (ctx,next)=>{
    var url=ctx.request.url;
    if(needAuthPage.length){
        var flag=false;
        for(var reg of needAuthPage){
            if(reg.test(url)){
                flag=true;  //如果匹配到是要登录才能访问的页面
                break;
            }
        }
        if(flag){
            if(ctx.isAuthenticated()){  //如果已经登录
                await next()
            }else{  //如果没有登录，跳转到登录页面
                console.log('用户没有登录正在访问：'+url);
                ctx.redirect('/login');
            }
        }else{  //无需登录就可访问的页面，直接 await next()
            await next();
        }
    }
}