const util = require('../../utils/util');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  turnToSign:function(){
    wx.navigateTo({
      url: '../sign/sign',
    })
  },
  turnToCheck: function () {
    if (app.globalData.person_one != null || app.globalData.person_two != null) {
      wx.navigateTo({
        url: '../check/check',
      })
    }
    else {
      util.showMessage('请先进行签到');
    }
  },
  turnToMap: function () {
    wx.navigateTo({
      url: '../map/map',
    })
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
})