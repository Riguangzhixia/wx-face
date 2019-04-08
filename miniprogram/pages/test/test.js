const app = getApp()
Page({

  data: {
  },

  onLoad: function (options) {
  },
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0]
        console.log(res)
        // 上传图片
        /*const cloudPath = 'images/' + + filePath.match(/\.[^.]+?$/)[0]*/
      },
      fail: e => {
        console.error(e)
      }
    })
  },
  })
