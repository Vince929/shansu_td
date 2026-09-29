Page({
  data: {
    tabValue: '0',
    products: {
      tea: {
        title: '山苏茶',
        description: '山苏茶具有清香怡人的口感，富含多种维生素和矿物质，是一款健康养生的天然饮品。',
        images: [
          'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/image/home/fujia/shansucha/shansucha1.jpg',
          'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/image/home/fujia/shansucha/shansucha2.jpg',
          'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/image/home/fujia/shansucha/shansucha3.jpg',
        ].map(url => ({ url, loaded: false })),
        details: [
          '营养价值：富含维生素C、维生素E、钾、镁等多种营养物质',
          '功效：具有清热解暑、提神醒脑的功效',
          '特点：清香持久，回甘悠长',
          '制作：采用传统工艺精制而成，保留了山苏的天然营养',
        ],
        isExpanded: true
      },
      bonsai: {
        title: '山苏盆景',
        description: '山苏盆景造型优美，具有很高的观赏价值，是室内装饰的理想选择。',
        images: [
          'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/image/home/fujia/pengjing/1.jpg',
          'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/image/home/fujia/pengjing/2.jpg',
          'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/image/home/fujia/pengjing/3.jpg',
        ].map(url => ({ url, loaded: false })),
        details: [
          '艺术价值：融合传统盆景艺术与山苏植物特色',
          '观赏特点：四季常青，造型优美',
          '养护方法：喜阴凉环境，需要适当遮阳',
          '应用场景：适合家居、办公室等室内环境摆放',
        ],
        isExpanded: true
      }
    },
  },

  onTabChange(e) {
    this.setData({
      tabValue: e.detail.value,
    });
  },

  toggleDetails(e) {
    const { type } = e.currentTarget.dataset;
    const key = `products.${type}.isExpanded`;
    this.setData({
      [key]: !this.data.products[type].isExpanded,
    });
  },

  onImageLoad(e) {
    const { type, index } = e.currentTarget.dataset;
    this.setData({
      [`products.${type}.images[${index}].loaded`]: true
    });
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

  previewImage(e) {
    const { type, index } = e.currentTarget.dataset;
    const images = this.data.products[type].images;

    wx.previewImage({
      current: images[index].url,
      urls: images.map(item => item.url),
    });
  },
});
