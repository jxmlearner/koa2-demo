module.exports = {
    indexPage: async (ctx, next) => {

        console.log('当前登录用户：',ctx.req.user)
        //后台管理布局页面
        var vm = {
            title: '后台管理'
        }
        await ctx.render('admin', vm)
    }
}