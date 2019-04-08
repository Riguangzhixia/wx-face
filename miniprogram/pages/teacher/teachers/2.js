// miniprogram/pages/test/test1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    wx.request({
      url: 'https://start.xdface.cn/getData/stustate.php',//此处填写你后台请求地址
      method: 'GET',
      header: { 'Content-Type': 'application/json' },
      data: {
      },
      success: function (res) {
        var state = 0;
        for (var i = 0; i < res.data.length; i++) {
          state += parseInt(res.data[i].state)
        }
        //console.log(state)
        that.setData({
          absentList: res.data,
          state: state / 10
        })
        // success
        //console.log(res.data);//打印请求返回的结果
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },

  gohome: function () {
    wx.navigateBack({
      delta: 1
    })
  },
})