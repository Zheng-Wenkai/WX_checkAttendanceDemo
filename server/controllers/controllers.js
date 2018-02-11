const config=require('../config');
// 连接数据库
const knex = require('knex')(config.db);
module.exports={
    hello:async (ctx, next) => {
        return ctx.response.body = 'Hello world';
    },
    sinsert:async (ctx, next) => {
        // ctx是对应koa的，res是对应knex的
        //console.log(ctx.request.body);
        let mydate=new Date();
        let information = {
            person_one: ctx.request.body.person_one,
            person_two: ctx.request.body.person_two,
            team_name: ctx.request.body.team_name,
            team_state: ctx.request.body.team_state,
            rule_1: -parseFloat(ctx.request.body.rule_1),
            rule_2: -parseFloat(ctx.request.body.rule_2),
            rule_3: -parseFloat(ctx.request.body.rule_3),
            rule_4: -parseFloat(ctx.request.body.rule_4),
            rule_5: -parseFloat(ctx.request.body.rule_5),
            rule_6: -parseFloat(ctx.request.body.rule_6),
            rule_7: -parseFloat(ctx.request.body.rule_7),
            rule_8: -parseFloat(ctx.request.body.rule_8),
            rule_9: -parseFloat(ctx.request.body.rule_9),
            date: mydate.toLocaleDateString(),
            time: mydate.toLocaleTimeString(),
            score: 10-(parseFloat(ctx.request.body.rule_1)+parseFloat(ctx.request.body.rule_2)+parseFloat(ctx.request.body.rule_3)+
                parseFloat(ctx.request.body.rule_4)+parseFloat(ctx.request.body.rule_5)+parseFloat(ctx.request.body.rule_6)+
                parseFloat(ctx.request.body.rule_7)+parseFloat(ctx.request.body.rule_8)+parseFloat(ctx.request.body.rule_9)),
        };
        await knex(config.sdbName).insert(information)
            .catch(function(e) {
                console.error(e);
            })
            .then(
                console.log("sign columns insert success")
            );
        console.log(information);
        return ctx.response.body=ctx.request.body;
    },
    // selectAll:async (ctx, next) => {
    //     let data=null;
    //     await knex.select().table(config.sdbName)
    //         .then(function (res) {
    //             data=res;
    //         })
    //         .catch(function(e) {
    //             console.error(e);
    //         });
    //     return ctx.response.body=data;
    // },
    finsert:async (ctx, next) => {
        // ctx是对应koa的，res是对应knex的
        let advice = {
            team_name: ctx.request.body.team_name,
            advice1: ctx.request.body.advice1,
            advice2: ctx.request.body.advice2,
            advice3: ctx.request.body.advice3
        };
        await knex(config.fdbName).insert(ctx.request.body)
            .catch(function (e) {
                console.error(e);
            })
            .then(
                console.log("feedback columns insert success")
            );
        console.log(advice);
        return ctx.response.body = ctx.request.body;
    }
};