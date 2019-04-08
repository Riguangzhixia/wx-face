// miniprogram/pages/students/1.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:""
  },
  
  gohome: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wx.request({
      url: 'https://start.xdface.cn/getData/print_someone.php',//此处填写你后台请求地址
      method: 'GET',
      header: { 'Content-Type': 'application/json' },
      data: {
        stu_number:app.globalData.number,
      },
      success: function (res) {
        // success
        console.log(res.data);//打印请求返回的结果
        that.setData({
          state: res.data
        })
      },
      fail: function (res) {
        // fail
        wx.showToast({
          icon: 'none',
          title: '网络请求失败，请检查网络后重新进入或向我们反馈'
        })
      },
      complete: function (res) {
        // complete
        wx.hideLoading()
      }
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