<template>
  <view>
    <!-- 顶部活动图片 -->
    <view class="head_bg">
      <image :src="activityList.imgUrl" mode=""></image>
    </view>
    <!-- 顶部固定返回 -->
    <view class="fix-nav" :style="{'padding-top':navtop}">
      <navigator url="/pages/home/home" open-type="switchTab">
        <van-icon name="arrow-left" size="35rpx" color="#fff" />
      </navigator>
      <!-- <van-icon name="arrow-left" color="#fff" /> -->
      <text class="nav-title" @click="gotoHome()">活动详情</text>
    </view>
    <!-- 活动详情展示 -->
    <view class="activity-detail">
      <view class="activity-detail-box">
        <!-- 活动标题 -->
        <view class="activity-detail-title">
          <image src="/static/羽毛球.png" mode=""></image>
          <text>{{activityList.title}}</text>
        </view>
        <!-- 活动详情 -->
        <view class="activity-content">
          <view class="activity-msg" v-for="(item,index) in activityList.infoList" :key="item">
            <text class="msg-pure">{{index | formatPure}}：</text>
            <!-- 人数限制样式 -->
            <text v-if="index === 'limit'" class="msg-content">{{item.split('/')[1]}}人(<text style="color: #f9931f;">{{item}}</text>)</text>
            <text class="msg-content" v-else>{{item}}</text>
          </view>
        </view>
        <!-- 活动内容说明 -->
        <van-divider contentPosition="center" customStyle="font-size: 24rpx;">活动内容说明</van-divider>
        <!-- 活动内容说明 -->
        <view class="activity-illustrate">
          <text>
            {{activityList.rule}}
          </text>
        </view>
        <view class="activity-bottom">
          <!-- 查看详细规则 -->
          <!-- <text class="activity-bottom-detail">查看详细规则</text> -->
          <!-- 报名按钮 -->
          <van-button color="#f9931f" size="normal" custom-style="height:75rpx;width:500rpx;font-weight:700;border-radius: 10px;" @click="_Enlists()" v-if="isEnroll">立即报名</van-button>
          <van-button color="#ccc" size="normal" custom-style="height:75rpx;width:500rpx;font-weight:700;border-radius: 10px;" v-else>已报名</van-button>
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
        // 导航条距离屏幕的高度
        navtop: '',
        // 活动地点时间数据
        activityList: {},
        // 是否报名了
        isEnroll:false
      };
    },
    onLoad(options) {
      this.activityList = JSON.parse(decodeURIComponent(options.items))
      this.$getNavTop()
    },
    methods: {
      ...mapMutations({
        addActivityId: 'user_info/addActivityId'
      }),
      // 点击返回主页
      gotoHome() {
        uni.switchTab({
          url: '/pages/home/home'
        })
      },
      // 活动报名
      _Enlists(){
        var activityId = this.activityList.id
        console.log('活动id：',this.activityList.id)
        // 调用vuex中的方法
        this.addActivityId(activityId)
      }
    },
    filters: {
      // 过滤标题
      formatPure(value) {
        if (value === 'createBy') return '创建人'
        else if (value === 'activityPlace') return '活动地点'
        else if (value === 'activityTime') return '活动时间'
        else if (value === 'deadLine') return '报名截止时间'
        else if (value === 'limit') return '人数限制'
        else return '举办方'
      }
    }
  }
</script>

<style lang="scss" scoped>
  // 顶部活动图片
  .head_bg {
    position: relative;
    width: 100%;
    height: 500rpx;
  }

  .head_bg image {
    width: 100%;
    height: 100%;
  }

  .fix-nav {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: rgba(255, 255, 255, .8);
    font-size: 34rpx;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: flex-start;
  }

  .nav-title {
    color: #fff;
    font-size: 35rpx;
    font-weight: 700;
    letter-spacing: 4rpx;
  }

  // 活动详情
  .activity-detail {
    position: relative;
    width: 100%;
    // height: 450px;
    background-color: #fff;
    transform: translateY(-60rpx);
    border-top-right-radius: 60rpx;
    border-top-left-radius: 60rpx;
  }

  .activity-detail-box {
    width: 85%;
    // background-color: pink;
    margin: 0 auto;
    padding-top: 30rpx;
  }

  .activity-detail-title {
    position: relative;
    text-align: center;
    display: flex;
    align-items: center;
  }

  .activity-detail-title text {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 30rpx;
    font-weight: 700;
  }

  .activity-detail-title image {
    width: 50rpx;
    height: 50rpx;
  }

  // 活动内容
  .activity-msg {
    margin: 20rpx 0;
  }

  .msg-pure,
  .msg-content {
    font-size: 24rpx;
  }

  .msg-pure {
    color: #BDBDBD;
  }

  .msg-content {
    color: #000;
  }

  // 活动内容说明，
  .activity-illustrate {
    width: 100%;
    // background-color: pink;
  }

  .activity-illustrate text {
    color: #BDBDBD;
    font-size: 24rpx;
  }

  .activity-bottom {
    position: relative;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 200rpx 0 50rpx 0;
  }

  .activity-bottom-detail {
    color: #666;
    font-size: 26rpx;
    text-decoration: underline;
  }
</style>
