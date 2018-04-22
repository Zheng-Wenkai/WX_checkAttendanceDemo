const Router = require('koa-router');
const controllers=require('../controllers/controllers');
const router = new Router();
router.get('/', controllers.hello);
// 提交考勤信息
router.post('/sinsert', controllers.sinsert);
//router.get('/selectAll', controllers.selectAll);
// 提交长期反馈信息
router.post('/finsert',controllers.finsert);
router.get('/searchRecords',controllers.searchRecords)
module.exports=router;
