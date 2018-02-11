const util=require('../../utils/util');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password:null,
    username:null
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
  getUsername: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  getPassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  loginClick: function (e) {
    app.globalData.userInfo = { username: this.data.username, password: this.data.password }
    if (app.globalData.userInfo.username == 'admin' && app.globalData.userInfo.password == 'admin') {
      util.showSuccess('登录成功');
      wx.redirectTo({
        url: '../index/index',
      })
    }
    else {
      util.showModel('登录失败','账户或密码错误');
      this.setData({
        username: app.globalData.userInfo.username
      })
    } 
  }
})