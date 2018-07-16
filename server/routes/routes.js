const Router = require('koa-router');
const controllers=require('../controllers/controllers');
const router = new Router({
    prefix: '/AieCheckAttendance'
});
router.get('/', controllers.hello);

// 提交考勤信息
router.post('/cinsert', controllers.cinsert);
// 提交长期反馈信息
router.post('/finsert',controllers.finsert);
// 查询考勤记录
router.get('/searchRecords',controllers.searchRecords);
// 获取地图信息
router.get('/getMapInfo',controllers.getMapInfo);
module.exports=router;
