<template>
  <view>
    <!-- 已登录显示页面 -->
    <view v-if="isLogin">
      <!-- 顶部用户信息栏和订单栏 -->
      <view class="info-top">
        <!-- 用户信息 -->
        <view class="my-acount">
          <view class="avatar">
            <image :src="userinfo.avatarUrl" mode=""></image>
          </view>
          <text class="account-name">{{userinfo.userName}}</text>
        </view>
        <!-- 订单盒子 -->
        <view class="order-box">
          <!-- 全部订单、待进行、正在进行、待评价 -->
          <view class="order-box-item" v-for="(item,index) in orderList" :key="item.text" @click="gotoOrderList()">
            <text class="order-box-item-bold">{{item.count}}</text>
            <text class="order-box-item-dark">{{item.text}}</text>
          </view>
        </view>
      </view>
      <!-- 功能选项 -->
      <view class="fea-options" v-for="(item,index) in optionsList" :key="item">
        <!--功能子项 -->
        <view class="fea-options-item" v-for="(item2,index2) in item" :key="item2.options" v-if="item2.icons" @click="gotoDetailPage(item2.options)">
          <view class="fea-options-item-left">
            <image :src="item2.icons" mode=""></image>
            <text>{{item2.options}}</text>
          </view>
          <!-- 大于符号 > -->
          <view class="fea-options-item-right">
            <van-icon name="arrow" color="#bdbdbd" />
          </view>
        </view>
        <view class="fea-options-item" v-else>
          <view class="fea-logout">
            <text @click="quit()">退出登录</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 未登录页面展示 -->
    <view class="" v-else>
      <!-- 中间图片 -->
      <view class="center">
        <image src="../../static/no-login.png" mode=""></image>
        <!-- 标题 -->
        <view class="center-title">
          <text>您还没有登录哦！</text>
        </view>
        <!-- 返回按钮 -->
        <view class="back-btn">
          <button @click="gotoLogin()">前往登录</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import mylogin from '../../components/my-login/my-login.vue'
  export default {
    data() {
      return {
        count: null,
        // 是否登陆了
        // isLogins: true,
        // 用户数据列表
        // userinfo: '',
        navtop: '',
        // 订单数量数据
        // orderList: '',
        // 功能子项数据
        optionsList: [
          [{
              options: '用药记录',
              icons: 'https://s1.ax1x.com/2023/01/10/pSmJ6MT.png'
            },
            {
              options: '关爱家人',
              icons: 'https://s1.ax1x.com/2023/01/10/pSmJszV.png'
            }
          ],
          // [{
          //     options: '上门护理',
          //     icons: 'https://s1.ax1x.com/2023/01/10/pSmJrR0.png'
          //   },
          //   {
          //     options: '家政服务',
          //     icons: 'https://s1.ax1x.com/2023/01/10/pSmJDGq.png'
          //   },
          //   {
          //     options: '叫车',
          //     icons: 'https://s1.ax1x.com/2023/01/10/pSmJBin.png'
          //   }
          // ],
          [{
            options: '退出登录'
          }]
        ]
      };
    },
    methods: {
      // 更新订单数量
      ...mapMutations({
        changeOrderCount: 'user_info/changeOrderCount',
        signOut: 'user_info/signOut'
      }),
      // 前往对应的服务页面
      gotoDetailPage(item) {
        if (item === '用药记录') {
          uni.navigateTo({
            url: '/my-page/med-record/med-record'
          })
        } else if (item === '关爱家人') {
          uni.navigateTo({
            url: '/my-page/careful-family/careful-family'
          })
        }
      },
      // 前往订单列表页
      gotoOrderList() {
        uni.navigateTo({
          url: '/my-page/order_list/order_list'
        })
      },
      // 前往登录页面
      gotoLogin(){
        uni.navigateTo({
          url:'/subpkg/my-login/my-login'
        })
      },
      // 退出登录
      quit() {
        this.signOut()
      }
    },
    beforeMount() {
      if (this.isLogin === false) {
        uni.navigateTo({
          url: '/subpkg/my-login/my-login'
        })
      }
      console.log('beforeMount')
      // this.userinfo = this.$store.state['user_info']['userinfo']
      // this.orderList = this.$store.state['user_info']['orderList']
    },
    onLoad() {
      console.log('isLogin')
      // 更新订单数量
      this.changeOrderCount()
    },
    updated() {},
    components: {
      mylogin
    },
    computed: {
      ...mapState({
        // 是否登录了
        isLogin: state => state.user_info.userinfo.isLogin,
        // 用户信息
        userinfo: state => state.user_info.userinfo,
        // 订单信息
        orderList: state => state.user_info.userinfo.orderList
      })
    },
    watch: {
      // 监听最新的login数据
      "isLogin": {
        deep: true,
        handler: function(newValue, oldValue) {
          // this.isLogins = this.$store.state['user_info']['isLogin']
          // // this.userinfo = this.$store.state['user_info']['userinfo']
          // // this.orderList = this.$store.state['user_info']['orderList']
        }
      }
    }
  }
