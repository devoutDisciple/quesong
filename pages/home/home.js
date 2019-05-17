// pages/home/home.js
const app = getApp();
  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    citys: [
      {
        name: "浙江",
        children: [
          {
            name: "杭州",
            children: [
              {
                name: "杭州大学1"
              },
              {
                name: "杭州大学2"
              },
              {
                name: "杭州大学3"
              }
            ]
          },
          {
            name: "宁波",
            children: [
              {
                name: "宁波大学1"
              },
              {
                name: "宁波大学2"
              },
              {
                name: "宁波大学3"
              }
            ]
          }
        ]
      }
    ],
    campus: ["上海大学1", "上海大学2", "上海大学3", "上海大学4", "上海大学5", "上海大学6"],
    imgUrls: [
      'https://quesong.top/attachment/images/2/2019/05/TBT4K9NbZu4KbV02vKxvkRN4D7B0Y6.jpg',
      'https://quesong.top/attachment/images/2/2019/05/x9x2652Ng7K255Dh5q6F5xqCwX5xh8.jpg',
      'https://quesong.top/attachment/images/2/2019/05/DupPq4LuslujS2Ws2uETSWkwu8UfKu.jpg',
      'https://quesong.top/attachment/images/2/2019/05/sU2ruU5USkH45LH5OZ2Uxz6lb1uR28.jpg',
      'https://quesong.top/attachment/images/2/2019/05/r4lYlN3mOf3z4Oo3z9TO3o9g7mNn3l.jpg',
      'https://quesong.top/attachment/images/2/2019/04/XUll8nDpp68oy88NVIV66nL8LPWpwE.jpg'
    ],// 轮播图url
    positionDialogVisible: false, //位置弹框的开关
    interval: 5000, // 轮播图间隔时间
    duration: 1000, // 轮播图延迟时间
    goodsNum: 50, // 商品数量
    freeGoodsNum: 10,// 免费商品数量
    imgUrl: "https://quesong.top/attachment/images/2/2019/05/Cej3XdyZFkYp1pxqQYjfJMzS1jY3yZ.jpeg", // 商品图片
    // 商品种类
    type: [
      {
        name: "美食",
        icon: "star-o",
        color: "red"
      },{
        name: "美食",
        icon: "star-o",
        color: "red"
      },{
        name: "美食",
        icon: "star-o",
        color: "red"
      },{
        name: "美食",
        icon: "star-o",
        color: "red"
      },{
        name: "美食",
        icon: "star-o",
        color: "red"
      },{
        name: "美食",
        icon: "star-o",
        color: "red"
      },{
        name: "美食",
        icon: "star-o",
        color: "red"
      },
    ],
    // 位置按钮种类
    columns: [
    ],
    position: ""
  },
  // 位置弹框的开关
  onShowPositionDialog() {
    this.setData({
      positionDialogVisible: !this.data.positionDialogVisible
    })
  },
  // 改变位置的时候
  onChangePosition(event) {
    console.log(event.detail, 111)
    const { picker, value, index } = event.detail;
    // picker.setColumnValues(1, citys[value[0]]);
    if(index == 0) {
      let citys = this.citys;
      let selectKey = value[0];
      citys.map(item => {
        if(item.name == selectKey) {

        }
      })
    }
  },
  // 选取位置取消
  onCancelPosition(event) {
    console.log(event)
    // 关闭弹框
    this.onShowPositionDialog();
  },
  // 选取位置确定
  onConfirmPosition(event) {
    console.log(event.detail.value)
    // 关闭弹框
    this.onShowPositionDialog();
    this.setData({
      position: event.detail.value[2]
    })
  },
  // 点击商店
  shopClick(e) {
    let name = e.currentTarget.dataset.name;
    console.log(e.currentTarget.dataset.name);
    // 跳转到详情页
    wx.navigateTo({
      url: '../shop/shop',
      success: function() {
        // 设置标题
        wx.setNavigationBarTitle({
          title: name
        })
        // 设置导航栏颜色
        wx.setNavigationBarColor({
          frontColor: "#ffffff",//前景颜色值
          backgroundColor: "#333"//背景颜色值
        })
      }
    })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // {
    //   values: ['福州', '厦门', '莆田', '三明', '泉州'],
    //   className: 'column2'
    // },
    let columns = [
      {
        values: ["上海"],
        className: 'column1'
      },
      {
        values: ["上海"],
        className: 'column2'
      },
      {
        values: this.data.campus,
        className: 'column2'
      },
    ];
    this.setData({columns, position: this.data.campus[0]});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
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
    console.log(124)
  }
})