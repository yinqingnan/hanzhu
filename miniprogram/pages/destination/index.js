// pages/destination/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mainActiveIndex: 0,
    citylist: [],
    DiscountMsg: [],
    imgconct: '?imageView2/1/format/jpg/interlace/1/q/80',
    height: '174rpx',
    textstate: '查看更多'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      // MainNavIcon 数据
      url: 'https://m.bmtrip.com/api/v3/m1/area/group?scene=6',
      method: 'GET',
      success: res => {
        console.log(res.data.data.list)
        that.setData({
          citylist: res.data.data.list,
          DiscountMsg: res.data.data.list[0]
        })
        // console.log(res.data.data.list[0])
        if (res.data.data.list[0].length <= 2) {
          that.setData({
            height: '174rpx'
          })
        } else if (res.data.data.list[0].length >= 2) {
          that.setData({
            height: '328rpx'
          })
        }
      }
      // 
    });
    console.log(this.data.mainActiveIndex)

  },
  switchcity(e) {
    let index = e.target.dataset.index
    let city = e.target.dataset.city
    let id = e.target.dataset.id
    this.setData({
      mainActiveIndex: index,
      textstate: '查看更多'
    })
    console.log(city)

    let data = this.data.citylist.filter(item => {
      return item.id == id
    })
    this.setData({
      DiscountMsg: data[0]
    })
    console.log(this.data.DiscountMsg)
    if (data[0].children.length <= 2) {
      this.setData({
        height: '174rpx'
      })
    } else if (data[0].children.length >= 2) {
      this.setData({
        height: '328rpx'
      })
    }

    // console.log(data[0])
  },
  // 查看更多
  more() {
    if (this.data.textstate == '查看更多') {
      this.setData({
        height: 'auto',
        textstate: '点击收起'
      })
    } else {
      this.setData({
        textstate: '查看更多'
      })
      if (this.data.DiscountMsg.children.length <= 2) {
        this.setData({
          height: '174rpx'
        })
      } else if (this.data.DiscountMsg.children.length >= 2) {
        this.setData({
          height: '328rpx'
        })
      }
    }

  },
  // tabbar事件
  onTabItemTap(item) {
    // 可以在此做自己需求的逻辑操作，如点击出现弹窗等
    // console.log(item.text)
    wx.setNavigationBarTitle({ //修改顶部菜单标题
      title: item.text
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})