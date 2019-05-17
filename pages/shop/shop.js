// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: "https://quesong.top/attachment/images/2/2019/05/Cej3XdyZFkYp1pxqQYjfJMzS1jY3yZ.jpeg", // 商品图片
    typeNum: 30,
    goodsNum: 50,
    selectIndex: 0
  },
  // 选择左侧菜单
  changeSelectIndex(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      selectIndex: index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 设置标题
    wx.setNavigationBarTitle({
      title: "KFC肯德基(hello world)"
    })
    // 设置导航栏颜色
    wx.setNavigationBarColor({
      frontColor: "#ffffff",//前景颜色值
      backgroundColor: "#333"//背景颜色值
    })
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