// components/radio/radio.ts
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
      list:[
        {key:0,name:"1"},
        {key:1,name:"2"},
        {key:2,name:"3"},
        {key:3,name:"4"},
        {key:4,name:"5"},
        {key:5,name:"6"},
        {key:6,name:"7"},
        {key:7,name:"8"},
        {key:8,name:"9"},
        {key:9,name:"其他"},
      ],
      select_type:0,
      show:false,
      value:1
    },

    /**
     * 组件的方法列表
     */
    methods: {
        changeNum(e:any){
            console.log(e.target.dataset.id);
            console.log(e.target.dataset.num);
            if(e.target.dataset.id===9){
                // wx.onKeyboardHeightChange(res => {
                //     console.log(res.height)
                //   })
                this.setData({
                    show:true
                })
            }
            this.setData({
                select_type:e.target.dataset.id
            })
            getApp().globalData.num = e.target.dataset.id
        },
        bindKeyInput: function (e:any) {
            console.log(e.detail.value);
            let price=e.detail.value;
            // if (price.indexOf(".") < 0 && price != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额

            //             
            //           }
              price = parseFloat(price);
                console.log(price);
                
            this.setData({
                value: price
            })
          },
          onClose(){
            this.setData({
                show:false
            })
          },
          onConfirm(){
              console.log(this.data.value);
              getApp().globalData.num = this.data.value
              
          }

    }
})
