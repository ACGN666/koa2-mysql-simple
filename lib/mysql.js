const mysql = require('mysql');
const config = require('./default-config');

const pool = mysql.createPool({
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
});

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    connection.release();
                });
            }
        });
    });
}

const userinfo =
    `create table if not exists userinfo(
        id BIGINT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        password VARCHAR(40) NOT NULL,
        PRIMARY KEY ( id )
    );`

const createTable = (sql) => {
    return query(sql, []);
}

//建表
//createTable(userinfo);

/**
 * 查询所有用户名
 */
const findUser = () => {
    let sql = `SELECT name FROM userinfo`;
    return query(sql);
}

/**
 * 查询用户名是否已存在
 * @param {string} name 用户名
 */
const findName = (name) => {
    let sql = `SELECT * FROM userinfo WHERE name='${name}'`;
    return query(sql);
}

/**
 * 插入用户
 * @param {string} name 用户名
 * @param {string} pass 密码
 */
const insert = (name, pass) => {
    let sql = `INSERT INTO userinfo(name,password) VALUES ('${name}','${pass}')`;
    return query(sql);
}

module.exports = {
    findUser,
    insert,
    findName,
    insert,
}