<template>
  <view>
    <!-- 分页 -->
    <van-tabs :active="active" color="#69e4e9" title-active-color="#69e4e9" title-inactive-color="#9d9d9d">
      <van-tab title="基础信息">
        <!-- 展示基础信息 -->
        <view class="basic-information">
          <!-- 年龄、身高、体重 -->
          <view class="base-item" v-for="item in infoList" :key="item.unit">
            <view class="base-item-top">
              <text class="base-item-bold">{{item.light}}</text><text class="base-item-dark">{{item.dark}}</text>
            </view>
            <!-- 中文描述-->
            <text class="base-item-unit">{{item.unit}}</text>
          </view>
        </view>
        <!-- 其他健康信息 -->
        <view class="other-info">
          <!-- 其他信息项 -->
          <view class="other-item" v-for="(item,index) in otherItemList" :key="item.title">
            <!-- 健康信息的标题 -->
            <view class="other-item-title">
              <view class="other-item-cirle" :style="{'background-color':item.bgColor}">
                <image :src="item.imgSrc" mode=""></image>
              </view>
              <text>{{item.title}}</text>
            </view>
            <!-- 右侧时间展示 -->
            <text class="other-timer">{{item.time}}</text>
            <!-- 下方数据展示 -->
            <view class="other-unit">
              <!-- 1 -->
              <view class="other-unit-item" v-for="(item2,index2) in item.itemList" :key="item2.text">
                <view class="other-unit-top">
                  <text class="base-item-bold">{{item2.text}}</text><text class="base-item-dark">{{item2.unit}}</text>
                </view>
                <text class="base-item-unit">{{item2.tip ? item2.tip: ''}}</text>
              </view>
            </view>
          </view>
        </view>
      </van-tab>
      <van-tab title="我的体检">
        <view class="phy-exam">
          <view class="phy-exam-item" v-for="(item,index) in phyList" :key="item.type">
            <!-- 顶部信息栏 -->
            <view class="phy-exam-item-title">
              <!-- 体检类型 -->
              <text class="phy-exam-item-type">{{item.type}}</text>
              <!-- 右侧医生名字 -->
              <view class="phy-exam-item-doc">
                <image src="https://s1.ax1x.com/2023/01/08/pSV7s5d.png" mode=""></image>
                <text>{{item.doc}}</text>
              </view>
              <!-- 检查时间 -->
              <view class="phy-exam-item-time">
                <text>{{item.time}}</text>
              </view>
              <!-- 缩略图 -->
              <view class="small-img">
                <image :src="item2.src" mode="" @click="" v-for="(item2,index2) in item.photos" @click="previewImage(index2,item.photos)"
                  :key="item2.id" v-if="item2.id <= 2"></image>
              </view>
              <!-- 医生建议 -->
              <view class="doc-remark" v-if="item.tips">
                <text>
                  {{item.tips}}
                </text>
              </view>
            </view>
          </view>
        </view>
      </van-tab>
    </van-tabs>
  </view>
</template>

<script>
  // 导入vuex
  import {
    mapActions,
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        // 当前选中项
        active: 0
      }
    },
    methods: {
      // 图片预览
      previewImage(index, list) {
        let photoList = list.map(item => {
          return item.src;
        });
        uni.previewImage({
          current: index,
          urls: photoList
        });
      }
    },
    computed:{
      ...mapState({
        //基础信息列表
        infoList: state => state.user_info.userinfo.archivesList.infoList,
        // 其他健康信息项数据
        otherItemList: state => state.user_info.userinfo.archivesList.otherItemList,
        // 体检信息项
        phyList: state => state.user_info.userinfo.archivesList.phyList
      })
    }
  }
</script>

