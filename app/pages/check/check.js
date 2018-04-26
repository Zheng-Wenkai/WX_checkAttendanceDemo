var mapData = require('../../data/map-data.js');
const app = getApp();
const util = require('../../utils/util');
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
    this.setData({
      team_name: mapData.mapList[mapId].teamName
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
        url: 'http://127.0.0.1:5757/sinsert',
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
          util.showSuccess('提交成功');
          wx.navigateBack({
            
          })
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