// index.ts
// 获取应用实例
// const app = getApp<IAppOption>()

import { request } from "../../utils/net";

Page({
    data: {
        list:[],
        catgraylist:[],
        active:"0"
    },

    // 点击头像
    onTapAvatar() {
        wx.navigateTo({
            url: '../logs/logs',
        })
    },




    onShow() {
        this.setData({
            active:"0",
        })
        request({
            url:"/api/boss/trade/list",
            data:{state:"0,1,2,-1"},
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
    changeTab(val: any) {
        console.log(val.detail.name);
  if(val.detail.name==="0"){
    request({
        url:"/api/boss/trade/list",
        data:{state:"0,1,2,-1"},
        success: ({data}:any) => {
            this.setData({
                list:data.list,
                active:val.detail.name
            })
        },
        fail: () => {
        },
    });
  }else if(val.detail.name==="1") {
    request({
        url:"/api/boss/trade/list",
        data:{state:"0,1"},
        success: ({data}:any) => {
            this.setData({
                list:data.list,
                active:val.detail.name
            })
        },
        fail: () => {
        },
    });
  }else{
    request({
        url:"/api/boss/trade/list",
        data:{state:val.detail.name},
        success: ({data}:any) => {
            this.setData({
                list:data.list,
                active:val.detail.name
            })
        },
        fail: () => {
        },
    });
  }
    },
})
