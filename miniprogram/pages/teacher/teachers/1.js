// miniprogram/pages/teacher/teachers/1.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idnex:0,
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
    this.setData({
      absentList:app.globalData.student
    })
    console.log(app.globalData.student)
    var that = this
    //显示到课率和未到学生名单
    wx.request({
      url: 'https://start.xdface.cn/getData/class_attendrate.php',//此处填写你后台请求地址
      method: 'GET',
      header: { 'Content-Type': 'application/json' },
      data: {
 
      },
      success: function (res) {
        // success
        console.log(res.data);//打印请求返回的结果
        that.setData({
          classRate: res.data[res.data.length-1].att_rate*100
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
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