import { request } from "./net"
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib3NzX2lkIjo0LCJleHAiOjE2ODcyNDQzNzYsImlhdCI6MTY4NjYzOTU3NiwiaWQiOiJjaTQxN20xbzVrNHYyaTI4OXBiZyIsImxvZ2luX3RpbWUiOjE2ODY2Mzk1NzYsInNob3BfaWQiOjcsInR5cGUiOiJtaW5pLWJvc3MifQ.eG8IB8rbKAibE7PCGD_ZvqX96PYDiyXp18qmrrpKv-E
export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}


export const formatDate = (date:Date) => {
    var year = date.getFullYear();
    var month =(date.getMonth() + 1).toString();
    var day = (date.getDate()).toString();
    if (month.length == 1) {
        month = "0" + month;
    }
    if (day.length == 1) {
        day = "0" + day;
    }
    return year +"-"+ month +"-"+  day;
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}
// import { request } from "@@/exports";


export const formatRichText=(html:any)=>{
    console.log(html);
    let newContent= html.replace(/<img[^>]*>/gi,function(match:any,capture:any){
        match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
        match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
        match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
        return match;
    });
    newContent = newContent.replace(/style="[^"]+"/gi,function(match:any,capture:any){
        match = match
        .replace(/<p>/gi, '<p class="p_class">')
        .replace(/width:[^;]+;/gi, 'max-width:100%;')
        .replace(/width:[^;]+;/gi, 'max-width:100%;');
        return match;
    });
    newContent = newContent.replace(/<br[^>]*\/>/gi, "");
    newContent = newContent.replace(/<a>/gi, '<a class="p_class "');
    newContent = newContent.replace(/<li>/gi, '<li class="p_class "');
    newContent = newContent.replace(/\<p/gi, '<p class="p_class "');
    newContent = newContent.replace(/\<span/gi, '<span class="p_class "');
    newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
    return newContent;
  }
  export const filterKeys = (json: any | Array<any>) => {
    let result: any = false;
    if (Array.isArray(json)) {
      result = json.filter((item) => item !== "" && item !== null && item !== undefined);
    } else if (json instanceof Object) {
      result = {};
  
      for (const key in json) {
        if (json[key] !== "" && json[key] !== null && json[key] !== undefined) {
          // if (Array.isArray(json[key]) && json[key].length > 0) {
          result[key] = json[key];
          // }
        }
      }
    }
    return result;
  };

  // 保存图片
let settingWritePhotosAlbum = false;
export const saveImg = function(url:any) {
  //获取文件管理器对象
  const fs = wx.getFileSystemManager()
  //文件保存路径
  const Imgpath = wx.env.USER_DATA_PATH + '/qrcodeImg' + '.png'
  //base64图片文件
  let imageSrc = url.replace(/^data:image\/\w+;base64,/, '')

  //写入本地文件
  fs.writeFile({
    filePath: Imgpath,
    data: imageSrc,
    encoding: 'base64',
    success(res) {
      console.log(res)
      if (url) {
		    if (settingWritePhotosAlbum) {
		    	wx.getSetting({
		    		success: res => {
		    			if (res.authSetting['scope.writePhotosAlbum']) {
                wx.saveImageToPhotosAlbum({
                  filePath: Imgpath,
                  success: () => {
                      wx.hideLoading();
                    //   callback && callback();
                      wx.showToast({
                          title: '保存成功'
                      });
                  },
                  fail(e) {
                      wx.hideLoading();
                      wx.showToast({
                          title: '下载失败，错误原因：' + e.errMsg,
                          icon: "none"
                      });
                  }
                });
		    			} else {
		    				wx.showModal({
		    					title: '提示',
		    					content: '请先在设置页面打开“保存相册”使用权限',
		    					confirmText: '去设置',
		    					cancelText: '算了',
		    					success: data => {
		    						if (data.confirm) {
		    							wx.openSetting();
		    						}
		    					}
		    				});
		    			}
		    		}
		    	});
		    } else {
		    	settingWritePhotosAlbum = true;
		    	wx.authorize({
		    		scope: 'scope.writePhotosAlbum',
		    		success: () => {
              wx.saveImageToPhotosAlbum({
                  filePath: Imgpath,
                  success: () => {
                      wx.hideLoading();
                    //   callback && callback();
                      wx.showToast({
                          title: '保存成功'
                      });
                  },
                  fail(e) {
                      wx.hideLoading();
                      wx.showToast({
                          title: '下载失败，错误原因：' + e.errMsg,
                          icon: "none"
                      });
                  }
              });
		    		}
		    	});
		    }
	    } else {
	    	wx.showToast({
	    		title: '未找到图片',
	    		icon: 'none'
	    	});
	    }
    }
  }) 
}
