<template>
  <view>
    <!-- 顶部 -->
    <view class="top-box">
      <!-- 顶部房型图片 -->
      <view class="head_bg">
        <image :src="homeDetailList.homeImg" mode=""></image>
        <!-- 价格 -->
        <view class="home-price">
          <text>{{homeDetailList.homePrice}}/月</text>
        </view>
      </view>
      <!-- 顶部固定返回 -->
      <view class="fix-nav" :style="{'padding-top':navtop}">
        <navigator url="/home-page/home-order/home-order">
          <van-icon name="arrow-left" size="45rpx" color="#fff" />
        </navigator>
      </view>
    </view>
    <!-- 房型基本信息 -->
    <view class="home-msg">
      <view class="home-msg-box">
        <!-- 房间类型 -->
        <view class="home-name">
          <text>{{homeDetailList.homeType}}</text>
        </view>
        <!-- 房间特点 -->
        <view class="home-traits">
          <view class="home-traits-box" v-for="item in homeDetailList.homeTraits" :key="item">
            {{item}}
          </view>
        </view>
      </view>
    </view>
    <!-- 房间描述 -->
    <view class="home-describes">
      <view class="home-describes-title">
        <text>房间详情</text>
      </view>
      <!-- 房间介绍 -->
      <view class="home-describes-content">
        <text>
          {{formatHomeDescribes(homeDetailList.homeDescribes)}}
        </text>
        <view class="extend-text" @click="changeExtend()" v-if="homeDetailList.homeDescribes.length >=50">{{extendText == true?'收起':'展开'}}</view>
      </view>
      <!-- 房间设施 -->
      <view class="home-describes-facility">
        <view class="home-describes-facility-title">
          <text>房间设施</text>
        </view>
        <!-- 设施icon -->
        <view class="home-describes-facility">
          <view class="home-describes-facility-item" v-for="(item,index) in homeDetailList.homeFacility" :key="item.title">
            <image :src="formatIconUrl(item)" mode=""></image>
            <text>{{item}}</text>
          </view>
        </view>
      </view>
      <!-- 预订按钮 -->
      <view class="order-btn">
        <button>立即预订</button>
      </view>
    </view>
    <!-- 顶部留白 -->
    <view style="width: 100%;height: 100rpx;background-color: #fff;"></view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 顶部返回距离
        navtop: '',
        // 文本展开
        extendText: false,
        // 房间详情数据
        homeDetailList: '',
        // 设施数据
        facilityList: [{
            title: '免费wifi',
            iconPath: '../../static/facility-icon/wifi.png'
          },
          {
            title: '有线宽带',
            iconPath: '../../static/facility-icon/band.png'
          },
          {
            title: '洗衣机',
            iconPath: '../../static/facility-icon/washer.png'
          },
          {
            title: '冰箱',
            iconPath: '../../static/facility-icon/fridge.png'
          },
          {
            title: '泳池',
            iconPath: '../../static/facility-icon/pool.png'
          },
          {
            title: '电视',
            iconPath: '../../static/facility-icon/tv.png'
          },
          {
            title: '健身',
            iconPath: '../../static/facility-icon/gym.png'
          },
          {
            title: '停车场',
            iconPath: '../../static/facility-icon/parking.png'
          },
          {
            title: '餐饮',
            iconPath: '../../static/facility-icon/dining.png'
          }
        ]
      };
    },
    methods: {
      // 格式化房间详情内容
      formatHomeDescribes(value) {
        if (this.extendText) {
          return value
        } else {
          return value.substr(0, 60)
        }
      },
      // 展示收起
      changeExtend() {
        this.extendText = !(this.extendText)
      },
      formatIconUrl(icon) {
        var baseUrl = '../../static/facility-icon/'
        var changePng = ''
        if (icon === '免费wifi') changePng = 'wifi'
        else if (icon === '有线宽带') changePng = 'band'
        else if (icon === '洗衣机') changePng = 'washer'
        else if (icon === '冰箱') changePng = 'fridge'
        else if (icon === '泳池') changePng = 'pool'
        else if (icon === '电视') changePng = 'tv'
        else if (icon === '健身') changePng = 'gym'
        else if (icon === '停车场') changePng = 'parking'
        else if (icon === '餐饮') changePng = 'dining'
        return baseUrl + changePng + '.png'
      }
    },
    onLoad(options) {
      this.homeDetailList = JSON.parse(options.homeItem)
      // 获取图标距离顶部的距离
      this.$getNavTop()
    },
    filters: {

    }
  }
