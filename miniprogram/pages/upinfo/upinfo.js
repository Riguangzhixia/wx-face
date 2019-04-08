// pages/upinfo/upinfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      src:"../aaa.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  doUpload: function () {
    var that = this
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res){
        wx.showToast({
          title: '选择完成',
        })
        that.setData({
          src:res.tempFilePaths[0]
        })
        console.log(res)
        // 上传图片
        /*const cloudPath = 'images/' + app.globalData.openid + filePath.match(/\.[^.]+?$/)[0]
        console.log(cloudPath)*/
      },
      fail: e => {
        console.error(e)
      }
    })
  },
  
  gohome: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  formSubmit: function (e) {
    wx.cloud.init();
    const db = wx.cloud.database()
    const that = this
    //  查询当前用户所有的
    const X = db.command
    db.collection('students').where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        if (res.data.length != 0) {
          wx.showToast({
            icon: 'none',
            title: '你传你马呢？老子不是跟你说了只能上传一次么。',
          })
        }
        else {
          wx.showLoading({
            title: '加载中',
          })
          if (e.detail.value.name) {
            wx.uploadFile({
              url: 'https://start.xdface.cn/receive.php',//服务器接受文件和信息的脚本
              filePath: this.data.src,
              name: 'image',
              formData: {
                stu_name: e.detail.value.name,
                stu_number: e.detail.value.number,
               // classID: e.detail.value.classID
              },//post传入的信息
              success: res => {
                wx.hideLoading();
                console.log('[上传文件] 成功：', res)
                wx.showModal({
                  title: '提示',
                  content: '上传信息成功',
                  success(res) {
                    db.collection('students').add({
                      data: {
                        name: e.detail.value.name,
                        number: e.detail.value.number,
                        class: e.detail.value.class,
                        data: ['未到课记录']
                      },
                      success: res => {
                        // 在返回结果中会包含新创建的记录的 _id
                        this.setData({
                          counterId: res._id,
                          count: 1
                        })
                        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
                      },
                      fail: err => {
                        wx.showToast({
                          icon: 'none',
                          title: '新增记录失败'
                        })
                        console.error('[数据库] [新增记录] 失败：', err)
                      }
                    })
                    if (res.confirm) {
                      /* console.log('用户点击确定')*/
                    } else if (res.cancel) {
                      /* console.log('用户点击取消')*/
                    }
                  }
                })
              },
              fail: e => {
                console.error('[上传文件] 失败：文件不能为空', e)
                wx.showToast({
                  icon: 'none',
                  title: '[上传文件] 失败：文件未选择',
                })
              },
              complete: () => {
              }
            })
          }
          else {
            wx.showToast({
              icon: 'none',
              title: '信息不完整请认真填写',
            })
          }

        }
      }
    })

    }

})
