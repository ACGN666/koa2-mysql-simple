const path = require('path');
const Koa = require('koa');
const static = require('koa-static');
const bodyparser = require('koa-bodyparser');
const cors = require('@koa/cors');
const routers = require('./routers/index');

const app = new Koa();

//POST请求.ctx.request.body
app.use(bodyparser());
//Promise based HTTP client for the browser and node.js
app.use(cors());
//静态资源
app.use(static(path.join(__dirname)));

app.use(routers.routes());

app.listen(3000, () => {
    console.log('启动成功：打开 http://localhost:3000/');
});