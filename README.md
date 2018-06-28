# koa2-mysql-simple
> 基于 koa + mysql 实现的(简单)登录注册

### 项目目录 

    -lib
        -default-config.js  // 默认配置项
        -mysql.js  // 连接数据库等一些方法
    -routers
        -index.js  // 路由
    -static  // 静态文件
    -views
        -index.html  // 主页
        -login.html  // 登录
        -register.html  // 注册
    -app.js  // 入口文件

### 测试

```bash
git clone git@github.com:ACGN666/koa2-mysql-simple.git

cd koa2-mysql-simple

npm install

node app.js

打开 http://localhost:3000
```

**注意**

    * 测试之前先配置 【lib】-> 【default.js】中的数据库信息