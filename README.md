# 学习Nodejs

1 npm init -y
```
const Koa=require('koa')
const app=new Koa()

app.use(async (ctx,next)=>{
    ctx.body='Node 学习'
})

app.listen(4455,()=>{
    console.log(`✅ server is running at http://localhost:4455`)
})
```
2、安装koa
npm i koa -S --registry=https://registry.npm.taobao.org

3、配置启动  package.json
```
"scripts": {
    "start":"node server/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
4、git提交代码
```
git add .
git status        --查看哪些文件被加到了缓冲区
git commit -m '初始化koa2项目'  --提交到分支
git push origin master
```
5、安装 ejs
```
cnpm i ejs -S
```
6、安装 koa-views
```
cnpm i koa-views -S
```



