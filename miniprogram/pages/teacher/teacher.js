// pages/teacher/teacher.js
  //到课记录的存储思路：
  //暂定获取到了所有未到学生的名单（学号）以及此时的时间
  //循环遍历所有未到名单的学号并循环向数据库的students表的每个学生记录的data数组里添加一个当时的时间
  //开始上课即将所有学生各自的到课记录存入
  //当学生登陆时相应的openid记录获取data列表即到课记录
  //暂时假未到名单存在数组absentList
var util = require('../../util.js/util.js')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url: ["teachers/1", "teachers/2", "teachers/3", "../view/view","teachers/4","teachers/5"],
    percent: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  inClass:function () {//进入教师页面即开始录入未到学生各自的记录时间
    wx.cloud.init();
    const db = wx.cloud.database()
    var time = util.formatTime(new Date())

    const _ = db.command
    for (var i = 0; i < app.globalData.student.length; i++) {
      db.collection('students').where({
        number: app.globalData.student[i].number
      }).get({
        success: function (res) {
          db.collection('students').doc(res.data[0]._id).update({
            data: {
              data: _.push(time)
            },
            success: res => {
            }
          })
        },
        fail: function (res) {
        },
      })
    }
  },
  onLoad: function (options) {
    this.percentAdd();
    this.inClass();
  },
    
  percentAdd: function (e) {
    var that = this;
    var timer = setInterval(function () {
      var cur = that.data.percent;
      cur++;
      if (cur < 101) {
        wx.showLoading({
          title: '加载中',
        })
      }
      else{
        wx.hideLoading();
        clearInterval(timer);
      }
      that.setData({
        percent: cur
      });
    }, 10);
  },

  gohome: function () {
    wx.request({
      url: 'http://120.79.206.84/class_over.php',//此处填写你后台请求地址
      method: 'GET',
      header: { 'Content-Type': 'application/json' },
      data: {
      },
      success: function (res) {
        // success
        wx.showToast({
          icon: 'none',
          title: '课程已结束！'
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