// var recordsData = require('../../data/records-data.js')
const util = require('../../utils/util');
const config = require('../../config.js');
Page({
  data: {
    records_key: null,
    searchPanelShow: false,
  },
  onCancelImgTap: function (event) {
    this.setData({
      searchPanelShow: false,
    })
  },
  onBindFoucs: function (event) {
    this.setData({
      searchPanelShow: true
    })
  },
  onBindconfirm: function (e) {
    console.log(e.detail.value)
    var that=this
    wx.request({
      url: config.service.searchUrl,
      data: {
        dateInfo: e.detail.value
      },
      method: 'Get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        if (res.data == '') {
          util.showModel('获取考勤信息失败', '不存在该考勤');
        }
        else {
          //传输给服务器的搜索框文本
          that.setData({
            records_key: res.data
          })
        }
      },
      fail: function (res) {
        console.log(res);
        util.showModel('获取考勤信息失败', '请检查网络连接是否正常');
      },
    })
    // var searchUrl = ?=" + text;
    //传输给服务器的搜索框文本
    // this.setData({
    //     records_key: recordsData.recordsList
    // })
  }

})