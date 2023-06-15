import { request } from "../../utils/net";

// pages/login/index.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
    sms_code:"",
     mobile:"",
     time:60,
     showtime:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

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

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },
    getphone(e:any){
    console.log(e.detail.value);
       this.setData({
           mobile:e.detail.value
       })
    },
    getsms(){
        console.log(this.data.mobile);
        if (!this.data.mobile|| !/^1[0-9]{10}$/.test(this.data.mobile)) {
            wx.showToast({ title: "请填写正确的手机号码", icon: "none" });
        }else{
            this.setData({
                showtime:true
            });
            var timer =setInterval(()=>{
                this.setData({
                    time:this.data.time-1
                });
                if(this.data.time===0){
                    this.setData({
                        showtime:false,
                        time:60
                    });
                    clearInterval(timer);
                }
            },1000)
                 request({
            url:"/api/boss/send-sms",
            method: "POST",
            data:{
                mobile:this.data.mobile
            },
            success: (data:any) => {
                console.log(data);
                this.setData({ sms_code: data.ttl });
            },
            fail: () => {
                this.setData({ loading: false });
            },
        });
        } 

   
    },
    form_submit(e: any) {
        console.log(e);

        // const {  mobile, sms_code } = this.data;

        const data = {
            ...e.detail.value,
        };
        if (!data.sms_code) {
            wx.showToast({ title: "请填写验证码", icon: "none" });
        } else if (!data.mobile || !/^1[0-9]{10}$/.test(data.mobile)) {
            wx.showToast({ title: "请填写正确的手机号码", icon: "none" });
        } else {
            request({
                url:"/api/boss/passport",
                method: "POST",
                data,
                success: (data:any) => {
                    console.log(data.data);
                    wx.navigateTo({
                        url: "/pages/shop/index",
                        events: {
                            acceptDataFromOpenedPage: function (item: any) {
                                console.log(item)
                            },
                        },
                        success: function (res) {
                            res.eventChannel.emit('acceptDataFromOpenerPage', { data: data.data })
                        }
                    })
                },
                fail: () => {
                    this.setData({ loading: false });
                },
            });
        }
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