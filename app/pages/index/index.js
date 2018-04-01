const util = require('../../utils/util');
const app = getApp();
Page({
  turnToSign:function(){
    wx.navigateTo({
      url: '../sign/sign',
    })
  },
  turnToCheck: function () {
      util.showMessage('请从团队地图页面进入');
  },
  turnToMap: function () {
      if (app.globalData.person_one != null || app.globalData.person_two != null) {
          wx.navigateTo({
              url: '../map/map',
          })
      }
      else {
          util.showMessage('请先进行签到');
      }
    
  },
  turnToRules: function () {
    wx.navigateTo({
      url: '../rules/rules',
    })
  },
  turnToFeedback: function () {
    if (app.globalData.person_one != null || app.globalData.person_two != null) {
      wx.navigateTo({
        url: '../feedback/feedback',
      })
    }
    else {
      util.showMessage('请先进行签到');
    }
  },
  turnToRecords: function () {
      if (app.globalData.person_one != null || app.globalData.person_two != null) {
          wx.navigateTo({
              url: '../records/record-details',
          })
      }
      else {
          util.showMessage('请先进行签到');
      }
  },
})