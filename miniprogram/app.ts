import { request } from "./utils/net";
interface globalData {
    host: string
    token: string
    menuBotton: number, // 胶囊距底部间距（保持底部间距一致）
    menuRight: number, // 胶囊距右方间距（方保持左、右间距一致）
    menuHeight: number, // 胶囊高度（自定义内容可与胶囊高度保证一致）
    navBarHeight: number,
    showLogin:boolean,
    avatar:string | undefined,
    phone:string | undefined,
    name:string | undefined,
    shopName:string | undefined,
    num:number//点餐人数索引
  }
  
  interface IAppOption {
    globalData: globalData;
    env: string;
    watch: Function;
    setNavBarInfo: Function;
  }
  
  // app.ts
  App<IAppOption>({
    globalData: {
        host: ["develop", "trial"].includes(wx.getAccountInfoSync().miniProgram.envVersion) ? "https://maoniu.1meigong.com" : "https://maoniu.1meigong.com",
        // wx.getStorageSync('token'),
        token:"",
        navBarHeight: 0, // 导航栏高度,
        menuBotton: 0, // 胶囊距底部间距（保持底部间距一致）
        menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
        menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
        showLogin:false,//登录弹窗
        avatar:undefined,//头像
        name:undefined ,//名字
        shopName:"",
        phone:undefined,//电话
        num:0//点餐人数索引
    },
    env: wx.getAccountInfoSync().miniProgram.envVersion,
    // 监听全局变量globalData中参数的变化
    watch(key: keyof globalData, callback: Function) {
      let obj: globalData = this.globalData;
      let val = obj[key]; // 单独变量来存储原来的值
      Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        set: function (value) {
          val = value; // 重新赋值
          callback(key, value); // 执行回调方法
        },
        get: function () {
          // 在其他界面调用 getApp().globalData.variate 的时候，这里就会执行。
          return val; // 返回当前值
        },
      });
    },
    onLaunch() {
      let that=this;
      that.setNavBarInfo();
    //   if(that.globalData.token){
        
    //   }
//获取会话信息

console.log(this.globalData.token);


wx.request({
        url: "https://maoniu.1meigong.com/api/boss/session",
        header: { "content-type": "application/json", "Authorization":this.globalData.token },
        // data: this.data.searchInformation,
        success: ({ data,statusCode }: any) => {
            console.log(data,statusCode);
            if(statusCode===401){
                wx.showToast({ title: "请登录", icon: "none" });
                // if (getApp().env != "develop") {
                // }
                setTimeout(() => {
                    wx.redirectTo({ url: "/pages/login/index" });
                }, 1000);
            }
            if(statusCode===200){
                setTimeout(() => {
                    wx.redirectTo({ url: "/pages/order/order" });
                }, 1000);
            }
        //   const {nickName,mobile,avatar_url}=data
        //   that.globalData.name=nickName;
        //   that.globalData.phone=mobile;
        //   that.globalData.avatar=avatar_url;
        },
        fail: () => {
          // this.setData({ loading: false });
        },
      });

    },
        setNavBarInfo () {
        // 获取系统信息
        const systemInfo = wx.getSystemInfoSync();
        // 胶囊按钮位置信息
        const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
        // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
        this.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
        this.globalData.menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
        this.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
        this.globalData.menuHeight = menuButtonInfo.height;
      }
     // 监听全局变量变化
     
  });