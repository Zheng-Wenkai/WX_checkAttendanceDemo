const config=require('../config');
module.exports=async (ctx, next) => {
    // 连接数据库
    const knex = require('knex')(config.db);
    // 定义和创建数据表
    await knex.schema.createTableIfNotExists(config.mdbName, function (table) {
        table.string('teamName');
        table.string('position');
        table.integer('mapId');
        table.string('backgroundColor');
    })
        .then(function(res) {
            console.log("build mapInfo model success");
        })
        .catch(function(e) {
            console.error(e);
        });
    return knex;
};