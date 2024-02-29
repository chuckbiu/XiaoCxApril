<template>
  <view>
    <!-- 顶部背景图 -->
    <view class="head_bg">
      <image src="https://s1.ax1x.com/2023/01/08/pSZt2Ed.png" mode="widthFix"></image>
    </view>
    <!-- 轮播图 -->
    <swiper class="swiper" autoplay indicator-dots indicator-color="#E9E9E9" indicator-active-color="#6de5eb"
      circular>
      <swiper-item class="swiper-item" v-for="item in swiperList" :key="src">
        <image :src="item.src" mode=""></image>
      </swiper-item>
    </swiper>

    <!-- 功能区域 -->
    <view class="fun">
      <!-- 房型预订 -->
      <view class="fun-box" v-for="item in funList" :key="item.title" @click="gotoPage(item.title)">
        <!-- 标题 -->
        <text class="fun-box-title">{{item.title}}</text>
        <!-- 背景图标 -->
        <image :src="item.imgSrc" mode="" class="fun-box-bg" />
      </view>
    </view>
    <!-- 快捷入口 -->
    <view class="quick-entry">
      <!-- 快捷入口盒子 -->
      <view class="entry-box" v-for="item in quickList" :key="item.text" @click="gotoEntry(item.text)">
        <!-- 上方icon -->
        <image :src="item.imgSrc"></image>
        <!-- 下方文字 -->
        <text class="entry-text">{{item.text}}</text>
      </view>
    </view>
    <!-- 活动 -->
    <view class="activity">
      <view class="activity-top">
        <text class="activity-title">活动一览</text>
      </view>
      <!-- 活动项 -->
      <view class="activity-item" v-for="item in activityList" :key="item" @click="gotoActivttyDetail(item)">
        <!--缩略图  -->
        <image :src="item.imgUrl" mode="" class="activity-item-image" />
        <view class="activity-item-content">
          <!-- 标题 -->
          <text class="activity-item-content-title">{{item.title}}</text>
          <view class="activity-item-content-bottom">
            <text>{{item.time}}</text>
            <text class="activity-item-content-bottom-textright">{{item.view}}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapActions,
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        // 轮播图数据
        swiperList: [{
            src: 'https://s1.ax1x.com/2023/01/06/pSEMElR.jpg'
          }, {
            src: 'https://s1.ax1x.com/2023/01/06/pSEMAp9.jpg'
          },
          {
            src: 'https://s1.ax1x.com/2023/01/06/pSEMFfJ.jpg'
          },
          {
            src: 'https://s1.ax1x.com/2023/01/06/pSEMiY4.jpg'
          }
        ],
        // 功能列表数据
        funList: [{
            title: '房型预订',
            imgSrc: 'https://s1.ax1x.com/2023/01/06/pSENDaR.png'
          },
          {
            title: '生活服务',
            imgSrc: 'https://s1.ax1x.com/2023/01/06/pSENBZ9.png'
          },
          {
            title: '家政服务',
            imgSrc: 'https://s1.ax1x.com/2023/01/06/pSENrI1.png'
          }
        ],
        // 快捷入口数据
        quickList: [{
            text: '叫车',
            imgSrc: 'https://s1.ax1x.com/2023/01/07/pSVSoWD.png'
          },
          {
            text: '档案',
            imgSrc: 'https://s1.ax1x.com/2023/01/07/pSVS7Se.png'
          },
          {
            text: '紧急联系',
            imgSrc: 'https://s1.ax1x.com/2023/01/07/pSVSHQH.png'
          }
        ],
        // 活动信息数据
        activityList: [{
          id:6597498,
          title: '过活', //活动标题
          time: '2023-01-10 15:20', //发布时间
          view: '9711', //查看量
          imgUrl: 'http://p2.music.126.net/NswXe2WlYgkClhQr04D8uQ==/109951164884029758.jpg', //活动图片
          infoList: {
            createBy: '李华', //创建人
            activityPlace: '老年社区体育馆', //活动地点
            activityTime: '2021-06-25 9:00~2021-06-25 17:20', //活动时间
            deadLine: '2021-06-25 9:00', //报名截止时间
            limit: '88/100', // 当前报名人数/最大人数限制
            host: '老年社区组委会', //举办方
          },
          rule: '为了提高居民身体素质，丰富居民日常的生活，提供居民交流互动平台，增加居民幸福指数，促进和谐居民关系发展，将在体育馆进行羽毛球锦标赛。'
        }, {
          id:5522558,
          title: '慢慢等',
          time: '2023-05-06 10:20',
          view: '7340',
          imgUrl: 'http://p2.music.126.net/KPf2s3DEGaxTJU_SvOeHEg==/109951164631480844.jpg',
          infoList: {
            createBy: '李华', //创建人
            activityTime: '2021-06-25 9:00~2021-06-25 17:20', //活动时间
            deadLine: '2021-06-25 9:00', //报名截止时间
            limit: '88/100', //人数限制
            host: '老年社区组委会' //举办方
          },
          rule: '为了提高居民身体素质，丰富居民日常的生活，提供居民交流互动平台，增加居民幸福指数，促进和谐居民关系发展，将在体育馆进行羽毛球锦标赛。'
        }, {
          id:8842039,
          title: '我要找到你',
          time: '2023-01-23 12:50',
          view: '6666',
          imgUrl: 'http://p1.music.126.net/A4uSU0kJZT0xpw-S0fGg2Q==/109951164539421824.jpg',
          infoList: {
            createBy: '李华', //创建人
            activityTime: '2021-06-25 9:00~2021-06-25 17:20', //活动时间
            deadLine: '2021-06-25 9:00', //报名截止时间
            limit: '88/100', //人数限制
            host: '老年社区组委会' //举办方
          },
          rule: '为了提高居民身体素质，丰富居民日常的生活，提供居民交流互动平台，增加居民幸福指数，促进和谐居民关系发展，将在体育馆进行羽毛球锦标赛。'
        }, {
          id:8813687,
          title: 'MELANCHOLY',
          time: '2023-02-25 02:50',
          view: '5569',
          imgUrl: 'http://p2.music.126.net/2bcwjIFFTiaS6Hg_4AdMJQ==/109951165424074168.jpg',
          infoList: {
            createBy: '李华', //创建人
            activityTime: '2021-06-25 9:00~2021-06-25 17:20', //活动时间
            deadLine: '2021-06-25 9:00', //报名截止时间
            limit: '88/100', //人数限制
            host: '老年社区组委会' //举办方
          },
          rule: '为了提高居民身体素质，丰富居民日常的生活，提供居民交流互动平台，增加居民幸福指数，促进和谐居民关系发展，将在体育馆进行羽毛球锦标赛。' //规则
        }, {
          id:4816323,
          title: '狐狸的童话',
          time: '2023-02-31 01:40',
          view: '8888',
          imgUrl: 'http://p1.music.126.net/jnSajZlbE9ed8QGVlbwK0A==/109951165666607256.jpg',
          infoList: {
            createBy: '李华', //创建人
            activityTime: '2021-06-25 9:00~2021-06-25 17:20', //活动时间
            deadLine: '2021-06-25 9:00', //报名截止时间
            limit: '88/100', //人数限制
            host: '老年社区组委会' //举办方
          },
          rule: '为了提高居民身体素质，丰富居民日常的生活，提供居民交流互动平台，增加居民幸福指数，促进和谐居民关系发展，将在体育馆进行羽毛球锦标赛。' //规则
        }]
      };
    },
    methods: {
      ...mapActions({
        getLongitude: 'pois/getLongitude'
      }),
      // 页面跳转
      gotoPage(text) {
        if (text === '生活服务') {
          uni.switchTab({
            url: '/pages/classify/classify'
          })
        } else if (text === '家政服务') {
          // console.log(this.cityList.citycode)
          uni.navigateTo({
            url: '/subpkg/service_list/service_list?text=家政&cityCode=' + this.cityList.citycode
          })
        } else {
          uni.navigateTo({
            url: '/home-page/home-order/home-order'
          })
        }
      },
      gotoEntry: function(text) {
        if (text === '档案') {
          uni.switchTab({
            url: '/pages/archives/archives'
          });
        } else if (text === '叫车') {
          uni.navigateTo({
            url: '/subpkg/service_list/service_list?text=叫车&cityCode=' + this.cityList.citycode
          })
        }
      },
      // 点击进入活动详情页
      gotoActivttyDetail(item) {
        console.log(JSON.stringify(item))
        let items = JSON.stringify(item)
        uni.navigateTo({
          url: '/subpkg/activity_detail/activity_detail?items=' + encodeURIComponent(items)
        })
      }
    },
    onLoad() {
      // 调用pois中的方法获取经纬度
      this.getLongitude()
    },
    computed: {
      ...mapState({
        // 当前城市数据
        cityList: state => state.pois.cityList
      })
    },
    onPullDownRefresh() {
      const timer = setTimeout(function() {
        uni.stopPullDownRefresh()
      })
    }
  }
