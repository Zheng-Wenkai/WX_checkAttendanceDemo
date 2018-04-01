var recordsData = require('../../data/records-data.js')

Page({
    data: {
        searchPanelShow: false
    },
    onCancelImgTap: function (event) {
        this.setData({
            searchPanelShow: false
        })
    },
    onBindFoucs: function (event) {
        this.setData({
            searchPanelShow: true
        })
    },
    onBindconfirm: function (event) {
        var text = event.detail.value;
        // var searchUrl = ?=" + text;
        //传输给服务器的搜索框文本
        this.setData({
            records_key: recordsData.recordsList
        })
    }

})