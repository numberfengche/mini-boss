import { request } from "../../../utils/net";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
    },
    /**
     * 组件的初始数据
     */
    pageLifetimes: {
        show: function () {
            this.getlist()
            // 页面被展示
            console.log("页面被展示");
        },
        hide: function () {
            // 页面被隐藏
            console.log("页面被隐藏");
        },
        resize: function (size) {
            // 页面尺寸变化
            console.log("页面尺寸变化");
        }
    },

    data: {
        list: [],//全部
        orderlist: [],//未点单
        checklist: [],//待确认
        nonelist: [],//未开台
        paymentList: [],//就餐中,
        refresh: false,
        active: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        changeTab(val: any) {
            console.log(val.detail.name);
            const classify = val.detail.name.toString()
            this.setData({
                classify
            })
        },
        getlist() {
            request({
                url: "/api/boss/desk/overview",
                success: ({ data }: any) => {
                    console.log(data.list);
                    const orderlist = data.list.filter((item: any) => item.state === 2)
                    const checklist = data.list.filter((item: any) => item.state === 4)
                    const nonelist = data.list.filter((item: any) => item.state === 1)
                    const paymentist = data.list.filter((item: any) => item.state === 3)
                    this.setData({
                        list: data.list,
                        orderlist: orderlist,
                        checklist: checklist,
                        nonelist: nonelist,
                        paymentList: paymentist,
                        refresh: false,
                        active: 0
                    })
                },
                fail: () => {
                },
            });
        },
        onRefresh() {
            console.log(1231231);
            this.setData({
                refresh: true
            })
            request({
                url: "/api/boss/desk/overview",
                success: ({ data }: any) => {
                    console.log(data.list);
                    const orderlist = data.list.filter((item: any) => item.state === 2)
                    const checklist = data.list.filter((item: any) => item.state === 4)
                    const nonelist = data.list.filter((item: any) => item.state === 1)
                    const paymentist = data.list.filter((item: any) => item.state === 3)
                    this.setData({
                        list: data.list,
                        orderlist: orderlist,
                        checklist: checklist,
                        nonelist: nonelist,
                        paymentList: paymentist,
                        refresh: false,
                    })
                    wx.showToast({
                        title: "刷新成功",
                        icon: "none"
                    })
                },
                fail: () => {
                },
            });

            // this.reloadData(this.getlist());
        },
        godetail(e: any) {
            var id = e.currentTarget.dataset.id
            console.log(e);

            console.log(id);

            wx.navigateTo({
                url: `/pages/orderDetail/orderDetail?trade_id=${id}`
            })
        }
    },
    lifetimes: {
        created: function () {
            console.log(123123);

            // this.getlist()
            // this.selectComponent("#tabs").resize();
            // this.refresh();
            // this.setData({
            //     active:
            // })
            // console.log(this.data.dataList);
        },
    },
})
