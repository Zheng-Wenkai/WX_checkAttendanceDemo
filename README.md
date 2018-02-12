# 微信小程序_考勤管理Demo

这是一个微信小程序的考勤管理Demo，包括前后端及数据库等内容。如有错误或建议，欢迎指出。

前端：微信小程序框架（https://mp.weixin.qq.com/debug/wxadoc/dev/index.html）

后端：koa框架（基于express的新一代框架，https://koa.bootcss.com/）

平台：Node.js

数据库：Mysql，使用knex框架进行操作（http://knexjs.org/）

初始账户：admin，初始密码：admin

使用koa框架和knex框架从而适应微信提供的wafer1（https://github.com/tencentyun/wafer）和wafer2（https://github.com/tencentyun/wafer2-quickstart）解决方案

附加说明：由于地图页中涉及隐私问题，故demo中将图片替换为中国地图。用户可根据自己的需要，替换掉app/image/map.png

# 需求分析

![image](https://github.com/Zheng-Wenkai/WX_checkAttendanceDemo/blob/master/imageToIntroduce/analyse.png)

# UI设计

### 登录页：

![image](https://github.com/Zheng-Wenkai/WX_checkAttendanceDemo/blob/master/imageToIntroduce/login.png)

### 首页：

![image](https://github.com/Zheng-Wenkai/WX_checkAttendanceDemo/blob/master/imageToIntroduce/index.png)


### 签到页：

![image](https://github.com/Zheng-Wenkai/WX_checkAttendanceDemo/blob/master/imageToIntroduce/sign.png)

### 考勤页：

![image](https://github.com/Zheng-Wenkai/WX_checkAttendanceDemo/blob/master/imageToIntroduce/check.png)

### 地图：

由于考虑到隐私问题，故不显示该页面。用户可在demo中替换成自己需要的图片。

### 人员制度：

![image](https://github.com/Zheng-Wenkai/WX_checkAttendanceDemo/blob/master/imageToIntroduce/rules.png)

### 考勤标准：

![image](https://github.com/Zheng-Wenkai/WX_checkAttendanceDemo/blob/master/imageToIntroduce/standard.png)


### 长期反馈：

![image](https://github.com/Zheng-Wenkai/WX_checkAttendanceDemo/blob/master/imageToIntroduce/feedback.png)
