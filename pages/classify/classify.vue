<template>
  <view>
    <!-- 定位正常显示界面 -->
    <view v-if="mylongitude && mylatitude">
      <!-- 顶部标题栏 -->
      <view style="height:180rpx;background-color: #fff;">
        <view class="fix-nav" :style="{'padding-top':navtop}">
          <!-- 定位显示 -->
          <text class="nav-title">{{cityList | formatCityList}}</text>
        </view>
      </view>
      <!-- 顶部分类块 -->
      <view class="classify">
        <view class="classify-item" v-for="(item,index) in classifyList" :key="item.text" @click="gotoServiceList(item.text)">
          <image :src="item.iconSrc" mode=""></image>
          <text>{{item.text}}</text>
        </view>
      </view>
      <!-- 功能tab分区 -->
      <view class="classify-box">
        <view class="classify-tab" v-for="(item,index) in classifyTabList" :key="index">
          <view class="classify-tab-item" v-for="(item2,index2) in item.itemList" :key="item2.searchText" @click="gotoServiceList(item2.searchText)">
            <image :src="item2.iconPath" mode="" v-if="item2.iconPath"></image>
            <text :class="{'classify-tab-item-firsttext':item2.serviceText}">{{item2.firstText}}</text>
            <text v-if="item2.serviceText">{{item2.serviceText}}</text>
          </view>
        </view>
      </view>
      <!-- 导入swiper -->
      <!-- 热门服务 -->
      <!-- Swiper -->
      <view class="carousel">
        <view class="carsousel-title">
          <image src="../../static/定位.png" mode=""></image>
          <text>{{cityList|formatCityName}}</text>
        </view>
        <swiper v-if="cityList!=='定位失败'" style="height: 500rpx;" indicator-color="pink" indicator-active-color="#fff"
          next-margin="290rpx" previous-margin="-40rpx" :current="mycurrent" :indicator-dots="false" :circular="true"
          :interval="3000" :duration="1000">
          <swiper-item v-for="(item,index) in swiperList" :key="index">
            <view :class="['swiper-item',index==mycurrent ? 'active' : '']">
              <!-- {{i}} -->
              <view class="swiper-content">
                <view class="swiper-content-title">
                  <text>{{item.title}}</text>
                </view>
                <view class="swiper-content-con">
                  <view :class="{'swiper-content-con-item':item2.iconPath,'swiper-content-con-item2':item2.textBold}"
                    v-for="(item2,index2) in item.conList" :key="item2" @click="gotoServiceList(item2.searchText)">
                    <image :src="item2.iconPath" mode="" v-if="item2.iconPath"></image>
                    <text v-if="item2.text">{{item2.text}}</text>
                    <text v-if="item2.textBold" class="swiper-content-con-item-textBold">{{item2.textBold}}</text>
                  </view>
                </view>
              </view>
            </view>
          </swiper-item>
        </swiper>
      </view>
      <!-- 附近商家 -->
      <view class="nearby" v-if="nearby">
        <view class="nearby-title">
          附近商家
        </view>
        <view class="nearby-item" v-for="(item,index) in poisdatas" :key="item" @click="gotoServiceDetail(item)">
          <view class="nearby-item-left">
            <image :src="item.photos[0].url?item.photos[0].url:'https://s1.ax1x.com/2023/01/18/pS3RE0P.png'" mode=""></image>
          </view>
          <view class="nearby-item-right">
            <view class="nearby-item-right-title">
              {{item.name}}
            </view>
            <view class="nearby-item-right-address">
              {{item.address}}
            </view>
            <view class="nearby-item-right-distance">
              距您{{item.distance}}米
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 定位失败显示页面 -->
    <view class="failed-location" v-else>
      <myfalied imageSrc="https://s1.ax1x.com/2023/01/24/pSYgvM4.png" :title="'定位失败'" :tips="'当前位置难以进行定位'" @changePlace="changePlaces"></myfalied>
    </view>
  </view>
</template>

