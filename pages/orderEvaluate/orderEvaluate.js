// pages/orderEvaluate/orderEvaluate.js
Page({

	/**
   * 页面的初始数据
   */
	data: {
		peopleGrade: 0,
		shopGrade: 0,
		success: false,
		shopDetail: {}
	},

	// 对骑手评价改变
	onPeopleGradeChange(e) {
		console.log(e);
		let num = e.detail;
		let {shopGrade} = this.data;
		this.setData({
			peopleGrade: num
		});
		if(shopGrade && num) {
			this.setData({
				success: true
			});
		}
	},

	// 对商家评价改变
	onShopGradeChange(e) {
		let num = e.detail;
		let {peopleGrade} = this.data;
		this.setData({
			shopGrade: num
		});
		if(peopleGrade && num) {
			this.setData({
				success: true
			});
		}
	},

	submit(e) {
		// 跳转订单页面
		if(this.data.success) {
			let value = e.detail.value.textarea,
				{peopleGrade, shopGrade} = this.data;
			console.log(peopleGrade, shopGrade, value);
			// 跳转订单页面
			// wx.switchTab({
			// 	url: "/pages/order/order",
			// 	success: () => {
			// 		wx.showToast({
			// 			title: "评价成功",
			// 			icon: "success",
			// 			duration: 2000
			// 		});
			// 	}
			// });
		}

	},

	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function () {
		// 设置标题
		wx.setNavigationBarTitle({
			title: "评价"
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
		let pages = getCurrentPages();
		let prevPage = pages[pages.length - 2];  //上一个页面
		let data = prevPage.data;
		this.setData({
			shopDetail: data.orderitem.shop_detail,
		});
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
