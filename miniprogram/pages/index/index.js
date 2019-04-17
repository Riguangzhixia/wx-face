 //index.js
//获取应用实例
const app = getApp()

var util = require('../../util.js/util.js')
//给按钮绑定getTime事件

Page({
  data: {
    identity:["学生","教师"],
    index: null,//根据id来判断并设置index的值，默认应该是学生以防止未更新数据时学生获得老师的界面从而进行一些操作
    userInfo: {
      avatarUrl: "user-unlogin.png",
      nickName:"获取个人信息中~"
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    url:["../teacher/teacher","","","",""],  
    //存放未到学生的学号名单
  }, 
  receive:function(){//点击开始上课之后即快开始请求到课率及未到学生名单
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wx.request({
      url: 'https://start.xdface.cn/getData/NoCome.php',//请求未到学生名单：姓名，学号
      method: 'GET',
      header: { 'Content-Type': 'application/json' },
      data: {},
      success: function (res) {
        // success
        app.globalData.student = res.data;
        wx.showToast({
          icon: 'none',
          title: '获取数据成功'
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
        wx.hideLoading();
      }
    })
  },
  webview: function(){
    wx.navigateTo({
      url: '../webview',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  bindPickerChange: function (event) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    const db = wx.cloud.database()
    const that = this 
    //  查询当前用户所有的
    const X = db.command
    db.collection('teachers').where({
      _openid:app.globalData.openid
    }).get({
      success: res => {
          if(res.data.length==0){
            wx.showToast({
              icon: 'none', 
              title: '未匹配到数据库中老师的id,进入学生页面'
            })
            this.setData({
              index:0
            })
            wx.setNavigationBarTitle({
              title: '智慧教室平台' + that.data.identity[that.data.index] + '端'
            })
            db.collection('students').where({
              _openid: app.globalData.openid
            }).get({
              success: res => {
                app.globalData.number = res.data[0].number//获取学号方便查询个人状态
              }
            })

          }
          else{
            wx.showToast({
              icon: 'none',
              title: '匹配ID成功，进入教师页面'
            }),
            this.setData({
              index:1
            }),
            wx.setNavigationBarTitle({
              title: '智慧教室平台' + that.data.identity[that.data.index] + '端'
            }),
            wx.request({
              url: 'https://start.xdface.cn/test.py',//此处填写你后台请求地址
              method: 'GET',
              header: { 'Content-Type': 'application/json' },
              data: {},
              success: function (res) {
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
           /* console.log(that.data.index)*/
          } 
      },
      fail: err => {
         wx.showToast({
           icon: 'none',
           title: '数据库连接失败',
         })
        console.error('[数据库] [链接]] 失败：', err)
      }
     })
  },



  onclick1:function(){
    wx.navigateTo({
      url: '../upinfo/upinfo'
    })
  },

  onclick2: function () {
    wx.navigateTo({
      url: '../students/1'
    })
  },

  onclick3: function () {
      wx.navigateTo({
        url: '../students/2'
      })
  },

  //事件处理函数


  onLoad: function () {  
      // 调用云函数
    wx.cloud.init()
    wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
         /* console.log('[云函数] [login] user openid: ', res.result.openid)*/
          app.globalData.openid = res.result.openid
         /* console.log(app.globalData.openid)*/
          app.userInfoReadyCallback = res => {
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        },
        fail: err => {
         /* console.error('[云函数] [login] 调用失败', err)*/
        }
      })

    wx.setNavigationBarTitle({
      title: '智慧教室平台'
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        /*console.log(res.userInfo)*/
      }
    } else {
      wx.getSetting({
        success(res) {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
              })
            }
          })
        }
      })
    }
  },

  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onReady:function(){
 /* console.log(this.data.userInfo.avatarUrl)
  console.log(this.data.userInfo.nickName)*/
  },

  onShow:function(){

  }
})