<script>
  // 导入获取经纬度方法
  import {
    mapActions,
    mapState,
    mapMutations
  } from 'vuex'
  import myfalied from '../../components/my-failed/my-failed.vue'
  // 导入获取省市区数据
  // 导入高德地图
  import amap from '../../amap-wx.130.js';
  export default {
    data() {
      return {
        // 高德地图数据
        // markers: [{}, {}, {}],
        // poisdatas: [{}, {}, {}],
        // title: 'map',
        // latitude: null, //11
        // longitude: null, //113
        // 省市区数据
        // cityList: {},
        // 顶部距离
        navtop: '',
        // 附近商家显示
        // nearby: true,
        // 功能分块数据
        classifyList: [{
            text: '家政',
            iconSrc: '../../static/classify-icons/housekeeping-icon.png'
          },
          {
            text: '保洁',
            iconSrc: '../../static/classify-icons/cleaning-icon.png'
          }, {
            text: '开锁',
            iconSrc: '../../static/classify-icons/unlock-icon.png'
          }, {
            text: '维修',
            iconSrc: '../../static/classify-icons/repair-icon.png'
          }, {
            text: '医疗',
            iconSrc: '../../static/classify-icons/medical-icon.png'
          }
        ],
        // 功能tab分区数据
        classifyTabList: [{
          itemList: [{
            firstText: '家电维修',
            serviceText: '55项服务可选',
            searchText: '家电维修'
          }, {
            iconPath: '../../static/classify-tab-icon/icon1-1.png',
            firstText: '空调维修',
            searchText: '空调维修'
          }, {
            iconPath: '../../static/classify-tab-icon/icon1-2.png',
            firstText: '电路维修',
            searchText: '电路维修'
          }, {
            iconPath: '../../static/classify-tab-icon/icon1-3.png',
            firstText: '电脑维修',
            searchText: '电脑维修'
          }]
        }, {
          itemList: [{
            firstText: '房屋维修',
            serviceText: '23项服务可选',
            searchText: '房屋维修'
          }, {
            iconPath: '../../static/classify-tab-icon/icon2-1.png',
            firstText: '家具维修',
            searchText: '家电'
          }, {
            iconPath: '../../static/classify-tab-icon/icon2-2.png',
            firstText: '补漆/防水',
            searchText: '油漆/防水'
          }, {
            iconPath: '../../static/classify-tab-icon/icon2-3.png',
            firstText: '开锁/换锁',
            searchText: '开锁'
          }]
        }, {

          itemList: [{
            firstText: '家庭保洁',
            serviceText: '31项服务可选',
            searchText: '保洁'
          }, {
            iconPath: '../../static/classify-tab-icon/icon3-1.png',
            firstText: '家电清洗',
            searchText: '家电清洗'
          }, {
            iconPath: '../../static/classify-tab-icon/icon3-2.png',
            firstText: '家政',
            searchText: '家政'
          }, {
            iconPath: '../../static/classify-tab-icon/icon3-3.png',
            firstText: '空调清洗',
            searchText: '空调清洗'
          }]
        }],
        // 热门服务数据
        swiperList: [{
          title: '热门服务',
          conList: [{
              iconPath: '../../static/service-icon/icon1.png',
              text: '日常保洁',
              searchText: '保洁'
            },
            {
              iconPath: '../../static/service-icon/icon2.png',
              text: '消毒杀菌',
              searchText: '清洁'
            },
            {
              iconPath: '../../static/service-icon/icon3.png',
              text: '电器清洗',
              searchText: '电器清洗'
            },
            {
              iconPath: '../../static/service-icon/icon4.png',
              text: '配送/跑腿',
              searchText: '配送'
            },
            {
              iconPath: '../../static/service-icon/icon5.png',
              text: '二手回收',
              searchText: '回收'
            },
            {
              iconPath: '../../static/service-icon/icon6.png',
              text: '洗衣/修鞋',
              searchText: '洗衣/修鞋'
            },
            {
              iconPath: '../../static/service-icon/icon7.png',
              text: '搬运',
              searchText: '运输'
            },
            {
              iconPath: '../../static/service-icon/icon8.png',
              text: '月嫂',
              searchText: '家政'
            },
            {
              iconPath: '../../static/service-icon/icon9.png',
              text: '保姆',
              searchText: '家政'
            }
          ]
        }, {
          title: '大家都在看',
          conList: [{
              textBold: '保姆',
              searchText: '家政'
            },
            {
              textBold: '家政',
              searchText: '家政'
            },
            {
              textBold: '小时工',
              searchText: '小时工'
            },
            {
              textBold: '叫车',
              searchText: '叫车'
            },
            {
              textBold: '照顾老人',
              searchText: '家政'
            },
            {
              textBold: '陪护',
              searchText: '家政'
            },
            {
              textBold: '护理',
              searchText: '护理'
            },
            {
              textBold: '保洁',
              searchText: '保洁'
            }
          ]
        }, {
          title: '维修服务',
          conList: [{
              iconPath: '../../static/service-icon/icon1.png',
              text: '洗衣机维修',
              searchText: '电器维修'
            },
            {
              iconPath: '../../static/service-icon/icon2.png',
              text: '油烟机维修',
              searchText: '油烟机维修'
            },
            {
              iconPath: '../../static/service-icon/icon3.png',
              text: '手机维修',
              searchText: '手机维修'
            },
            {
              iconPath: '../../static/service-icon/icon4.png',
              text: '水管头维修',
              searchText: '家庭维修'
            },
            {
              iconPath: '../../static/service-icon/icon5.png',
              text: '下水道疏通',
              searchText: '维修'
            },
            {
              iconPath: '../../static/service-icon/icon6.png',
              text: '防水补漏',
              searchText: '补漏'
            },
            {
              iconPath: '../../static/service-icon/icon7.png',
              text: '门窗维修',
              searchText: '门窗'
            },
            {
              iconPath: '../../static/service-icon/icon8.png',
              text: '卫浴维修',
              searchText: '卫浴'
            },
            {
              iconPath: '../../static/service-icon/icon9.png',
              text: '水电暖',
              searchText: '电暖'
            }
          ]
        }, {
          title: '清洗/除虫仪/空气净化',
          conList: [{
              textBold: '洗衣机清洗',
              searchText: '电器清洗'
            },
            {
              textBold: '油烟机清洗',
              searchText: '电器清洗'
            },
            {
              textBold: '沙发清洗',
              searchText: '家具清洗'
            },
            {
              textBold: '地毯清洗',
              searchText: '保洁'
            },
            {
              textBold: '热水器清洗',
              searchText: '电器清洗'
            },
            {
              textBold: '冰箱清洗',
              searchText: '电器清洗'
            },
            {
              textBold: '除虫除蚁',
              searchText: '保洁'
            },
            {
              textBold: '除甲醛',
              searchText: '保洁'
            }
          ]
        }]
      };
    },
    methods: {
      // 将经纬度保存到state中
      ...mapMutations({
        saveLoaction: 'pois/saveLoaction'
      }),
      ...mapActions({
        getLocation: 'pois/getLocation',
        getLongitude: 'pois/getLongitude'
      }),
      // 点击跳转到服务详情页
      gotoServiceDetail(item) {
        uni.navigateTo({
          url: '../../subpkg/service_detail/service_detail?service=' + JSON.stringify(item)
        })
      },
      // 点击跳转到服务列表页
      gotoServiceList(item) {
        uni.navigateTo({
          url: '/subpkg/service_list/service_list?text=' + item + '&cityCode=' + this.cityList.citycode
        })
      },
      // 获取子组件传来的数据
      changePlaces(data) {
        console.log(data)
        var location = data.location.split(',')
        this.getLocation({
          mylatitude:location[1],
          mylongitude:location[0]
        })
      },
    },
    created() {
      uni.showToast({
        title: '数据加载中',
        duration: 2000,
        icon: 'loading'
      }).then(
        this.getLongitude()
      )
    },
    beforeMount() {},
    onLoad() {
      this.$getNavTop()
    },
    mounted() {},
    updated() {},
    onPullDownRefresh() {
      const timer = setTimeout(function() {
        uni.stopPullDownRefresh()
      })
    },
    filters: {
      // 中间城区附近格式
      formatCityName(value) {
        // 判断数组是否为空
        if (typeof(value) == 'object' && value.length <= 0) {
          return '定位失败';
        } else {
          return value.district.substr(0, 2) + value.township.substr(0, 2) + '城区附近';
        }
      },
      // 顶部定位显示格式
      formatCityList(value) {
        if (typeof(value) == 'object' && value.length <= 0) {
          return '定位失败'
        } else {
          return value.district + '·' + value.township
        }
      }
    },
    computed: {
      ...mapState({
        //当前纬度
        mylatitude: state => state.pois.mylatitude,
        // 当前经度
        mylongitude: state => state.pois.mylongitude,
        // 当前城市数据
        cityList: state => state.pois.cityList,
        // 当前附近信息
        poisdatas: state => state.pois.poisdatas,
        // 是否显示附近商家信息
        nearby:state => state.pois.nearby
      })
    },
    watch: {},
    components: {
      myfalied
    }
  }
