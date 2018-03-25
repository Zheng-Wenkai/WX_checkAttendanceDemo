var recordsData = require('../../data/records-data.js')

Page({
    onLoad:function(event){
        this.setData({
            records_key: recordsData.recordsList
        })
    }
})