<style lang="scss">
  /* 页面背景色 */
  $pageBgc:#f5f5f5;
  // 数字加粗样式
  $baseInfoBoldSize:40rpx;
  $baseInfoBoldWeight:700;
  // 数字单位样式
  $baseInfoDarkFontSize:26rpx;
  $baseInfoDarkFontColor:#dbdbdb;
  // 中文描述样式
  $baseInfoUnitFontColor:#b7b7b7;
  $baseInfoUnitFontSize:26rpx;
  $baseInfoUnitFontWeight:700;
  // 基础信息样式
  // 盒子背景色
  $baseInfoBoxBgc:#fff;
  // 其他健康信息样式
  // 信息标题样式
  $otherInfoTitleFontColor:#353535;
  $otherInfoTitleFontSize:33rpx;
  $otherInfoTitlePadding:20rpx; //左内边距
  //icon圆圈样式
  $otherInfoCircleSize:50rpx;
  // icon大小
  $otherInfoCircleIconSize:40rpx;
  // 右侧时间展示
  $otherTimerFontColor:#bdbdbd;
  $otherTimerFontSize:28rpx;
  $otherTimerFontWeight:700;
  // 我的体检样式
  // 盒子背景
  $phyItemBgc:#fff;
  // 顶部信息样式
  // 体检类型样式
  $phyItemTypeFontColor:#000;
  $phyItemTypeFontSize:35rpx;
  $phyItemTypeFontWeight:700;
  // 右侧医生、时间字体样式
  $phyItemTextColor:#aeadae;
  $phyItemTextSize:24rpx;
  // 医生图标大小
  $phyItemDocIconSize:40rpx;
  // 缩略图大小
  $phyItemSmallImageSize:200rpx;
  // 医生栏建议样式
  $phyDocRemarkBgc:#f6f6f6; //盒子背景色
  // 建议字体样式
  $phyDocRemarkFontColor:#DAA520;
  $phyDocRemarkFontSize:24rpx;
  
  page {
    background-color: $pageBgc;
  }

  /* 数字样式 */
  .base-item-bold {
    font-size: $baseInfoBoldSize;
    font-weight: $baseInfoBoldWeight;
  }
  // 数字单位样式
  .base-item-dark {
    font-size: $baseInfoDarkFontSize;
    color: $baseInfoDarkFontColor;
  }
  // 中文描述样式
  .base-item-unit {
    color: $baseInfoUnitFontColor;
    font-size: $baseInfoUnitFontSize;
    font-weight: $baseInfoUnitFontWeight;
  }

  /* 基础信息展示 */
  .basic-information {
    display: flex;
    justify-content: space-around;
    height: 200rpx;
    width: 100%;
    background-color: $baseInfoBoxBgc;
    text-align: center;

    .base-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      width: 30%;
      /* margin-top: 50rpx; */
      flex: 1;

      .base-item-top {
        letter-spacing: 1px;
      }
    }
  }
  
  /* 其他健康信息 */
  .other-info {
    width: 100%;

    // 其他信息项
    .other-item {
      position: relative;
      height: 220rpx;
      width: 93%;
      margin: 0 auto;
      margin-top: 20rpx;
      margin-bottom: 20rpx;
      background-color: #fff;
      border-radius: 15rpx;

      // 健康信息的标题
      .other-item-title {
        width: 200rpx;
        margin-left: 15rpx;
        transform: translateY(15rpx);
        display: flex;
        justify-content: flex-start;
        align-items: center;

        text {
          color: $otherInfoTitleFontColor;
          font-size: $otherInfoTitleFontSize;
          padding-left: $otherInfoTitlePadding;
        }

        .other-item-cirle {
          width: $otherInfoCircleSize;
          height: $otherInfoCircleSize;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        image {
          width: $otherInfoCircleIconSize;
          height: $otherInfoCircleIconSize;
        }
      }

      // 右侧时间展示
      .other-timer {
        position: absolute;
        right: 22rpx;
        top: 22rpx;
        color: $otherTimerFontColor;
        font-size: $otherTimerFontSize;
        font-weight: $otherTimerFontWeight;
      }

      // 下方数据展示
      .other-unit {
        width: 85%;
        margin-top: 50rpx;
        display: flex;
        justify-content: flex-start;
        margin-left: 90rpx;
        .other-unit-item {
          margin-left: 45rpx;

          &:first-child {
            margin-left: 0;
          }
        }
      }
    }
  }

  /* 我的体检样式 */
  .phy-exam {
    width: 100%;
    height: 500px;

    .phy-exam-item {
      width: 95%;
      /* height: 240rpx; */
      background-color: $phyItemBgc;
      margin: 0 auto;
      border-radius: 20rpx;
      margin-top: 20rpx;
      padding: 3rpx;

      // 顶部信息栏
      .phy-exam-item-title {
        width: 95%;
        /* background-color: pink; */
        margin: 0 auto;
        margin-top: 20rpx;

        // 体检类型
        .phy-exam-item-type {
          color: $phyItemTypeFontColor;
          font-size: $phyItemTypeFontSize;
          font-weight: $phyItemTypeFontWeight;
        }

        // 右侧医生名字
        .phy-exam-item-doc {
          float: right;
          display: flex;
          justify-content: center;
          align-items: flex-end;

          image {
            width: $phyItemDocIconSize;
            height: $phyItemDocIconSize;
          }
        }

        //缩略图
        .small-img {
          width: 100%;

          /* background-color: pink; */
          image {
            width: $phyItemSmallImageSize;
            height: $phyItemSmallImageSize;
            margin: 15rpx 15rpx 15rpx 0;
          }
        }

        // 医生建议
        .doc-remark {
          /* height: 120rpx; */
          width: 95%;
          background-color: $phyDocRemarkBgc;
          padding: 10rpx;
          margin-bottom: 20rpx;
          text {
            color: $phyDocRemarkFontColor;
            font-size: $phyDocRemarkFontSize;
          }
        }
      }
    }
  }

  .phy-exam-item-doc,
  .phy-exam-item-time text {
    color: $phyItemTextColor;
    font-size: $phyItemTextSize;
  }
</style>
