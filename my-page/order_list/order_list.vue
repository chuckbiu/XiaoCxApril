<template>
  <view>
    <van-tabs :active="0" color="#69e4e9" title-active-color="#69e4e9" title-inactive-color="#818181" nav-class="tab-bgc" sticky>
      <van-tab :title="item.text" v-for="(item,index) in orderList" :key="item">
        <view class="order-box" v-for="(item2,index2) in item.order" :key="item2">
          <!-- 顶部商家名字和状态 -->
          <view class="order-top">
            <!-- 商家名字 -->
            <view class="order-shoper">
              <image src="https://s1.ax1x.com/2023/02/13/pSoY3SU.png" mode=""></image>
              <text>{{item2.shopName}}</text>
            </view>
            <!-- 当前服务状态 -->
            <view class="order-status">
              <text>{{item2.orderStatus}}</text>
            </view>
          </view>
          <!-- 中间图片和订单描述 -->
          <view class="order-center">
            <!-- 订单图 -->
            <view class="shop-img">
              <image :src="item2.imgUrl" mode=""></image>
            </view>
            <!-- 订单描述 -->
            <view class="shop-describes">
              <view class="shop-describes-item">
                <text>服务类型：{{item2.bussinessType}}</text>
              </view>
              <view class="shop-describes-item">
                <text>商家地址：{{item2.shopAddress}}</text>
              </view>
              <view class="shop-describes-item">
                <text>服务电话：{{item2.tel}}</text>
              </view>
            </view>
          </view>
          <!-- 订单按钮 -->
          <view class="order-btn">
            <button>提醒加急</button>
          </view>
        </view>
      </van-tab>
    </van-tabs>
    <!-- 底部留白盒子 -->
    <view style="width: 100%;height: 50rpx;"></view>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {

      };
    },
    onLoad() {
      uni.setNavigationBarTitle({
        title: '我的订单'
      })
    },
    computed: {
      ...mapState({
        // 订单信息
        orderList: state => state.user_info.userinfo.orderList
      })
    },
  }
</script>

<style lang="scss">
  page {
    background-color: #eeeeee;
  }

  .tab-bgc {
    background-color: #eeeeee;
  }

  // 订单盒子
  .order-box {
    position: relative;
    width: 90%;
    height: 315rpx;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 20rpx;
    padding-bottom: 40rpx;
    border-radius: 20rpx;

    // 顶部商家名字和状态
    .order-top {
      width: 95%;
      height: 75rpx;
      margin: 0 auto;
      // background-color: pink;
      line-height: 75rpx;
      display: flex;
      justify-content: space-between;

      // 商家名字
      .order-shoper {
        // margin-left: 18rpx;
        display: flex;
        align-items: center;

        image {
          width: 30rpx;
          height: 30rpx;
        }

        text {
          color: #969696;
          font-size: 26rpx;
          padding-left: 10rpx;
        }
      }

      // 当前服务状态
      .order-status {

        // margin-right: 18rpx;
        text {
          color: #bb5655;
          font-size: 30rpx;
          font-weight: 700;
        }
      }
    }

    // 中间图片和订单描述
    .order-center {
      width: 95%;
      height: 200rpx;
      margin: 0 auto;
      // margin-top: 10rpx;
      // background-color: pink;
      display: flex;

      // align-items: center;
      .shop-img {
        width: 180rpx;
        height: 180rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f7f7f7;

        image {
          width: 140rpx;
          height: 140rpx;
        }
      }

      .shop-describes {
        width: 70%;
        margin-left: 30rpx;

        // background-color: yellow;
        .shop-describes-item {
          margin: 5rpx 0;

          text {
            color: #a8a8a8;
            font-size: 30rpx;
          }
        }
      }
    }

    // 订单按钮
    .order-btn {
      position: absolute;
      bottom: 17rpx;
      right: 15rpx;
      width: 200rpx;
      height: 60rpx;

      button {
        width: 100%;
        height: 100%;
        background-color: #fff;
        color: #f98d8c;
        font-size: 26rpx;
        line-height: 60rpx;
        border-radius: 30rpx;
        border: 2rpx solid #f98d8c;
      }
    }
  }
</style>
