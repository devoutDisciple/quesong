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
		orderList: [], // 订单列表
		totalPrice: 0, // 订单总价
		discountPrice: 0, // 已经优惠价格
		totalNum: 0, //订单总数量
	},
	// 选择左侧菜单
	changeSelectIndex(e) {
		let type = e.currentTarget.dataset.type;
		this.setData({
			selectTypes: type
		});
	},
	// 添加食物
	addFood(e) {
		let orderList = this.data.orderList;
		let food = e.currentTarget.dataset.food;
		let isFlag = false;
		orderList.map(item => {
			item.id == food.id ? isFlag = true : null;
		});
		if(isFlag) {
			orderList.map(item => {
				item.id == food.id ? item.num++ : null;
			});
		} else {
			food.num = 1;
			orderList.push(food);
		}
		this.setData({
			orderList: orderList
		}, () => {
			this.countPrice();
		});

	},
	// 减少食物
	subFood(e) {
		let orderList = this.data.orderList;
		let food = e.currentTarget.dataset.food;
		orderList.map((item, index) => {
			item.id == food.id ? item.num-- : null;
			if(item.num == 0) delete orderList[index];
		});
		this.setData({
			orderList: orderList
		}, () => {
			this.countPrice();
		});
	},
	// 计算价格
	countPrice() {
		let orderList = this.data.orderList, totalPrice = 0, totalNum = 0;
		// 计算商品总价格
		orderList.map(item => {
			totalPrice = totalPrice + item.price * item.num;
			totalNum = totalNum + item.num;
		});
		// 计算满减
		let special = this.data.shopDetail.special;
		let finalPrice = totalPrice, originPrice = 0, discountPrice = 0;
		if(special && special.length > 0) {
			special.map(item => {
				if(Number(finalPrice) >= Number(item.origin) && Number(originPrice) <= Number(item.origin)) {
					originPrice = item.origin;
					discountPrice = item.discount;
					finalPrice = totalPrice - item.discount;
				}
			});
		}
		this.setData({
			totalPrice: finalPrice,
			discountPrice,
			totalNum
		});
	},
	// 跳转到结账页面
	settleAccounts() {
		wx.navigateTo({
			url: "/pages/accounts/accounts"
		});
	},
	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		let id = options.id;
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
			let data = res.data, types = [];
			data.map(item => {
				types.includes(item.type) ? null : types.push(item.type);
			});
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
