const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const config=require('./config');

// 新建数据库（如果已经建好可以去除这段代码）
const feedbackModel = require('./models/feedbackModel');
const fdb = feedbackModel();
const checkModel=require('./models/checkModel');
const cdb=checkModel();
const mapInfoModel=require('./models/mapInfoModel');
const mdb=mapInfoModel();

const app = new Koa();
app.use(bodyParser());
const router=require('./routes/routes');
app.use(router.routes());
app.listen(config.port,function(){
    console.log('started http://localhost:'+config.port);
});