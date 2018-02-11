const app = getApp();
const util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    person_one:null,
    person_two:null
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
  getPerson1: function (e) {
    this.setData({
      person_one: e.detail.value
    })
  },
  getPerson2: function (e) {
    this.setData({
      person_two: e.detail.value
    })
  },
  sHandin: function (e) {
    if (this.data.person_one != null || this.data.person_two != null) {
      app.globalData.person_one = this.data.person_one;
      app.globalData.person_two = this.data.person_two;
      util.showSuccess('签到成功');
      wx.navigateBack({
        delta: 1
      })
    }
    else {
      util.showModel('签到失败','考勤人员不能为空');
    }
  }
})