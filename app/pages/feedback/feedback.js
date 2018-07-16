const config = require('../../config.js');
const util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    team_name:null,
    advice1:null,
    advice2: null,
    advice3: null,
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
  fHandin: function () {
    var that = this;
    wx.request({
      url: config.service.feedbackUrl,
      data: {
        team_name: that.data.team_name,
        advice1: that.data.advice1,
        advice2: that.data.advice2,
        advice3: that.data.advice3
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        util.showSuccess('提交成功');
      },
      fail: function (res) {
        util.showModel('提交失败', '请检查你的网络连接是否正确');
      }
    })
  },
  getTeam: function (e) {
    this.setData({
      team_name: e.detail.value
    })
  },
  getAdvice1: function (e) {
    this.setData({
      advice1: e.detail.value
    })
  },
  getAdvice2: function (e) {
    this.setData({
      advice2: e.detail.value
    })
  },
  getAdvice3: function (e) {
    this.setData({
      advice3: e.detail.value
    })
  },
})