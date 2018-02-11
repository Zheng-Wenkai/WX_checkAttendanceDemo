const config=require('../config');

module.exports = async (ctx, next) => {
    // 连接数据库
    const knex = require('knex')(config.db);
    // 定义和创建数据表
    await knex.schema.createTableIfNotExists(config.fdbName, function (table) {
        table.string('team_name');
        table.text('advice1');
        table.text('advice2');
        table.text('advice3');
    })
        .then(function (res) {
            console.log("bulid feedback model success");
        })
        .catch(function (e) {
            console.error(e);
        });
    return knex;
};