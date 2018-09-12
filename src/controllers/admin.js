module.exports = {
    indexPage: async (ctx, next) => {
        //后台管理布局页面
        var vm = {
            title: '后台管理'
        }
        await ctx.render('admin', vm)
    }
}