const app = getApp();
let baseUrl = "http://localhost:3001";
let config = {
    appid: "wx14f72b631f4a5068",
    AppSecret: "3206f5cb11411787c73baf6056a5c540",
    grant_type: "authorization_code"
};
module.exports = {
    get: (params = {}) => {
		return new Promise((resolve, reject) => {
			wx.request({
				method: 'GET',
				url: baseUrl + params.url,
                data: Object.assign({
                    appid: config.appid,
                    AppSecret: config.AppSecret,
                    grant_type: config.grant_type
                }, params.data),
                success: function(res) {
                    if(res.data && res.data.code == 200) resolve(res.data || {});
                    else{
                        wx.showModal({
                            title: '提示',
                            content: '网络异常',
                            showCancel: false
                        })
                        reject(res.data || {});
                    } 
                },
                fail: function(err) {
                    console.log(err, 80)
                    console.info("服务端错误: ", err);
                    wx.showModal({
                        title: '提示',
                        content: '网络异常',
                        showCancel: false
                    })
                    reject(err);
                }
			})
		});
	},
    post: (params = {}) => {
		return new Promise((resolve, reject) => {
			wx.request({
				method: 'POST',
				url: baseUrl + url,
                data: Object.assign({
                    appid: config.appid,
                    AppSecret: config.AppSecret,
                    grant_type: config.grant_type
                }, params.data),
                success: function(res) {
                    if(res.data && res.data.code == 200) resolve(res.data || {});
                    else{
                        wx.showModal({
                            title: '提示',
                            content: '网络异常',
                            showCancel: false
                        })
                        reject(res.data || {});
                    } 
                },
                fail: function(err) {
                    console.log(err, 80)
                    console.info("服务端错误: ", err);
                    wx.showModal({
                        title: '提示',
                        content: '网络异常',
                        showCancel: false
                    })
                    reject(err);
                }
			})
		});
	},
}
