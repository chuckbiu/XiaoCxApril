<template>
  <view>
    <!-- 中间图片 -->
    <view class="center">
      <image src="../../static/success/success.png" mode=""></image>
      <!-- 标题 -->
      <view class="center-title">
        <text>预订成功</text>
      </view>
      <!-- 副文本 -->
      <view class="center-dark">
        <text>您的订单已经生成，将马上为您安排服务</text>
      </view>
      <!-- 返回按钮 -->
      <view class="back-btn">
        <button @click="gotoOrderList()">查看订单</button>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    methods:{
      // 前往订单页
      gotoOrderList(){
        uni.navigateTo({
          url:'/my-page/order_list/order_list'
        })
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #f6f6f9;
  }

  .center {
    width: 500rpx;
    height: 300rpx;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    image {
      width: 200rpx;
      height: 200rpx;
    }

    // 标题
    .center-title {
      margin-top: 120rpx;

      text {
        font-size: 45rpx;
        font-weight: 700;
      }
    }

    // 副文本
    .center-dark {
      width: 100%;
      margin-top: 5rpx;

      text {
        color: #9ba3af;
        font-size: 25rpx;
      }
    }

    // 返回按钮
    .back-btn {
      margin-top: 50rpx;

      button {
        width: 360rpx;
        height: 80rpx;
        background-color: #82c91e;
        border-radius: 35rpx;
        color: #fff;
        font-size: 30rpx;
      }
    }
  }
</style>
