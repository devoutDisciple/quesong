const app = getApp();
let config = require("./config");
let baseUrl = config.baseUrl;
module.exports = {
	get: (params = {}) => {
		let position = wx.getStorageSync("campus");
		return new Promise((resolve, reject) => {
			wx.request({
				method: "GET",
				url: baseUrl + params.url,
				data: Object.assign({
					openid: app.globalData.openid || "oKw4p450ND5YU2HMpFZ0iPoVtd-I",
					position: position
				}, params.data),
				success: function(res) {
					if(res.data && res.data.code == 200) {
						resolve(res.data || {});
					}
					else{
						wx.showModal({
							title: "提示",
							content: "网络异常",
							showCancel: false
						});
						reject(res.data || {});
					}
				},
				fail: function(err) {
					console.info("服务端错误: ", err);
					wx.showModal({
						title: "提示",
						content: "网络异常",
						showCancel: false
					});
					reject(err);
				}
			});
		});
	},
	post: (params = {}) => {
		let position = wx.getStorageSync("campus");
		return new Promise((resolve, reject) => {
			wx.request({
				method: "POST",
				url: baseUrl + params.url,
				data: Object.assign({
					openid: app.globalData.openid || "oKw4p450ND5YU2HMpFZ0iPoVtd-I",
					position: position
				}, params.data),
				success: function(res) {
					if(res.data && res.data.code == 200) resolve(res.data || {});
					else{
						wx.showModal({
							title: "提示",
							content: "网络异常",
							showCancel: false
						});
						reject(res.data || {});
					}
				},
				fail: function(err) {
					console.info("服务端错误: ", err);
					wx.showModal({
						title: "提示",
						content: "网络异常",
						showCancel: false
					});
					reject(err);
				}
			});
		});
	},
};
