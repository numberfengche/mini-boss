import { request } from "../../utils/net";
import { saveImg } from "../../utils/util";

// pages/mine/mine.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navBarHeight: getApp().globalData.navBarHeight,//导航栏高度
        top: wx.getMenuButtonBoundingClientRect().top,
        list:[],
        show:false,
        desk_id:0,
        tablename:"",
        showtable:false,
        name:"",
        id:"",
        type:1,//启用 //禁用,
        showname:false,
        showewm:false,
        actions: [
            {
              name: '删除',
              color: '#ee0a24'
            },
            {
              name: '禁用',
              color: '#ee0a24'
            },
            {
              name: '修改名称',
            },
            {
                name: '换绑二维码',
            },
            {
                name: '下载二维码',
            },
          ],
          actions1: [
            {
              name: '删除',
              color: '#ee0a24'
            },
            {
              name: '启用',
              color: '#3DB952'
            },
            {
              name: '修改名称',
            },
            {
                name: '换绑二维码',
            },
            {
                name: '下载二维码',
            },
          ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

    },
    openaction(e:any){
        console.log(e.currentTarget.dataset.id);
        console.log(e.currentTarget.dataset.desk);
     this.setData({
         show:true,
         type:e.currentTarget.dataset.id,
         desk_id:e.currentTarget.dataset.desk
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
        this.getlist()
    },
     getlist(){
        request({
            url:"/api/boss/desk/list",
            success: ({data}:any) => {
                console.log(data);
                
                this.setData({
                    list:data.list,
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
    onSelect(e:any){
        console.log(e.detail);
        if(e.detail.name==="删除"){
          this.delete()
        }else if(e.detail.name==="禁用"){
            this.forbidden()
          }else if(e.detail.name==="启用"){
            this.start()
          }else if(e.detail.name==="修改名称"){
            this.setData({
                showname:true
            })
          }else if(e.detail.name==="换绑二维码"){
            this.setData({
                showewm:true
            })
          }else if(e.detail.name==="下载二维码"){
              console.log(123123);
              request({
                url:"/api/boss/desk/qrcode",
                data:{
                    desk_id:this.data.desk_id
                },
                success: ({data}:any) => {
                    console.log(data);
                    saveImg(data.qrcode_b64);
                },
                fail: () => {
                },
            });
            // this.setData({
            //     showewm:true
            // })
          }
        
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    delete(){
        request({
            url:"/api/boss/desk/delete",
            method:"POST",
            data:{
                desk_id:this.data.desk_id
            },
            success: ({data}:any) => {
                wx.showToast({
                    title:"删除成功"
                })
                this.setData({
                    show:false,
                })
              this.getlist()
            },
            fail: () => {
            },
        });
    },
    //禁用
    forbidden(){
        request({
            url:"/api/boss/desk/modify-state",
            method:"POST",
            data:{
                desk_id:this.data.desk_id,
                state:0,
            },
            success: ({data}:any) => {
                wx.showToast({
                    title:"设置成功"
                })
                this.setData({
                    show:false,
                })
                this.getlist()
            },
            fail: () => {
            },
        });
    },
    //启用
    start(){
        request({
            url:"/api/boss/desk/modify-state",
            method:"POST",
            data:{
                desk_id:this.data.desk_id,
                state:1,
            },
            success: ({data}:any) => {
                wx.showToast({
                    title:"设置成功"
                })
                this.setData({
                    show:false,
                })
                this.getlist()
            },
            fail: () => {
            },
        });
    },
    //修改名称
    paymentcheck(){
        request({
            url:"/api/boss/desk/modify-name",
            method:"POST",
            data:{
                desk_id:this.data.desk_id,
                name:this.data.name,
            },
            success: ({data}:any) => {
                wx.showToast({
                    title:"设置成功"
                })
                this.setData({
                    show:false,
                })
                this.getlist()
            },
            fail: () => {
            },
        });
    },
    //修改id
    changeid(){
        request({
            url:"/api/boss/desk/modify-qrcode",
            method:"POST",
            data:{
                desk_id:this.data.desk_id,
                qrcode_id:Number(this.data.id),
            },
            success: ({data}:any) => {
                wx.showToast({
                    title:"设置成功"
                })
                this.setData({
                    show:false,
                })
                this.getlist()
            },
            fail: () => {
            },
        });
    },
    close(){
        this.setData({
            show:false,
        })
    },
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

    },
    creattable(){
   this.setData({
       showtable:true
   })
    },
    checktable(){
        request({
            url:"/api/boss/desk/create",
            method:"POST",
            data:{
                name:this.data.tablename,
            },
            success: ({data}:any) => {
                wx.showToast({
                    title:"添加成功"
                })
                this.setData({
                    showtable:false,
                })
                this.getlist()
            },
            fail: () => {
            },
        });
    }
})