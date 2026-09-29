Component({
  options: {
    addGlobalClass: true,
  },

  properties: {
    id: {
      type: String,
      value: '',
      observer(id) {
        this.genIndependentID(id);
        if (this.properties.thresholds?.length) {
          this.createIntersectionObserverHandle();
        }
      },
    },
    data: {
      type: Object,
      observer(data) {
        if (!data) {
          return;
        }
        let isValidityLinePrice = true;
        if (data.originPrice && data.price && data.originPrice < data.price) {
          isValidityLinePrice = false;
        }
        this.setData({ goods: data, isValidityLinePrice });
      },
    },
    currency: {
      type: String,
      value: '¥',
    },

    thresholds: {
      type: Array,
      value: [],
      observer(thresholds) {
        if (thresholds && thresholds.length) {
          this.createIntersectionObserverHandle();
        } else {
          this.clearIntersectionObserverHandle();
        }
      },
    },
  },

  data: {
    independentID: '',
    goods: { id: '' },
    isValidityLinePrice: false,
    showCardModal: false,
    cardInfo: [
      {
        avatar: '',
        name: '邱标',
        title: '山苏总负责人',
        phone: '13726964858',
        wechat: 'D376152841',
      },
      {
        avatar: '',
        name: '赖女士',
        title: '山苏销售负责人',
        phone: '15915123972',
        wechat: 'ads123321123321',
      },
    ],
  },

  lifetimes: {
    ready() {
      this.init();
      this.setData({
        'cardInfo[0].avatar': 'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/image/fuzeren.jpg',
        'cardInfo[1].avatar': 'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/image/shansu5.jpg',
      });
    },
    detached() {
      this.clear();
    },
  },

  pageLifeTimes: {},

  methods: {
    clickThumbHandle() {
      this.triggerEvent('thumb', { goods: this.data.goods });
    },

    genIndependentID(id) {
      let independentID;
      if (id) {
        independentID = id;
      } else {
        independentID = `goods-card-${~~(Math.random() * 10 ** 8)}`;
      }
      this.setData({ independentID });
    },

    init() {
      const { thresholds, id } = this.properties;
      this.genIndependentID(id);
      if (thresholds && thresholds.length) {
        this.createIntersectionObserverHandle();
      }
    },

    clear() {
      this.clearIntersectionObserverHandle();
    },

    intersectionObserverContext: null,

    createIntersectionObserverHandle() {
      if (this.intersectionObserverContext || !this.data.independentID) {
        return;
      }
      this.intersectionObserverContext = this.createIntersectionObserver({
        thresholds: this.properties.thresholds,
      }).relativeToViewport();

      this.intersectionObserverContext.observe(`#${this.data.independentID}`, (res) => {
        this.intersectionObserverCB(res);
      });
    },

    intersectionObserverCB() {
      this.triggerEvent('ob', {
        goods: this.data.goods,
        context: this.intersectionObserverContext,
      });
    },

    clearIntersectionObserverHandle() {
      if (this.intersectionObserverContext) {
        try {
          this.intersectionObserverContext.disconnect();
        } catch (e) {}
        this.intersectionObserverContext = null;
      }
    },

    handleBooking() {
      console.log('点击预约按钮，当前 showCardModal:', this.data.showCardModal);
      this.setData(
        {
          showCardModal: true,
        },
        () => {
          console.log('设置后 showCardModal:', this.data.showCardModal);
        },
      );
    },

    closeModal() {
      this.setData({
        showCardModal: false,
      });
    },

    onVisibleChange(e) {
      const visible = e.detail.visible;
      this.setData({
        showCardModal: visible,
      });
    },

    copyWechat(e) {
      const wechat = e.currentTarget.dataset.wechat;

      wx.setClipboardData({
        data: wechat,
        success: () => {
          wx.showModal({
            title: '添加联系人',
            content: '微信号已复制，请打开微信添加好友',
            showCancel: false,
            confirmText: '确定',
            success: () => {
              this.setData({
                showCardModal: false,
              });
            },
          });
        },
      });
    },

    selectScene(e) {
      const scene = e.currentTarget.dataset.scene;
      if (!scene || !scene.panorama) {
        return;
      }

      wxPano.navigateMethod({
        type: 'pano',
        entryname: scene.name,
      });

      this.setData({
        showSceneModal: false,
      });
    },

    preventTap() {
      return;
    },
  },
});
