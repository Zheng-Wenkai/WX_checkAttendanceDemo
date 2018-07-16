// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'http://127.0.0.1:5757/AieCheckAttendance';
const config = {

  service: {
    // 提交考勤信息
    checkUrl: `${host}/cinsert`,

    // 提交长期反馈信息
    feedbackUrl: `${host}/finsert`,

    // 查询考勤记录
    searchUrl: `${host}/searchRecords`,

    // 获取地图信息
    mapUrl: `${host}/getMapInfo`
  }
};

module.exports = config;