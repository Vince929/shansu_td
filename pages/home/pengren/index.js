Page({
  data: {
    tabValue: 0,
    tabList: [
      { value: 0, label: '炒' },
      { value: 1, label: '煮' },
      { value: 2, label: '凉拌' },
    ],
    recipeList: [
      {
        id: 1,
        name: '丁香炒山苏',
        image:
          'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/image/home/pengren/dingxiang.jpg',
        isExpanded: false,
        imageLoaded: false,
        method: '1. 准备食材\n2. 热锅下油\n3. 爆香丁香\n4. 放入山苏翻炒\n5. 适量调味即可', // 示例烹饪方法
        type: 0,
      },
      {
        id: 2,
        name: '豆豉鲮鱼',
        image:
          'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/image/home/pengren/douchilingyu.jpg',
        isExpanded: false,
        imageLoaded: false,
        method: '1. 准备食材\n2. 热锅下油\n3. 爆香豆豉\n4. 加入鲮鱼\n5. 放入山苏翻炒\n6. 适量调味即可',
        type: 0,
      },
      {
        id: 3,
        name: '凉拌山苏',
        image:
          'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/image/home/pengren/liangban.jpg',
        isExpanded: false,
        imageLoaded: false,
        method: '1. 准备食材\n2. 山苏焯水\n3. 调制凉拌汁\n4. 拌匀即可',
        type: 2,
      },
      {
        id: 4,
        name: '山苏炒肉',
        image:
          'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/image/home/pengren/shansuchaorou.jpg',
        isExpanded: false,
        imageLoaded: false,
        method: '1. 准备食材\n2. 热锅下油\n3. 爆炒肉片\n4. 加入山苏\n5. 适量调味即可',
        type: 0,
      },
      {
        id: 5,
        name: '山药水煮山苏',
        image: 'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/image/home/pengren/shuizhi.jpg',
        isExpanded: false,
        imageLoaded: false,
        method: '1. 准备食材\n2. 山药切片\n3. 锅中加水烧开\n4. 放入山药和山苏\n5. 煮至合适火候调味即可',
        type: 1,
      },
      {
        id: 6,
        name: '蒜蓉炒山苏',
        image:
          'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/image/home/pengren/suanrong.jpg',
        isExpanded: false,
        imageLoaded: false,
        method: '1. 准备食材\n2. 蒜末备用\n3. 热锅下油\n4. 爆香蒜末\n5. 放入山苏翻炒\n6. 适量调味即可',
        type: 0,
      },
      {
        id: 7,
        name: '小鱼干炒山苏',
        image:
          'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/image/home/pengren/xiaoyugan.jpg',
        isExpanded: false,
        imageLoaded: false,
        method: '1. 准备食材\n2. 热锅下油\n3. 爆香小鱼干\n4. 放入山苏翻炒\n5. 适量调味即可',
        type: 0,
      },
      {
        id: 8,
        name: '樱花虾炒山苏',
        image:
          'https://shansu-1304271127.cos.ap-guangzhou.myqcloud.com/image/home/pengren/yinghuaxia.png',
        isExpanded: false,
        imageLoaded: false,
        method: '1. 准备食材\n2. 热锅下油\n3. 爆香樱花虾\n4. 放入山苏翻炒\n5. 适量调味即可',
        type: 0,
      },
    ],
    filteredRecipes: {},
  },

  onLoad() {
    this.initFilteredRecipes();
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

  initFilteredRecipes() {
    const filteredRecipes = {
      0: [], // 炒
      1: [], // 煮
      2: [], // 凉拌
    };

    // Add imageLoaded property to each recipe
    const recipesWithLoadingState = this.data.recipeList.map(recipe => ({
      ...recipe,
      imageLoaded: false,
    }));

    recipesWithLoadingState.forEach((recipe) => {
      filteredRecipes[recipe.type].push(recipe);
    });

    this.setData({ filteredRecipes });
  },

  onTabChange(e) {
    this.setData({
      tabValue: e.detail.value,
    });
  },

  toggleExpand(e) {
    const { index } = e.currentTarget.dataset;
    const currentTab = this.data.tabValue;

    // 创建一个新的数组来避免直接修改状态
    const updatedRecipes = [...this.data.filteredRecipes[currentTab]];
    updatedRecipes[index] = {
      ...updatedRecipes[index],
      isExpanded: !updatedRecipes[index].isExpanded,
    };

    // 更新状态
    this.setData({
      [`filteredRecipes.${currentTab}`]: updatedRecipes,
    });
  },

  getFilteredRecipes() {
    const currentCategory = this.data.tabList[this.data.tabValue];
    if (!currentCategory) return [];
    return this.data.filteredRecipes[currentCategory.value];
  },

  onImageLoad(e) {
    const { index } = e.currentTarget.dataset;
    const currentTab = this.data.tabValue;
    
    // Create a new array to avoid directly modifying state
    const updatedRecipes = [...this.data.filteredRecipes[currentTab]];
    updatedRecipes[index] = {
      ...updatedRecipes[index],
      imageLoaded: true,
    };

    // Update state
    this.setData({
      [`filteredRecipes.${currentTab}`]: updatedRecipes,
    });
  },
});
