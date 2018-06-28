/**
 * 默认配置信息
 */
const config = {
//启动端口
    port: 3001,

    //数据库配置
    database: {
        DATABASE: 'nodejsdemo',
        USERNAME: 'root',
        PASSWORD: 'admin',
        PORT: '3306',
        HOST: 'localhost'
    }
}

module.exports = config;