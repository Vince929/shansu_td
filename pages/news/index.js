Page({
  data: {
    newsList: [],
  },

  async onLoad() {
    // 先定义新闻数据
    const newsData = [
      {
        id: 0,
        title: '惊喜！高端特色农业项目落户饶平上饶镇——饶平县上饶镇山苏种植基地举行开种仪式',
        cloudPath: 'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/image/news1.jpg',
        pdfUrl:
          'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/others/惊喜！高端特色农业项目落户饶平上饶镇——饶平县上饶镇山苏种植基地举行开种仪式.pdf',
        date: '2025-02-27',
        views: 5149
      },
      {
        id: 1,
        title: '上饶镇驻镇帮镇扶村工作队工作简报（2025年第7期）',
        cloudPath: 'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/image/news1.jpg',
        pdfUrl:
          'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/others/上饶镇驻镇帮镇扶村工作队工作简报（2025年第7期）.pdf',
        date: '2025-02-27',
        views: 3049,
      },
      {
        id: 2,
        title: '清远市清城区石角镇：蔬菜采收忙 农户喜洋洋',
        cloudPath: 'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/image/shansu6.jpg',
        pdfUrl:
          'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/others/清远市清城区石角镇：蔬菜采收忙 农户喜洋洋.pdf',
        date: '2023-12-08',
        views: 235,
      },
      {
        id: 3,
        title: '龙南：台湾"山苏花"开"致富花"',
        cloudPath: 'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/image/longnanfuguihua.png',
        pdfUrl:
          'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/others/龙南：台湾"山苏花"开"致富花".pdf',
        date: '2020-09-16',
        views: 2794,
      },
      {
        id: 4,
        title: '新型食用蔬菜鸟巢蕨嫩叶营养成分检测_徐诗涛',
        cloudPath: 'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/image/shansu7.jpg',
        pdfUrl:
          'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/others/新型食用蔬菜鸟巢蕨嫩叶营养成分检测_徐诗涛.pdf',
        date: '2012-01-01',
        views: 1879,
      },
    ];

    const newsList = newsData.map((item) => ({
      ...item,
      image: item.cloudPath,
    }));

    this.setData({ newsList });
  },

  async onNewsClick(e) {
    const { id } = e.currentTarget.dataset;
    const newsItem = this.data.newsList.find((item) => item.id === id);
    console.log('准备打开PDF，新闻项：', newsItem);

    if (!newsItem || !newsItem.pdfUrl) {
      console.error('未找到新闻项或PDF链接');
      wx.showToast({
        title: '文件不存在',
        icon: 'none',
      });
      return;
    }

    try {
      wx.showLoading({
        title: '加载中...',
      });

      // 下载PDF文件
      const res = await wx.downloadFile({
        url: newsItem.pdfUrl,
      });

      if (!res.tempFilePath) {
        throw new Error('下载失败');
      }

      // 打开文档
      wx.openDocument({
        filePath: res.tempFilePath,
        showMenu: true,
        success: function (res) {
          console.log('打开文档成功');
        },
        fail: function (error) {
          console.error('打开文档失败：', error);
          wx.showToast({
            title: '文件打开失败',
            icon: 'none',
          });
        },
        complete: function () {
          wx.hideLoading();
        },
      });
    } catch (error) {
      console.error('处理PDF文件失败：', error);
      wx.showToast({
        title: '文件加载失败',
        icon: 'none',
      });
      wx.hideLoading();
    }
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1,
      });
    }
  },

  // 添加分享功能
  onShareAppMessage() {
    return {
      title: '翡翠绿山苏',
      path: '/pages/news/index',
      imageUrl: getApp().globalData?.shareImageUrl,
    };
  },

  onShareTimeline() {
    return {
      title: '翡翠绿山苏',
      query: '',
      imageUrl: getApp().globalData?.shareImageUrl,
    };
  },
});
