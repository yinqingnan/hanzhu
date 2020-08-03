//index.js
const app = getApp()

Page({
  data: {
    navdata: [],
    swiperimg: [],
    pageshow: true,
    MainNavIcon: [],
    VideNavIcon: [],
    TravelImg: "",
    TravelArr: [],
    ThemeImg: "",
    ThemeArr: [],
    Hotelimg: "",
    hotelarr: [],
    sichuanarr: [],
    yunnanarr: [],
    sichuanimg: '',
    yunnanimg: "",
    subsidiary:[],
    scrollshow:false

  },
  onPageScroll(e){
    //参数e会返回滚动条滚动的高度
     if(e.scrollTop >= 50){
        this.setData({
          scrollshow:true
        })
     }else{
      this.setData({
        scrollshow:false
      })
     }
    },
    barnertap(e){
      console.log(e)
    },
  onClick(event) {
    wx.setNavigationBarTitle({ //修改顶部菜单标题
      title: event.detail.title
    })
    console.log(event.detail.name)
    let num = event.detail.name
    if (num === 0) {
      this.setData({
        pageshow: true
      })
    } else {
      this.setData({
        pageshow: false
      })
    }
    if (num === 1) {
      let obj = {
        'ids[0]': 1967,
        'ids[1]': 1965,
        'ids[2]': 2213,
        'ids[3]': 2290
      };
      this.switchpage(obj);
    } else if (num === 2) {
      let obj = {
        'ids[0]': 2369,
        'ids[1]': 2350
      };
      this.switchpage(obj);
    } else if (num === 3) {
      let obj = {
        'ids[0]': 2193,
        'ids[1]': 2190,
        'ids[2]': 2289,
        'ids[3]': 2288,
        'ids[4]': 2156
      };
      this.switchpage(obj);
    } else if (num === 4) {
      let obj = {
        'ids[0]': 1479,
        'ids[1]': 1936,
        'ids[2]': 1983,
        'ids[3]': 1832,
        'ids[4]': 1460,
        'ids[5]': 1914
      };
      this.switchpage(obj);
    }



    wx.showToast({
      title: `${event.detail.title}`,
      icon: 'none',
    });
  },
  switchpage(obj) {
    wx.request({
      url: 'https://m.bmtrip.com/api/v3/m1/product/list/by_ids',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: obj,
      success: res => {
        console.log(res.data.data.list);
        this.setData({
          subsidiary:res.data.data.list
        })
      }
    })
  },
  getNavdata() { //顶部导航栏数据
    var that = this;
    wx.request({
      url: 'https://m.bmtrip.com/api/v3/m1/cms/nav?pageId=5da95458b896310cf66ba97f',
      success(res) {
        // console.log(res.data.data.nav)
        that.setData({
          navdata: res.data.data.nav
        })
      }
    })
  },
  getImgdata() { //get图片数据组
    var that = this;
    wx.request({
      url: 'https://m.bmtrip.com/api/v3/m1/cms/page/detail?pageId=5da95458b896310cf66ba97f',
      success(res) {
        // console.log(res.data.data.data)
        // console.log(res.data.data.data[7].data)
        that.setData({
          swiperimg: res.data.data.data[0].data,
          TravelImg: res.data.data.data[1].data[0].img.url,
          TravelArr: res.data.data.data[2].data,
          ThemeImg: res.data.data.data[3].data[0].img.url,
          ThemeArr: res.data.data.data[4].data,
          Hotelimg: res.data.data.data[5].data[0].img.url,
          sichuanimg: res.data.data.data[7].data[0].img.url,
          yunnanimg: res.data.data.data[9].data[0].img.url,
        })
      }
    })
    wx.request({
      // MainNavIcon 数据
      url: 'https://m.bmtrip.com/api/v3/m1/homepage/icons/a',
      method: 'GET',
      success: res => {
        that.setData({
          MainNavIcon: res.data.data.list
        })
      }
      // 

    });
    // VideNavIcon数据
    wx.request({
      url: 'https://m.bmtrip.com/api/v3/m1/theme/group',
      method: 'GET',
      success: res => {
        that.setData({
          VideNavIcon: res.data.data.list
        })
      }
    })
    wx.request({
      // 大牌酒店,热辣四川,多彩云南
      url: 'https://m.bmtrip.com/api/v3/m1/product/list/by_ids',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'ids[0]': 2296,
        'ids[1]': 2295,
        'ids[2]': 2365,
        'ids[3]': 2364,
        'ids[4]': 2193,
        'ids[5]': 2190,
        'ids[6]': 2289,
        'ids[7]': 2288,
        'ids[8]': 2140,
        'ids[9]': 1965,
        'ids[10]': 1967,
        'ids[11]': 2213
      },
      success: res => {
        // console.log(res.data.data.list);
        let arr = res.data.data.list;
        let hoteldata = []
        let sichuandata = []
        let yunandata = []
        // 大牌酒店数据
        for (let i = 0; i <= 3; i++) {
          hoteldata.push(arr[i])
          that.setData({
            hotelarr: hoteldata
          })
        }
        // 热辣四川数据
        for (let i = 4; i <= 7; i++) {
          sichuandata.push(arr[i])
          that.setData({
            sichuanarr: sichuandata
          })
        }
        // 彩云之南数据
        for (let i = 8; i <= arr.length - 1; i++) {
          yunandata.push(arr[i])
          that.setData({
            yunnanarr: yunandata
          })
        }
      }
    });

  },
  onShow: function () {},
  onLoad: function () {
    this.getNavdata()
    this.getImgdata()
    // 获取用户信息
    wx.getSetting({
      // success: res => {
      //   if (res.authSetting['scope.userInfo']) {
      //     // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
      //     wx.getUserInfo({
      //       success: res => {
      //         this.setData({
      //           avatarUrl: res.userInfo.avatarUrl,
      //           userInfo: res.userInfo
      //         })
      //       }
      //     })
      //   }
      // }
    })
  },

  onGetUserInfo: function (e) {
    // if (!this.data.logged && e.detail.userInfo) {
    //   this.setData({
    //     logged: true,
    //     avatarUrl: e.detail.userInfo.avatarUrl,
    //     userInfo: e.detail.userInfo
    //   })
    // }
  },

  onGetOpenid: function () {
    // 调用云函数
    // wx.cloud.callFunction({
    //   name: 'login',
    //   data: {},
    //   success: res => {
    //     console.log('[云函数] [login] user openid: ', res.result.openid)
    //     app.globalData.openid = res.result.openid
    //     wx.navigateTo({
    //       url: '../userConsole/userConsole',
    //     })
    //   },
    //   fail: err => {
    //     console.error('[云函数] [login] 调用失败', err)
    //     wx.navigateTo({
    //       url: '../deployFunctions/deployFunctions',
    //     })
    //   }
    // })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    // wx.chooseImage({
    //   count: 1,
    //   sizeType: ['compressed'],
    //   sourceType: ['album', 'camera'],
    //   success: function (res) {

    //     wx.showLoading({
    //       title: '上传中',
    //     })

    //     const filePath = res.tempFilePaths[0]

    //     // 上传图片
    //     const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
    //     wx.cloud.uploadFile({
    //       cloudPath,
    //       filePath,
    //       success: res => {
    //         console.log('[上传文件] 成功：', res)

    //         app.globalData.fileID = res.fileID
    //         app.globalData.cloudPath = cloudPath
    //         app.globalData.imagePath = filePath

    //         wx.navigateTo({
    //           url: '../storageConsole/storageConsole'
    //         })
    //       },
    //       fail: e => {
    //         console.error('[上传文件] 失败：', e)
    //         wx.showToast({
    //           icon: 'none',
    //           title: '上传失败',
    //         })
    //       },
    //       complete: () => {
    //         wx.hideLoading()
    //       }
    //     })

    //   },
    //   fail: e => {
    //     console.error(e)
    //   }
    // })
  },

})