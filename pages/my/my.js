//index.js
//获取应用实例
const app = getApp()
const request = require("../../utils/request");
const config = require("../../utils/config")
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res, 34567)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res, 2355)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    // 登录
    wx.login({
      success: res => {
        console.log(res, "login-------------1111")
        let code = res.code || ""
        request.get({
          url: "/user/register",
          data: {
            code: code,
            name: e.detail.userInfo.nickName,
            avatarUrl: e.detail.userInfo.avatarUrl,
            appid: config.appid,
            AppSecret: config.AppSecret,
            grant_type: config.grant_type,
          }
        }).then(res => {
          console.log(res, 11)
          app.globalData.openid = res.data;
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  }
})