</script>

<style lang="scss">
  // 页面背景色
  page {
    background-color: #f2f2f2;
  }

  // 顶部样式：图片和返回icon
  .top-box {
    position: relative;
    width: 100%;
    height: 500rpx;
    background-color: #fff;

    // 顶部活动图片
    .head_bg {
      width: 100%;
      height: 100%;

      image {
        width: 100%;
        height: 100%;
        border-radius: 0 0 60rpx 60rpx;
      }

      .home-price {
        width: 200rpx;
        height: 85rpx;
        background-color: rgba($color: #d3cdd2, $alpha: 0.9);
        position: absolute;
        bottom: -35rpx;
        right: 70rpx;
        text-align: center;
        line-height: 80rpx;
        border-radius: 15rpx;

        text {
          color: #cf878d;
          font-size: 35rpx;
          font-weight: 700;
        }
      }
    }

    .fix-nav {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: left;
      color: rgba(255, 255, 255, .8);
      font-size: 34rpx;
      position: fixed;
      top: 0;
      left: 0;
    }
  }

  // 房间基本信息
  .home-msg {
    width: 100%;
    height: 170rpx;
    margin-top: -15rpx;
    background-color: #fff;
    border-radius: 0 0 60rpx 60rpx;

    .home-msg-box {
      width: 93%;
      // height: 100%;
      background-color: #fff;
      margin: 0 auto;

      .home-name {
        padding: 30rpx 0 20rpx 30rpx;

        text {
          color: #000;
          font-size: 35rpx;
          font-weight: 600;
        }
      }

      .home-traits {
        display: flex;
        padding: 5rpx 0 5rpx 30rpx;

        .home-traits-box {
          width: 100rpx;
          height: 40rpx;
          color: #fff;
          font-size: 23rpx;
          text-align: center;
          line-height: 40rpx;
          border-radius: 5rpx;
          background-color: rgba($color: #5c5c5c, $alpha: .5);

          &:first-child {
            margin-left: 0;
            color: #afb0d3;
            background-color: #f5f8ff;
          }

          &:nth-child(2) {
            color: #f7aaad;
            background-color: #fff3f3;
          }

          &:nth-child(3) {
            color: #f9e0a5;
            background-color: #fdfbf7;
          }

          &:nth-child(4) {
            color: #FFC0CB;
            background-color: #fdfbf7;
          }

          margin-left: 10rpx;
        }
      }
    }
  }

  // 房间描述
  .home-describes {
    width: 100%;
    // height: 1000rpx;
    background-color: #fff;
    margin-top: 15rpx;
    border-radius: 60rpx 60rpx 0 0;

    .home-describes-title {
      width: 100%;
      height: 80rpx;
      // background-color: red;
      text-align: center;
      line-height: 80rpx;

      text {
        color: #000;
        font-size: 38rpx;
        font-weight: 700;
      }
    }

    // 房间介绍
    .home-describes-content {
      width: 90%;
      margin: 0 auto;
      margin-top: 20rpx;

      text {
        color: #bfbec1;
        font-size: 28rpx;
      }

      .extend-text {
        color: #bebedd;
        font-size: 30rpx;
      }
    }

    // 房间设施
    .home-describes-facility {
      width: 90%;
      margin: 0 auto;
      margin-top: 40rpx;

      .home-describes-facility-title {
        width: 100%;

        text {
          color: #535353;
          font-size: 30rpx;
          font-weight: 700;

        }
      }

      .home-describes-facility {
        width: 100%;
        margin-top: 20rpx;
        display: flex;
        flex-wrap: wrap;

        .home-describes-facility-item {
          width: 20%;
          height: 100rpx;
          // background-color: red;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          image {
            width: 40rpx;
            height: 40rpx;
          }

          text {
            color: #999999;
            font-size: 20rpx;
            font-weight: 700;
            padding-top: 10rpx;
          }
        }
      }
    }


  }

  // 预订按钮
  .order-btn {
    // position: fixed;
    // bottom: 0;
    // width: 100%;
    // height: 200rpx;
    margin-top: 200rpx;
    // padding-top: 100rpx;
    background-color: #fff;

    // display: flex;
    // align-items: center;
    button {
      width: 80%;
      height: 90rpx;
      background-color: #69e4e9;
      border-radius: 30rpx;
      color: #fff;
      font-size: 33rpx;
      line-height: 90rpx;
    }
  }
</style>
