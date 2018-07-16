const app = getApp();
const util = require('../../utils/util');
const config = require('../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    person_one: null,
    person_two: null,
    team_name: null,
    team_state: null,
    rule_1: null,
    rule_2: null,
    rule_3: null,
    rule_4: null,
    rule_5: null,
    rule_6: null,
    rule_7: null,
    rule_8: null,
    rule_9: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var mapId = options.id;
    var that = this;//要在request里修改数据只能用that，且that的结果不会影响到this，但wxml中的data是最后一次修改的结果
    wx.request({
      url: config.service.mapUrl,
      method: 'Get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          team_name: res.data[mapId].teamName
        })
      },
      fail: function (res) {
        console.log(res);
      },
    })

  },



  // getTeam: function (e) {
  //   this.setData({
  //     team_name: e.detail.value
  //   })
  // },
  // 监听单选框
  // radioChange_1: function (e) {
  //   console.log('radio发生change事件，携带value值为：', e.detail.value)
  //   var items = this.data.items_1;
  //   for (var i = 0, len = items.length; i < len; ++i) {
  //     items[i].checked = items[i].value == e.detail.value
  //   }
  //   this.setData({
  //     items_1: items
  //   });
  // },
  // 监听多选框
  // checkboxChange_2: function (e) {
  //   console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  //   var items = this.data.items_2, values = e.detail.value;
  //   for (var i = 0, lenI = items.length; i < lenI; ++i) {
  //     items[i].checked = false;
  //     for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
  //       if (items[i].value == values[j]) {
  //         items[i].checked = true;
  //         break
  //       }
  //     }
  //   }

  //   this.setData({
  //     items_2: items
  //   })
  // },
  formSubmit: function (e) {
    var that=this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(e.detail.value.team_state + e.detail.value.present_num)
    if (e.detail.value.team_state == "" || e.detail.value.rule_1 == "" || e.detail.value.rule_2 == "" || e.detail.value.rule_3 == "" || e.detail.value.rule_4 == "" || e.detail.value.rule_5 == "" || e.detail.value.rule_6 == "" || e.detail.value.rule_7 == "" || e.detail.value.rule_8 == "" || e.detail.value.rule_9 == "" ){
      util.showModel('无法提交','请将表单信息填写完整');
    }
    else{
      util.showBusy('正在提交');
      wx.request({
        url: config.service.checkUrl,
        data: {
          person_one: app.globalData.person_one,
          person_two: app.globalData.person_two,
          team_name: that.data.team_name,
          team_state: e.detail.value.team_state + e.detail.value.present_num,
          rule_1: e.detail.value.rule_1,
          rule_2: e.detail.value.rule_2,
          rule_3: e.detail.value.rule_3,
          rule_4: e.detail.value.rule_4,
          rule_5: e.detail.value.rule_5,
          rule_6: e.detail.value.rule_6,
          rule_7: e.detail.value.rule_7,
          rule_8: e.detail.value.rule_8,
          rule_9: e.detail.value.rule_9,
        },
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          wx.navigateBack({
            
          })
          util.showSuccess('提交成功');
        },
        fail:function(res){
          util.showModel('提交失败', '请检查你的网络连接是否正确');
        }
      })
    }
    
  },
  formReset: function () {
    console.log('form发生了reset事件')
    util.showSuccess('重置成功');
  },
  getHelp: function () {
    wx.navigateTo({
      url: '../standard/standard',
    })
  },
})