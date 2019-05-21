// pages/shop/shop.js
// const app = getApp();
const request = require("../../utils/request");
Page({

	/**
   * 页面的初始数据
   */
	data: {
		types: [],// 商品类别
		goodsList: [], // 商品列表
		shopDetail: {},// 商店的详细信息
		selectTypes: "",// 当前所选类别
		totalCount: 0, // 总共的价格
	},
	// 选择左侧菜单
	changeSelectIndex(e) {
		let type = e.currentTarget.dataset.type;
		this.setData({
			selectTypes: type
		});
	},
	// 测试所用
	onClickIcon() {
		wx.switchTab({
			url: "/pages/home/home"
		});
	},
	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		let id = options.id || 1;
		// 获取商店列表
		request.get({
			url: `/shop/getById?id=${id}`
		}).then(res => {
			let data = res.data || {};
			let special = data.special.includes("@@") ? data.special.split("@@") : [];
			let tempData = [];
			special.map(item => {
				let tempData2 = item.split(",");
				tempData.push({
					origin: tempData2[0].split("=")[1],
					discount: tempData2[1].split("=")[1],
				});
			});
			data.special = tempData;
			console.log(data, "shopDetail");
			this.setData({
				shopDetail: data || {}
			});
			// 设置标题
			wx.setNavigationBarTitle({
				title: data.name || "雀送"
			});
			// 设置导航栏颜色
			wx.setNavigationBarColor({
				frontColor: "#ffffff",//前景颜色值
				backgroundColor: "#333"//背景颜色值
			});
		});
		// 获取商店列表
		request.get({
			url: `/goods/getByShopId?id=${id}`
		}).then(res => {
			console.log(res, 999);
			let data = res.data, types = [];
			data.map(item => {
				types.includes(item.type) ? null : types.push(item.type);
			});
			console.log(data, "goodsList");
			this.setData({
				goodsList: data,
				types: types,
				selectTypes: types[0]
			});
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
