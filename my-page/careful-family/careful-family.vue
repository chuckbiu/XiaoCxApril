<template>
  <view>
    <!-- 顶部邀请栏 -->
    <view class="top-invite">
      <view class="center-content">
        <text>添加家人后，可查看家人的健康档案数据</text>
        <button>邀请账号关联</button>
      </view>
    </view>
    <!-- 关联列表 -->
    <van-tabs :active="0" color="#69e4e9" title-active-color="#69e4e9" title-inactive-color="#9d9d9d">
      <!-- 我已关联 -->
      <van-tab title="我已关联">
        <!-- 关联列表项 -->
        <view class="relevancy" v-for="(item,index) in myRelList" :key="index">
          <!-- 顶部信息栏 -->
          <view class="rel-top">
            <view class="rel-top-left">
              <image :src="item.avatarUrl" mode=""></image>
            </view>
            <view class="rel-top-right">
              <view class="rel-msg">
                <text class="rel-name">{{item.name}}</text>
                <view class="rel-age">
                  <image v-if="item.sex == 'woman'" src="../../static/girl.png" mode=""></image>
                  <image v-else src="../../static/man.png" mode=""></image>
                  <text class="">{{item.age}}岁</text>
                </view>
              </view>
              <view class="rel-phone">
                <text>{{item.phone}}</text>
              </view>
            </view>
          </view>
          <!-- 底部关联栏 -->
          <view class="rel-bottom">
            <button @click="Disassociate('myRelList',index)">解除关联</button>
          </view>
        </view>
        <view style="width: 100%;height: 30rpx;"></view>
      </van-tab>
      <!-- 被人关联 -->
      <van-tab title="被人关联">
        <!-- 关联列表项 -->
        <view class="relevancy" v-for="(item,index) in otherRelList" :key="index">
          <!-- 顶部信息栏 -->
          <view class="rel-top">
            <view class="rel-top-left">
              <image :src="item.avatarUrl" mode=""></image>
            </view>
            <view class="rel-top-right">
              <view class="rel-msg">
                <text class="rel-name">{{item.name}}</text>
                <view class="rel-age">
                  <image v-if="item.sex == 'woman'" src="../../static/girl.png" mode=""></image>
                  <image v-else src="../../static/man.png" mode=""></image>
                  <text class="">{{item.age}}岁</text>
                </view>
              </view>
              <view class="rel-phone">
                <text>{{item.phone}}</text>
              </view>
            </view>
          </view>
          <!-- 底部关联栏 -->
          <view class="rel-bottom">
            <button @click="Disassociate('otherRelList',index)">解除关联</button>
          </view>
        </view>
        <view style="width: 100%;height: 30rpx;"></view>
      </van-tab>
    </van-tabs>
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
      return {};
    },
    methods: {
      ...mapMutations({
        removeRel: 'user_info/removeRel'
      }),
      // 解除关联
      Disassociate(listName, index) {
        // 调用方法进行删除关联
        uni.showModal({
          title: '是否解除关联',
          success: (res) => {
            if (res.confirm) {
              console.log('用户点击确定');
              this.removeRel({
                listName: listName,
                index: index
              })
            } else if (res.cancel) {
              console.log('取消了解除关联！');
            }
          }
        })
        // console.log(index)
      }
    },
    computed: {
      ...mapState({
        //当前纬度
        myRelList: state => state.user_info.userinfo.carefulFamily.myRelList,
        otherRelList: state => state.user_info.userinfo.carefulFamily.otherRelList
      })
    },
    onLoad() {
      uni.setNavigationBarTitle({
        title: '关爱家人'
      })
    }
  }
</script>

<style lang="scss">
  // 页面背景色
  $pageBgc:#f6f6f6;

  page {
    background-color: $pageBgc;
  }


  // 顶部邀请栏
  .top-invite {
    width: 100%;
    height: 200rpx;
    background-color: #69e4e9;
    display: flex;
    justify-content: center;
    align-items: center;

    .center-content {
      width: 90%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      text {
        color: #fff;
        font-size: 30rpx;
        // letter-spacing: 2rpx;
      }

      button {
        width: 200rpx;
        height: 55rpx;
        background-color: #fff;
        color: #69e4e9;
        font-size: 24rpx;
        font-weight: 700;
        margin-top: 20rpx;
        line-height: 55rpx;
      }
    }
  }

  // 关联列表样式
  .relevancy {
    width: 90%;
    height: 265rpx;
    margin: 0 auto;
    margin-top: 23rpx;
    border-radius: 10rpx;
    background-color: #fff;

    .rel-top {
      height: 100rpx;
      display: flex;
      padding: 30rpx;
      border-bottom: 1px solid #f7f7f7;

      .rel-top-left {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        background-color: #edebf3;

        image {
          width: 100%;
          height: 100%;
        }
      }

      .rel-top-right {
        height: 80rpx;
        width: 75%;
        padding-left: 25rpx;

        .rel-msg {
          display: flex;
        }

        .rel-name {
          font-size: 35rpx;
          font-weight: 700;
        }

        .rel-age {
          display: flex;
          align-items: center;

          text {
            color: #666;
            font-size: 25rpx;
            padding-left: 10rpx;
          }

          image {
            width: 35rpx;
            height: 35rpx;
            padding-left: 20rpx;
          }
        }

        .rel-phone {
          text {
            color: #c3c3c3;
            font-size: 30rpx;
          }
        }
      }
    }

    // 底部样式
    .rel-bottom {
      width: 100%;
      position: relative;

      button {
        position: absolute;
        right: 20rpx;
        top: 20rpx;
        width: 160rpx;
        height: 60rpx;
        background-color: #f0f0f0;
        color: #bebebe;
        font-size: 27rpx;
        line-height: 60rpx;
      }
    }
  }
</style>
