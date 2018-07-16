const config=require('../config');
module.exports=async (ctx, next) => {
    // 连接数据库
    const knex = require('knex')(config.db);
    // 定义和创建数据表
    await knex.schema.createTableIfNotExists(config.cdbName, function (table) {
        table.string('person_one');
        table.string('person_two');
        table.string('team_name');
        table.string('team_state');
        table.float('rule_1');
        table.float('rule_2');
        table.float('rule_3');
        table.float('rule_4');
        table.float('rule_5');
        table.float('rule_6');
        table.float('rule_7');
        table.float('rule_8');
        table.float('rule_9');
        table.float('score');
        table.string('date');
        table.string('time');
    })
        .then(function(res) {
            console.log("build check model success");
        })
        .catch(function(e) {
        console.error(e);
        });
    return knex;
};