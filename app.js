import updateManager from './common/updateManager';

App({
  onLaunch: function () {
    this.globalData.shareImageUrl =
      'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/image/share2.jpg';
  },
  onShow: function () {
    updateManager();
  },
  globalData: {
    shareImageUrl: '',
  },
});
