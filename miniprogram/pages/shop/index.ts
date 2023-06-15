import { request } from "../../utils/net";

// pages/shop/index.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
        shops:{}as any
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        var _this = this
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('acceptDataFromOpenerPage', function (data) {
            console.log(data);
            const dataInfo = data.data
            _this.setData({ shops: dataInfo })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },
    login(e:any){
        // passport
      console.log(e.currentTarget.dataset.id);
      request({
        url:"/api/boss/login",
        method: "POST",
        data:{
            passport:this.data.shops.passport,
            shop_id:e.currentTarget.dataset.id
        },
        success: (data:any) => {
            console.log(data);
            getApp().globalData.token=data.data.token;
            getApp().globalData.shopName=data.data.shop_name;
            wx.switchTab({
                url:"/pages/order/order"
            })
        },
        fail: () => {
            this.setData({ loading: false });
        },
    });
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})