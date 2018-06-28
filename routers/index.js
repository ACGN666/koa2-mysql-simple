const fs = require('fs');
const router = require('koa-router')();
const userModel = require('./../lib/mysql');
const md5 = require('md5');

// 访问 / 跳转到index
router.get('/', async (ctx, next) => {
    ctx.redirect('/views/index.html');
});

// 查询所有的用户
router.get('/userData', async (ctx, next) => {
    await userModel.findUser()
        .then(result => {
            console.log(result.length);
            if (result.length) {
                ctx.body = {
                    data: 0,
                    total: result.length,
                    name: result,
                    msg: '查询成功',
                }
            } else {
                try {
                    throw Error('暂时没有注册用户');
                } catch (error) {
                    console.log(error);
                }
                ctx.body = {
                    data: 2,
                    msg: '暂时没有注册用户'
                }
            }
        });
});

//注册 (先查询用户是否存在,不存在则插入数据)
router.post('/register', async (ctx, next) => {
    let name = ctx.request.body.name;
    let password = ctx.request.body.password;
    await userModel.findName(name)
        .then(result => {
            if (result.length) {
                try {
                    throw Error('用户已存在');
                } catch (error) {
                    console.log(error);
                }
                ctx.body = {
                    data: 1,
                    msg: '用户已存在'
                }
            } else {
                ctx.body = {
                    data: 0,
                    msg: '注册成功'
                }
                userModel.insert(name, md5(password));
            }
        });
});

//登录
router.post('/login', async (ctx, next) => {
    let name = ctx.request.body.name;
    let password = ctx.request.body.password;
    await userModel.findName(name)
        .then(result => {
            if (result.length) {
                if (md5(password) === result[0].password) {
                    ctx.body = {
                        data: 0,
                        msg: '登录成功'
                    }
                } else {
                    ctx.body = {
                        data: 3,
                        msg: '密码不正确'
                    }
                }
            } else {
                try {
                    throw Error('用户不存在')
                } catch (error) {
                    console.log(error)
                }
                ctx.body = {
                    data: 1,
                    msg: '用户不存在'
                }
            }
        });

});

// 测试路由，读取文件
router.get('/index.html', async ctx => {
    ctx.response.body = fs.createReadStream('./views/index.html');
});

module.exports = router;