var mapData = require('../../data/map-data.js')

Page({
  onLoad: function (options) {
      var maps_key = mapData.mapList;
      var position = new Array();
      for(var i = 0, k = 0;i < 9;i++){
            position.push([maps_key[k++], maps_key[k++], maps_key[k++]])
      }
    this.setData({
        map_key:position,
        maps_key: maps_key
    })



  },

    onCheckTap:function(event){
        var mapId = event.currentTarget.dataset.mapid;
        wx.navigateTo({
            url: '/pages/check/check?id=' + mapId,
        })
  }, data: {
      array: [{
          message: ['foo','bar1'] ,
      }, {
              message: ['foo', 'bar2']
      }]
  }

    
})
