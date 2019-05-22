// pages/address/address.js
Page({

	/**
   * 页面的初始数据
   */
	data: {
		sexRedio: "1", // 默认选中男同学
		campusRadio: "1", // 默认是校内
	},

	// 改变男女同学按钮
	onChangeSexRadio(e) {
		console.log(e);
		this.setData({
			sexRedio: e.detail
		});
	},
	// 改变校内还是校外
	onChangeCampusRadio(e) {
		console.log(e);
		this.setData({
			campusRadio: e.detail
		});
	},

	// 表单提交
	formSubmit(e) {
		console.log(e, 11);
	},

	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		console.log(options);
		// 设置标题
		wx.setNavigationBarTitle({
			title: "新增收货地址"
		});
		// 设置导航栏颜色
		wx.setNavigationBarColor({
			frontColor: "#000000",//前景颜色值
			backgroundColor: "#fff"//背景颜色值
		});
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
});
