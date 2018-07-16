const util = require('../../utils/util');
const config=require('../../config.js');
Page({
  data: {
    maps_key: null,
    map_key: null,
  },
  onLoad: function (options) {
    var that = this;//要在request里修改数据只能用that，且that的结果不会影响到this，但wxml中的data是最后一次修改的结果
    wx.request({
      url: config.service.mapUrl,
      method: 'Get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        console.log('获取地图信息成功');
        var position = new Array();
        for (var i = 0, k = 0; i < 9; i++) {
          position.push([res.data[k++], res.data[k++], res.data[k++]])
        }
        // setData只能使用一次
        that.setData({
          map_key: position,
          maps_key: res.data
        })
      },
      fail: function (res) {
        console.log(res);
        util.showModel('加载失败', '请检查你的网络连接是否正确');
        console.log('获取地图信息失败');
      },
    })
  },
  onCheckTap: function (event) {
    var mapId = event.currentTarget.dataset.mapid;
    wx.navigateTo({
      url: '/pages/check/check?id=' + mapId,//把mapId的数值传到check页
    })
  },
  data: {
    array: [{
      message: ['foo', 'bar1'],
    }, {
      message: ['foo', 'bar2']
    }]
  }
})
