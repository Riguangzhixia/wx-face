// miniprogram/pages/students/2.js
//到课记录，从微信云开发端读取服务器中students表里面的data记录并显示出
Page({

  /**
   * 页面的初始数据
   */
  data: {
    absentList: [],
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
    wx.cloud.init()
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('students').where({
      number:options.number
    }).get({
      success: function (res) {
         if(res.data.length == 0){
          wx.showToast({
            icon: 'none',
            title: '无此学号学生信息'
          })
        
         }
         else{
        that.setData({
          absentList: res.data[0].data,
          number: res.data[0].number,
          name: res.data[0].name,
        })
         } 
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