import request from "../../utils/request";

// pages/accounts/accounts.js
Page({

	/**
   * 页面的初始数据
   */
	data: {
		imgUrl: "https://quesong.top/attachment/images/2/2019/05/RVr6ZRT6Rtzhola08ohAHb2bBXSaPb.jpeg",
		shopDetail: {}, // 商店详情
		orderList: [], // 订购的菜品
		totalPrice: 0, // 总价
		discountPrice: 0, // 满减优惠
		personDetail: {}, // 个人信息
		address: {}, // 默认收货地址
	},
	// 点击新增收货地址
	onClickAddAddress() {
		wx.navigateTo({
			url: "/pages/address/address?type=create"
		});
	},
	// 支付订单
	submitOrder() {
		// console.log((new Date()).getTime());
		// wx.requestPayment({
		// 	timeStamp: (new Date()).getTime(),// 时间戳
		// 	nonceStr: "",//随机字符串，长度为32个字符以下
		// 	package: "",//统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=***
		// 	signType: "MD5",//签名算法
		// 	paySign: "",//签名
		// 	success(res) { },
		// 	fail(res) { }
		// });
		let shopDetail = {
			id: this.data.shopDetail.id,
			name: this.data.shopDetail.name,
			address: this.data.shopDetail.address,
			url: this.data.shopDetail.url
		};
		request.post({
			url: "/order/add",
			data: {
				shop_detail: JSON.stringify(shopDetail),
				order_list: JSON.stringify(this.data.orderList),
				total_price: this.data.totalPrice, // 总价
				discount_price: this.data.discountPrice, // 优惠价格
				order_time: (new Date()).getTime(),
				status: 1
			}
		}).then(res => {
			console.log(res);
			// 支付订单跳转到订单页面
			wx.switchTab({
				url: "/pages/order/order"
			});
		});
	},
	// 点击编辑收货地址
	goEditPage() {
		// 跳转到编辑地址表单页面
		wx.navigateTo({
			url: "/pages/myAddress/myAddress"
		});
	},

	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function () {
		// var pages = getCurrentPages();
		// var Page = pages[pages.length - 1];//当前页
		// var prevPage = pages[pages.length - 2];  //上一个页面
		// var info = prevPage.data; //取上页data里的数据也可以修改
		// prevPage.setData({键:值 });//设置数据
		let pages = getCurrentPages();
		let prevPage = pages[pages.length - 2];  //上一个页面
		let data = prevPage.data;
		this.setData({
			shopDetail: data.shopDetail,
			orderList: data.orderList,
			totalPrice: data.totalPrice,
			discountPrice: data.discountPrice
		});
		// 设置标题
		wx.setNavigationBarTitle({
			title: "提交订单"
		});
		// 设置导航栏颜色
		wx.setNavigationBarColor({
			frontColor: "#000000",//前景颜色值
			backgroundColor: "#fff"//背景颜色值
		});
	},

	/**
   * 生命周期函数--监听页面显示
   */
	onShow: function () {
		// 获取个人信息
		request.get({
			url: "/user/getUserByOpenid"
		}).then(res => {
			let personDetail = res.data;
			let addressList = personDetail.address ? JSON.parse(personDetail.address) : [];
			let address = {};
			console.log(addressList, 1111);
			for(let i = 0; i < addressList.length; i++) {
				if(addressList[i].default) {
					address = addressList[i];
				}
			}
			console.log(address, 9989);
			this.setData({
				personDetail: personDetail,
				address: address
			});
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