</script>

<style lang="scss">
  // 页面背景色
  $pageBgc:#F5F5F5;
  // 头像大小
  $avatarSize:120rpx;
  // 用户名样式
  $accountNameFontColor:#000;
  $accountNameFontSize:30rpx;
  $accountNameFontWeight:700;
  // 订单信息样式
  // 订单数量
  $orderCountFontColor:#000;
  $orderCountFontSize:45rpx;
  $orderCountFontWeight:700;
  // 全部订单名称样式
  $orderNameFontColor:#BDBDBD;
  $orderNameFontSize:24rpx;
  // 功能选项样式
  $optionsMarginTop:20rpx; //顶部间距
  // 图标大小
  $optonsIconSize:35rpx;
  // 选项字体样式
  $optonsTextColor:#828282;
  $optonsTextSize:30rpx;
  // 右侧箭头距离
  $optonsArrowMarginRight:20rpx;

  page {
    background-color: $pageBgc;
  }

  .info-top {
    background-color: #fff;
  }

  // 顶部用户信息
  .my-acount {
    // height: 200px;
    width: 95%;
    margin: 0 auto;
    background-color: #fff;
    padding-top: 200rpx;
    display: flex;
  }

  .avatar {
    position: relative;
    width: 120rpx;
    height: 120rpx;
    // background-color: red;
    border-radius: 50%;
    overflow: hidden;
    margin-left: 20rpx;
  }

  .avatar image {
    width: $avatarSize;
    height: $avatarSize;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  .account-name {
    color: $accountNameFontColor;
    font-size: $accountNameFontSize;
    font-weight: $accountNameFontWeight;
    padding: 30rpx 0 0 20rpx;
  }

  // 订单盒子
  .order-box {
    width: 95%;
    height: 160rpx;
    margin: 0 auto;
    // background-color: red;
    display: flex;
    justify-content: space-around;
  }

  .order-box-item {
    position: relative;
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .order-box-item::after {
    content: '';
    width: 1px;
    height: 20px;
    background-color: #BDBDBD;
    position: absolute;
    top: 40%;
    transform: translateX(-50%);
    right: 0;
  }

  // 去除第四个竖线
  .order-box-item:nth-of-type(4)::after {
    content: '';
    width: 0;
    height: 0;
  }


  .order-box-item-bold {
    color: $orderCountFontColor;
    font-size: $orderCountFontSize;
    font-weight: $orderCountFontWeight;
  }

  .order-box-item-dark {
    color: $orderNameFontColor;
    font-size: $orderNameFontSize;
  }

  // 功能选项
  .fea-options {
    width: 100%;
    margin-top: $optionsMarginTop;
  }

  // 功能子项
  .fea-options-item {
    width: 100%;
    height: 85rpx;
    background-color: #fff;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .fea-options-item-left {
      display: flex;
      line-height: 85rpx;
      align-items: center;
      margin-left: 20rpx;

      image {
        width: $optonsIconSize;
        height: $optonsIconSize;
        margin-right: 20rpx;
      }

      text {
        color: $optonsTextColor;
        font-size: $optonsTextSize;
      }
    }

    .fea-options-item-right {
      margin-right: $optonsArrowMarginRight;
    }

    // 退出登录样式
    .fea-logout {
      width: 100%;
      color: #CC0000;
      font-size: 35rpx;
      text-align: center;
    }
  }
  // 未登录页面
  .center {
    width: 500rpx;
    height: 300rpx;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    image {
      width: 330rpx;
      height: 330rpx;
    }

    // 标题
    .center-title {
      margin-top: 120rpx;
      text {
        font-size: 45rpx;
        font-weight: 700;
      }
    }

    // 返回按钮
    .back-btn {
      margin-top: 150rpx;

      button {
        width: 360rpx;
        height: 80rpx;
        background-color: #69e4e9;
        border-radius: 35rpx;
        color: #fff;
        font-size: 30rpx;
      }
    }
  }
</style>
