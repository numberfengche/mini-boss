import { request } from "../../utils/net";

// pages/orderDetail/orderDetail.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
        source: {} as any,
        shop: getApp().globalData.shopName,
        trade: {} as any,
        price: "",
        show: false,
        list: [],
        detail: {} as any,
        value: 0,
        foodsprice: 0,
        total: 0,
        trade_id: undefined,
        showtotalMoney: false,
        money: 0//付款
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(val: any) {
        this.setData({
            shop: getApp().globalData.shopName
        })
        const { trade_id } = val;
        this.setData({
            trade_id: trade_id
        })
        this.getList(trade_id);

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    changefoods(e: any) {
        console.log(e.currentTarget.dataset.item);

        this.setData({
            show: true,
            detail: e.currentTarget.dataset.item,
            foodsprice: Number(e.currentTarget.dataset.item.price_total_str),
            value: e.currentTarget.dataset.item.num,
            total: Number(e.currentTarget.dataset.item.price_total_str) * e.currentTarget.dataset.item.num
        })
    },
    back() {
        wx.switchTab({
            url: "/pages/index/index",
        })
    },
    onChange(event: any) {
        console.log(event.detail);
        this.setData({
            value: Number(event.detail),
            total: Number(event.detail) * this.data.foodsprice
        })
    },
    onChangeprice(event: any) {
        this.setData({
            foodsprice: Number(event.detail),
            total: Number(event.detail) * this.data.value
        })
    },
    cancle() {
        this.setData({
            show: false
        })
    },
    change() {
        request({
            url: `/api/boss/trade/item/modify`,
            method: "POST",
            data: {
                trade_item_id: this.data.detail.trade_item_id,
                num: Number(this.data.value),
                price_total: this.data.total * 100,
            },
            success: ({ data }: any) => {
                console.log(data);
                this.getList(this.data.trade_id);
                this.setData({
                    show: false
                })
            },
            fail: () => {
            },
        });
    },
    getList(trade_id: any) {
        request({
            url: `/api/boss/trade/detail?trade_id=${trade_id}`,
            success: ({ data }: any) => {
                console.log(data.tarde);
                this.setData({
                    list: data.batch_list,
                    trade: data.trade,
                    price: data.sum_item_price_str
                })
            },
            fail: () => {
            },
        });
    },
    refyse(e: any) {
        console.log(e.currentTarget.dataset.id);
        var _this = this;
        request({
            url: `/api/boss/trade/refuse`,
            method: "POST",
            data: {
                batch_id: e.currentTarget.dataset.id
            },
            success: ({ data }: any) => {
                this.getList(_this.data.trade_id);
            },
            fail: () => {
            },
        });
    },
    onok(e: any) {
        request({
            url: `/api/boss/trade/confirm`,
            method: "POST",
            data: {
                batch_id: e.currentTarget.dataset.id
            },
            success: ({ data }: any) => {
                this.getList(this.data.trade_id);
            },
            fail: () => {
            },
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },
    //作废
    cancellation() {

        request({
            url: `/api/boss/trade/cancel`,
            method: "POST",
            data: {
                trade_id: this.data.trade.trade_id
            },
            success: ({ data }: any) => {
                console.log(data);
                wx.switchTab({
                    url: "/pages/order/order"
                })
            },
            fail: () => {
            },
        });
    },
    print() {
        request({
            url: `/api/boss/trade/print`,
            method: "POST",
            data: {
                trade_id: this.data.trade.trade_id
            },
            success: ({ data }: any) => {
                wx.showToast({
                    title: "打印成功",
                    icon: "none"
                })
            },
            fail: () => {
            },
        });
    },
    payment() {
        this.setData({
            showtotalMoney: true
        })
    },
    paymentcheck() {
        request({
            url: `/api/boss/trade/bill`,
            method: "POST",
            data: {
                trade_id: this.data.trade.trade_id,
                pay_type: 1,
                pay_price: Number(this.data.money) * 100
            },
            success: ({ data }: any) => {
                wx.showToast({
                    title: "结账成功",
                    icon: "none"
                })
                wx.switchTab({
                    url: "/pages/order/order"
                })
            },
            fail: () => {
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