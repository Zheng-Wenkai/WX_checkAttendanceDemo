const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const config=require('./config');

// 加载数据库
const feedbackModel = require('./models/feedbackModel');
const fdb = feedbackModel();
const signModel=require('./models/signModel');
const sdb=signModel();

const app = new Koa();
app.use(bodyParser());
const router=require('./routes/routes');
app.use(router.routes());
app.listen(config.port,function(){
    console.log('started http://localhost:'+config.port);
});