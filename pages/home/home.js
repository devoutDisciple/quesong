// pages/home/home.js
const app = getApp();
const request = require("../../utils/request");
const config = require("../../utils/config");
Page({

	/**
   * 页面的初始数据
   */
	data: {
		positionDialogVisible: false, //位置弹框的开关
		interval: 5000, // 轮播图间隔时间
		duration: 1000, // 轮播图延迟时间
		goodsNum: 50, // 商品数量
		freeGoodsNum: 10,// 免费商品数量
		imgUrl: "https://quesong.top/attachment/images/2/2019/05/Cej3XdyZFkYp1pxqQYjfJMzS1jY3yZ.jpeg", // 商品图片
		// 轮播图url
		swiperUrls: [
		],
		// 商品种类
		type: [
		],
		// 位置按钮种类
		columns: [
		],
		position: "",
		// 商店信息
		shop: []
	},
	// 位置弹框的开关
	onShowPositionDialog() {
		this.setData({
			positionDialogVisible: !this.data.positionDialogVisible
		});
	},
	// 改变位置的时候
	onChangePosition(event) {
		console.log(event.detail, "change position");
		// const { picker, value, index } = event.detail;
		// picker.setColumnValues(1, citys[value[0]]);
		// if(index == 0) {
		// let citys = this.citys;
		// let selectKey = value[0];
		// citys.map(item => {
		// 	// if(item.name == selectKey) {
		// 	// }
		// });
		// }
	},
	// 选取位置取消
	onCancelPosition() {
		// 关闭弹框
		this.onShowPositionDialog();
	},
	// 选取位置确定
	onConfirmPosition(event) {
		console.log(event.detail.value, "position sure");
		// 关闭弹框
		this.onShowPositionDialog();
		this.setData({
			position: event.detail.value[2]
		});
	},
	// 点击商店
	shopClick(e) {
		let id = e.currentTarget.dataset.id;
		console.log(id);
		// 跳转到详情页
		wx.navigateTo({
			url: `/pages/shop/shop?id=${id}`
		});
	},
	// type点击
	toTypeListPage() {
		// 跳转到type页面
		wx.navigateTo({
			url: "/pages/type/type"
		});
	},


	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function () {
		// 获取用户数据
		wx.login({
			success: res => {
				let code = res.code || "";
				request.get({
					url: "/user/register",
					data: {
						code: code,
						appid: config.appid,
						AppSecret: config.AppSecret,
						grant_type: config.grant_type,
					}
				}).then(res => {
					console.log(res, 11);
					app.globalData.openid = res.data;
				});
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
			}
		});
		// 获取轮播图数据
		request.get({
			url: "/swiper/all"
		}).then(res => {
			this.setData({
				swiperUrls: res.data || []
			});
		});
		// 获取商品类型分类
		request.get({
			url: "/type/all"
		}).then(res => {
			this.setData({
				type: res.data || []
			});
		});
		// 获取位置信息
		request.get({
			url: "/position/all"
		}).then(res => {
			this.setData({
				columns: [
					{
						values: ["上海"],
						className: "column1"
					},
					{
						values: ["上海"],
						className: "column2"
					},
					{
						values: res.data.map(item => {
							return item.name;
						}),
						className: "column3"
					},
				],
				position: res.data[0].name || "未知区域"
			});
		});
		// 获取商店列表
		request.get({
			url: "/shop/all"
		}).then(res => {
			let data = res.data || [];
			data.map(item => {
				let special = item.special.includes("@@") ? item.special.split("@@") : [];
				let tempData = [];
				special.map(item2 => {
					let tempData2 = item2.split(",");
					tempData.push({
						origin: tempData2[0].split("=")[1],
						discount: tempData2[1].split("=")[1],
					});
				});
				item.special = tempData;
			});
			this.setData({
				shop: data || []
			});
		});
	},

	/**
   * 生命周期函数--监听页面初次渲染完成
   */
	onReady: function () {
		const updateManager = wx.getUpdateManager();
		updateManager.onUpdateReady(function () {
			wx.showModal({
				title: "更新提示",
				content: "新版本已经准备好，是否重启应用？",
				success(res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate();
					}
				}
			});
		});
	},

	/**
   * 生命周期函数--监听页面显示
   */
	onShow: function () {
		// 设置标题
		wx.setNavigationBarTitle({
			title: "雀送"
		});
		// 设置导航栏颜色
		wx.setNavigationBarColor({
			frontColor: "#000000",//前景颜色值
			backgroundColor: "#ffffff"//背景颜色值
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
	},

	// 按条件遍历
	// circulationByCondition(citys, columns, name) {
	//   let column = {
	//     values: []
	//   };
	//   citys.map((item,index) => {
	//     column.values.push(item.name);
	//     if(name) {
	//       if(item.children && item.children.length != 0 && item.name == name) {
	//         this.circulation(item.children, columns, "")
	//       }
	//     } else {
	//       if(item.children && item.children.length != 0 && index == 0) {
	//         this.circulation(item.children, columns, "")
	//       }
	//     }

	//   })
	//   this.circulation(item.children, columns)
	//   return columns;
	// },

	// // 遍历城市
	// circulation(citys, columns) {
	//   let column = {
	//     values: []
	//   };
	//   citys.map((item,index) => {
	//     column.values.push(item.name);
	//     if(item.children && item.children.length != 0 && index== 0) {
	//       this.circulation(item.children, columns)
	//     }
	//   })
	//   columns.unshift(column);
	//   return columns;
	// },
});
