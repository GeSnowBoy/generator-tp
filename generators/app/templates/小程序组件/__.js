// pages/index/index.js
var app = getApp();
var ObjectPath = require('../../lib/object-path.js');

Page({
    /**
     * 页面的初始数据
     */
    data: {
        loading: true,
        floorID: '',
        getFloorID: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 记录来源
        this.setData({
            channel_id: options.channel_id || '',
        });

        let that = this;
        app.onThemeReady(theme => {
            let floorID = ObjectPath.get(theme, 'home_page.floor', '');
            console.log(floorID);

            that.setData({ getFloorID: true, floorID: floorID });
        });
    },

    onShow() {
        wx.reportAnalytics('page_index', {
            channel_id: this.data.channel_id,
        });
    },

    onReady: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: 'THOM BROWNE',
            path: '/pages/index/index',
        };
    },

    loaded() {
        this.setData({ loading: false });
    },

    sendStatsClickBanner(e) {
        wx.reportAnalytics('action_click_banner', {
            brand_index: e.currentTarget.dataset.idx,
        });
    },
});
