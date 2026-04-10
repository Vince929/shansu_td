Page({
  data: {
    posterUrl: '',
    posterLoaded: false,
    files: [
      {
        fileID:
          'cloud://cloud1-0gys80m48da147a1.636c-cloud1-0gys80m48da147a1-1304271127/others/惊喜！高端特色农业项目落户饶平上饶镇——饶平县上饶镇山苏种植基地举行开种仪式.pdf',
        name: '高端特色农业项目落户饶平上饶镇——饶平县上饶镇山苏种植基地举行开种仪式',
      },
      {
        fileID:
          'cloud://cloud1-0gys80m48da147a1.636c-cloud1-0gys80m48da147a1-1304271127/others/上饶镇驻镇帮镇扶村工作队工作简报（2025年第7期）.pdf',
        name: '上饶镇驻镇帮镇扶村工作队工作简报（2025年第7期）',
      },
      {
        fileID:
          'cloud://cloud1-0gys80m48da147a1.636c-cloud1-0gys80m48da147a1-1304271127/others/新型食用蔬菜鸟巢蕨嫩叶营养成分检测_徐诗涛.pdf',
        name: '山苏营养成分检测',
      },
      {
        fileID: 'cloud://cloud1-0gys80m48da147a1.636c-cloud1-0gys80m48da147a1-1304271127/others/山苏.pdf',
        name: '山苏无农残海关检测报告',
      },
      {
        fileID:
          'cloud://cloud1-0gys80m48da147a1.636c-cloud1-0gys80m48da147a1-1304271127/others/清远市清城区石角镇：蔬菜采收忙 农户喜洋洋.pdf',
        name: '清远市清城区石角镇：蔬菜采收忙 农户喜洋洋',
      },
      {
        fileID:
          'cloud://cloud1-0gys80m48da147a1.636c-cloud1-0gys80m48da147a1-1304271127/others/龙南：台湾“山苏花”开“致富花”.pdf',
        name: '龙南：台湾"山苏花"开"致富花"',
      },
    ],
  },

  onLoad() {
    this.loadPosterImage();
  },

  // 添加分享功能
  onShareAppMessage() {
    return {
      title: '翡翠绿山苏',
      path: '/pages/home/home',
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

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0, // 全景VR的索引是2
      });
    }
  },

  async loadPosterImage() {
    try {
      const { fileList } = await wx.cloud.getTempFileURL({
        fileList: [
          {
            fileID: 'cloud://cloud1-0gys80m48da147a1.636c-cloud1-0gys80m48da147a1-1304271127/image/home/haibao-4.jpeg',
            maxAge: 31536000,
          },
        ],
      });

      this.setData({
        posterUrl: fileList[0].tempFileURL,
      });
    } catch (err) {
      console.error('获取海报图片失败：', err);
    }
  },

  onPosterLoad() {
    this.setData({
      posterLoaded: true,
    });
  },

  goToNutrition() {
    wx.navigateTo({
      url: '/pages/home/yingyang/index',
    });
  },

  goToCooking() {
    wx.navigateTo({
      url: '/pages/home/pengren/index',
    });
  },

  goToFujia() {
    wx.navigateTo({
      url: '/pages/home/fujia/index',
    });
  },

  downloadFile(e) {
    const { index } = e.currentTarget.dataset;
    const file = this.data.files[index];

    wx.showLoading({
      title: '文件下载中...',
    });

    wx.cloud.downloadFile({
      fileID: file.fileID,
      success: (res) => {
        wx.hideLoading();
        const filePath = res.tempFilePath;
        wx.openDocument({
          filePath: filePath,
          success: function () {
            console.log('打开文档成功');
          },
          fail: function (error) {
            console.error('打开文档失败', error);
            wx.showToast({
              title: '打开文件失败',
              icon: 'none',
            });
          },
        });
      },
      fail: (error) => {
        console.error('下载失败', error);
        wx.hideLoading();
        wx.showToast({
          title: '下载失败',
          icon: 'none',
        });
      },
    });
  },
});