</script>

<style lang="scss">
  // 字体样式顺序：颜色、大小、粗细
  // 顶部定位信息样式
  $topTitleFontColor: #000; //字体颜色
  $topTitleFontSize:34rpx; //字体大小
  $topTitleFontWeight:700; //字体粗细
  // 五个功能分块样式
  $classifyTextColor:#5b5b5b;
  $classifyTextSize:30rpx;
  $classifyTextWeight:500;

  // 家电维修等样式
  $classifyTabRadius:20rpx; //四周圆角边框大小
  // 加粗字体样式(家电维修、房屋维修等标题)
  $classifyTabTitleColor:#000;
  $classifyTabTitleSize:32rpx;
  $classifyTabTitleWeight:700;
  // 图标下方、标题下方的字体样式
  $classifyTabTextSize:20rpx;
  $classifyTabTextColor:#6d767b;
  // 背景渐变(家电维修)
  $houseHoldStartColor:#cbeffb;
  $houseHoldEndColor:#edfaff;
  // 背景渐变(房屋维修)
  $houseStartColor:#fdf2c4;
  $houseEndColor:#fdfbec;
  // 背景渐变(家庭保洁)
  $cleanStartColor:#e1fbe2;
  $cleanEndColor:#f3fdf4;

  // 热门服务样式
  // 显示附近位置样式
  $carouselTitleColor:#000;
  $carouselTitleSize:33rpx;
  $carouselTitleWeight:700;
  // 热门服务轮播样式
  $carouselSwiperBorderWidth:2px; //边框粗细
  $carouselSwiperBorderColor:#f2ede9; //边框颜色
  $carouselSwiperBgc:#fefefe; //背景色
  // 热门服务轮播内容样式
  $carouselSwiperTitleColor:#000;
  $carouselSwiperTitleSize:35rpx;
  $carouselSwiperTitleWeigth:700;

  // 附近商家样式
  // 附近商家
  $nearbyTitleColor:#000;
  $nearbyTitleSize:35rpx;
  $nearbyTitleWeight:700;
  // 商家列表样式
  // 商家列表背景色
  $nearbyItemBgc:#fcfcfc;
  // 列表项上间距
  $nearbyItemMarginTop:40rpx;
  // 商家名称
  $nearbyShopNameColor:#000;
  $nearbyShopNameSize:33rpx;
  $nearbyShopNameWeight:700;
  // 商家地址
  $nearbyShopAddressFontColor:#000;
  $nearbyShopAddressFontSize:25rpx;
  $nearbyShopAddressFontWeight:600;
  // 商家距离
  $nearbyShopDistanceFontColor:#666;
  $nearbyShopDistanceFontSize:24rpx;
  $nearbyShopDistanceFontWeight:700;


  // 顶部标题栏
  .fix-nav {
    width: 100%;
    line-height: 40px;
    text-align: center;
    background-color: #fff;
  }

  .nav-title {
    color: $topTitleFontColor;
    font-size: $topTitleFontSize;
    font-weight: $topTitleFontWeight;
    letter-spacing: 4rpx;
  }

  // 分类功能块
  .classify {
    width: 100%;
    height: 175rpx;
    background-color: #fff;
    display: flex;
    justify-content: space-around;

    // 顶部五个item项
    .classify-item {
      width: 25%;
      height: 100%;
      // background-color: red;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      image {
        width: 70rpx;
        height: 70rpx;
      }

      text {
        color: $classifyTextColor;
        font-size: $classifyTextSize;
        font-weight: $classifyTextWeight;
      }
    }
  }

  // 功能tab分区
  .classify-box {
    width: 95%;
    height: 420rpx;
    // background-color: red;
    margin: 0 auto;
    margin-top: 10rpx;

    .classify-tab {
      height: 140rpx;
      width: 100%;
      display: flex;
      // background-color: red;
      // background: repeating-linear-gradient(to right, #cbeffb, #edfaff);

      &:first-child {
        border-top-left-radius: $classifyTabRadius;
        border-top-right-radius: $classifyTabRadius;
        background: repeating-linear-gradient(to right, $houseHoldStartColor, $houseHoldEndColor);
      }

      &:nth-child(2) {
        background: repeating-linear-gradient(to right, $houseStartColor, $houseEndColor);
      }

      &:last-child {
        border-bottom-left-radius: $classifyTabRadius;
        border-bottom-right-radius: $classifyTabRadius;
        background: repeating-linear-gradient(to right, $cleanStartColor, $cleanEndColor);
      }

      .classify-tab-item {
        height: 100%;
        width: 24%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid #fff;

        &:first-child {
          width: 30%;
        }

        image {
          width: 50rpx;
          height: 50rpx;
        }

        text {
          font-size: $classifyTabTextSize;
          color: $classifyTabTextColor;
        }

        .classify-tab-item-firsttext {
          font-size: $classifyTabTitleSize;
          font-weight: $classifyTabTitleWeight;
          color: $classifyTabTitleColor;
          padding-bottom: 5rpx;
        }
      }
    }
  }

  // 热门服务
  .carousel {
    position: relative;
    margin-top: 30rpx;

    .carsousel-title {
      height: 50rpx;
      width: 95%;
      margin: 0 auto;
      margin-bottom: 30rpx;
      // background-color: pink;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 20rpx;
      margin-bottom: -27rpx;

      image {
        width: 50rpx;
        height: 50rpx;
      }

      text {
        font-size: $carouselTitleSize;
        font-weight: $carouselTitleWeight;
        color: $carouselTitleColor;
      }
    }

    .swiper-item {
      overflow: hidden;
      height: 100%;
      width: 265px;
      border-radius: 20rpx;
      border: $carouselSwiperBorderWidth solid $carouselSwiperBorderColor;
      background-color: $carouselSwiperBgc;
      transform: scale(0.8);
      transition: all 0.5s ease;
      text-align: left;
      transition: all 0.5s ease-in-out;
    }

    // 热门服务子项
    .swiper-content {
      height: 100%;

      .swiper-content-title {
        width: 100%;
        height: 100rpx;

        text {
          color: $carouselSwiperTitleColor;
          font-size: $carouselSwiperTitleSize;
          font-weight: $carouselSwiperTitleWeigth;
          padding-left: 20rpx;
          line-height: 100rpx;
        }
      }

      .swiper-content-con {
        height: 405rpx;
        width: 100%;
        // background-color: purple;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        .swiper-content-con-item2 {
          width: 40%;
          height: 80rpx;
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-wrap: wrap;
          // background-color: pink;
          box-shadow: 1rpx 1rpx 10rpx #e8e8e8;

          .swiper-content-con-item-textBold {
            font-size: 30rpx;
            color: #000;
            font-weight: 550;
          }
        }

        .swiper-content-con-item {
          width: 33.33%;
          height: 135rpx;
          // background-color: yellow;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;

          image {
            width: 60rpx;
            height: 60rpx;
          }

          text {
            font-size: 30rpx;
            color: #a3a3a3;
          }

        }
      }
    }
  }

  // 附近商家
  .nearby {
    width: 95%;
    margin: 0 auto;

    // background-color: pink;
    .nearby-title {
      color: $nearbyTitleColor;
      font-size: $nearbyTitleSize;
      font-weight: $nearbyTitleWeight;
    }

    .nearby-item {
      // height: 160rpx;
      width: 100%;
      display: flex;
      margin-top: $nearbyItemMarginTop;
      background-color: $nearbyItemBgc;

      .nearby-item-left {
        width: 160rpx;
        height: 100%;
        border-radius: 10rpx;

        image {
          width: 100%;
          height: 160rpx;
          border-radius: 10rpx;
        }
      }

      .nearby-item-right {
        position: relative;
        width: 70%;
        margin-left: 10rpx;

        view {
          padding: 5rpx 15rpx;
        }

        .nearby-item-right-title {
          font-size: $nearbyShopNameSize;
          font-weight: $nearbyShopNameWeight;
          color: $nearbyShopNameColor;
        }

        .nearby-item-right-address {
          font-size: $nearbyShopAddressFontSize;
          font-weight: $nearbyShopAddressFontWeight;
          color: $nearbyShopAddressFontColor;
        }

        .nearby-item-right-distance {
          font-size: $nearbyShopDistanceFontSize;
          font-weight: $nearbyShopDistanceFontWeight;
          color: $nearbyShopDistanceFontColor;
        }
      }
    }
  }

  // 弹出层样式
  .popup {
    // height: 100%;
    width: 100%;
    background-color: #fff;
    text-align: center;

    .scroll-y {
      height: 500rpx;
      width: 100%;
    }

    .list-title {
      margin: 30rpx 0;
      padding-top: 30rpx;
      font-size: 35rpx;
      font-weight: 700;
      color: #000;
    }

    .list-item {
      padding: 15rpx 0;
      font-size: 33rpx;
    }
  }
</style>