</script>

<style lang="scss">
  // 页面背景色
  $pageBgc:#f5f5f5;
  // 轮播图样式
  $swiperBorderRadius:20rpx; //圆角
  $swiperDotsColor:#69e4e9; //圆点颜色
  // 房型预订等样式
  // 字体样式
  $funTitleColor:#fff;
  $funTitleFontSize:35rpx;
  // 背景icon样式
  $funBgWidth:150rpx;
  $funBgHeight:200rpx;
  $funBgOpacity:.3; //透明度
  //房型预订
  $roomBookingBgc:#40d5c5;
  // 生活服务
  $liveServiceBgc:#3dcefa;
  // 家政服务
  $houseKeepingBgc:#f6a926;

  // 快捷方式入口样式
  $quickEntryBgc:#fff;
  // 右边框样式
  $quickEntryBorderWeight:1px;
  $quickEntryBorderColor:#eaeaea;
  // 图标大小
  $quickEntryIconSize:45rpx;
  // 图标下方字体样式
  $quickEntryIconTextColor:#888;
  $quickEntryIconTextSize:25rpx;

  // 活动一览样式
  // 活动一览
  $activityTitleFontColor:#000;
  $activityTitleFontSize:38rpx;
  $activityTitleFontWeight:700;
  // 活动项样式
  $activityItemMargin:20rpx; //仅上下间距
  // 底部边框样式
  $activityItemBorderWidth:1px;
  $activityItemBorderColor:#eaeaea;
  // 活动图片样式
  $activityItemImageWidth:200rpx;
  $activityItemImageHeight:180rpx;
  // 活动名称样式
  $activityNameFontSize:35rpx;
  $activityNameFontWeight:700;
  // 活动时间、查看次数样式
  $activityTimeFontColor:#666666;
  $activityTimeFontSize:22rpx;
  // 浏览次数样式
  // ICon样式
  $activityViewIconSize:20rpx;
  $activityViewIconImage:'https://s1.ax1x.com/2023/01/10/pSejbtK.png'; //图片路径


  page {
    background-color: $pageBgc;
  }

  // 顶部背景图样式
  .head_bg {
    width: 100%;
    height: 185rpx;
    border-bottom-right-radius: 50rpx;
    border-bottom-left-radius: 50rpx;
  }

  .head_bg image {
    width: 100%;
    border-bottom-right-radius: 30rpx;
    border-bottom-left-radius: 30rpx;
  }

  // 轮播图样式
  .swiper {
    height: 330rpx;
    width: 95%;
    margin: 0 auto;
    margin-top: 10rpx;
    // border-radius: 50rpx;
  }

  swiper .swiper-item,
  swiper image {
    width: 100%;
    height: 100%;
    border-radius: $swiperBorderRadius;
  }

  /* 未选中点的样式 */
  .wx-swiper-dot {
    width: 5rpx;
    height: 5rpx;
    background: #FFE4CF !important;
    margin-left: -8rpx
  }

  /* 激活样式 */
  .wx-swiper-dot-active {
    width: 28rpx !important;
    height: 5rpx;
    background: linear-gradient(-30deg, $swiperDotsColor 0%, $swiperDotsColor 100%) !important;
    border-radius: 10rpx !important
  }

  .wx-swiper-dots {
    position: relative
  }

  /*水平指示器*/
  .wx-swiper-dots.wx-swiper-dots-horizontal {
    margin-bottom: -15rpx
  }

  /* 功能列表区域 */
  .fun {
    display: flex;
    justify-content: space-around;
    height: 135rpx;
    width: 100%;
    /* background-color: pink; */
    margin: 50rpx 0 30rpx 0;
  }

  .fun-box {
    position: relative;
    height: 100%;
    width: 30%;
    text-align: center;
    border-radius: 20rpx;
    overflow: hidden;

    &:first-child {
      background-color: $roomBookingBgc;
    }

    &:nth-child(2) {
      background-color: $liveServiceBgc;
    }

    &:last-child {
      background-color: $houseKeepingBgc;
    }
  }

  .fun-box .fun-box-title {
    color: $funTitleColor;
    font-size: $funTitleFontSize;
    line-height: 135rpx;
    letter-spacing: 5rpx;
  }

  .fun-box image {
    position: absolute;
    right: -30px;
    bottom: -18px;
    width: $funBgWidth;
    height: $funBgHeight;
    opacity: $funBgOpacity;
  }

  /* 快捷入口样式 */
  .quick-entry {
    display: flex;
    justify-content: space-around;
    height: 200rpx;
    width: 100%;
    background-color: $quickEntryBgc;
    margin: 20rpx 0;
  }

  .entry-box {
    height: 80%;
    width: 33.33%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    /* background-color:pink; */
    margin-top: 20rpx;
    border-right: $quickEntryBorderWeight solid $quickEntryBorderColor;
  }

  .entry-box image {
    width: $quickEntryIconSize;
    height: $quickEntryIconSize;
  }

  .entry-box .entry-text {
    color: $quickEntryIconTextColor;
    padding-top: 10rpx;
    font-size: $quickEntryIconTextSize;
    letter-spacing: 6rpx;
  }

  /* 活动一览 */
  .activity {
    width: 100%;
    background-color: #fff;
    margin: 0 auto;
    padding-top: 30rpx;
  }

  .activity-top {
    height: 100rpx;
    width: 95%;
    margin: 0 auto;
  }

  .activity-title {
    color: $activityTitleFontColor;
    font-size: $activityTitleFontSize;
    font-weight: $activityTitleFontWeight;
  }

  .activity-item {
    display: flex;
    width: 95%;
    height: 200rpx;
    margin: 0 auto;
    margin-top: $activityItemMargin;
    margin-bottom: $activityItemMargin;
    // background-color: pink;
    border-bottom: $activityItemBorderWidth solid $activityItemBorderColor;
  }

  .activity-item image {
    width: $activityItemImageWidth;
    height: $activityItemImageHeight;
  }

  .activity-item-content {
    height: 100%;
    width: 80%;
    position: relative;
    padding-left: 30rpx;
  }

  .activity-item-content-title {
    font-size: $activityNameFontSize;
    font-weight: $activityNameFontWeight;
  }

  .activity-item-content-bottom {
    width: 95%;
    // height: 60rpx;
    position: absolute;
    bottom: 20rpx;
    color: $activityTimeFontColor;
    display: flex;
    justify-content: space-between;
  }

  .activity-item-content-bottom text {
    font-size: $activityTimeFontSize;
  }

  .activity-item-content-bottom-textright {
    float: right;

    &:before {
      content: '';
      display: inline-block;
      // 定义元素位置
      // margin-top: 12rpx;
      margin-right: 10rpx;
      // 定义元素宽高
      width: $activityViewIconSize;
      height: $activityViewIconSize;
      // background-image无法引用本地资源，故需要用网络地址
      background-image: url($activityViewIconImage);
      background-size: 100% 100%;
    }
  }
</style>
