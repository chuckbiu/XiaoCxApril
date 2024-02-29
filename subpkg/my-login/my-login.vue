<template>
  <view>
    <!-- 顶部固定返回 -->
    <view class="fix-nav" :style="{'padding-top':navtop}" v-if="showList.isEnroll || showList.isForgetPwd">
      <van-icon name="arrow-left" size="50rpx" color="#000" @click="gotoHome('isLogin')"/>
      <!-- <text class="nav-title" >返回</text> -->
    </view>
    <!-- 登录页面 -->
    <view v-if="showList.isLogin">
      <!-- 顶部logo -->
      <view class="top-img">
        <image src="../../static/logo.png" mode=""></image>
      </view>
      <!-- 账号密码输入框 -->
      <view class="input-info">
        <!-- 账号 -->
        <view class="user-info">
          <text class="info-title">手机号</text>
          <input class="inputcss" placeholder-class="placeholdercss" placeholder="请输入手机号" />
        </view>
        <view class="user-info" style="margin-top: 40rpx;">
          <text class="info-title">密码</text>
          <input type="password" placeholder="请输入登录密码" class="inputcss" placeholder-class="placeholdercss" />
        </view>
        <view class="btnbox">
          <!-- 立即登录按钮 -->
          <button class="loginbtn" @click="gotoMy()">立即登录</button>
        </view>
        <!-- 忘记密码 注册账号 -->
        <view class="forget-info">
          <text @click="gotoHome('isForgetPwd')">忘记密码</text>
          <text @click="gotoHome('isEnroll')">注册账号</text>
        </view>
        <!-- 第三方登录 -->
        <!-- <view class="third-party-logins">
          <view class="weixin-login" @click="wexinLogin()">
            <image src="../../static/weixin.png" mode=""></image>
          </view>
        </view> -->
      </view>
    </view>
    <!-- 注册页面 -->
    <view v-if="showList.isEnroll">
      <!-- 顶部文字 -->
      <view class="enroll">
        <view class="enroll-top">
          <view>
            <text>注册康养账号</text>
          </view>
          <view>
            <text>输入手机号进行注册</text>
          </view>
        </view>
        <!-- 输入框 -->
        <!-- 账号密码输入框 -->
        <view class="input-info">
          <!-- 账号 -->
          <view class="user-info">
            <text class="info-title">手机号</text>
            <input class="inputcss" placeholder-class="placeholdercss" placeholder="请输入手机号" />
          </view>
          <!-- 验证码 -->
          <view class="user-info captcha-input">
            <text class="info-title">验证码</text>
            <input type="text" placeholder="请输入验证码" class="inputcss" placeholder-class="placeholdercss" @click="startCountdown()" />
            <view class="captcha">
              <text>{{countdown | formatCountDown}}</text>
            </view>
          </view>
          <view class="user-info captcha-input">
            <text class="info-title">密码</text>
            <input type="password" placeholder="请输入登录密码" class="inputcss" placeholder-class="placeholdercss" />
            <view class="showpwd">
              <image src="../../static/闭眼睛.png" mode=""></image>
            </view>
          </view>
          <view class="btnbox">
            <!-- 立即登录按钮 -->
            <button class="loginbtn" @click="gotoMy()">注册并登录</button>
          </view>
        </view>
      </view>
    </view>

    <!-- 忘记密码页 -->
    <view v-if="showList.isForgetPwd">
      <!-- 顶部文字 -->
      <view class="enroll">
        <view class="enroll-top">
          <view>
            <text>忘记登录密码</text>
          </view>
          <view>
            <text>输入手机号进行找回密码</text>
          </view>
        </view>
        <!-- 输入框 -->
        <!-- 账号密码输入框 -->
        <view class="input-info">
          <!-- 账号 -->
          <view class="user-info">
            <text class="info-title">手机号</text>
            <input class="inputcss" placeholder-class="placeholdercss" placeholder="请输入手机号" />
          </view>
          <!-- 验证码 -->
          <view class="user-info captcha-input">
            <text class="info-title">验证码</text>
            <input type="text" placeholder="请输入验证码" class="inputcss" placeholder-class="placeholdercss" @click="startCountdown()" />
            <view class="captcha">
              <text>{{countdown | formatCountDown}}</text>
            </view>
          </view>
          <view class="user-info captcha-input">
            <text class="info-title">密码</text>
            <input type="password" placeholder="请设置新的登录密码" class="inputcss" placeholder-class="placeholdercss" />
          </view>
          <view class="user-info">
            <text class="info-title">确认密码</text>
            <input type="password" placeholder="请设置新的登录密码" class="inputcss" placeholder-class="placeholdercss" />
          </view>
          <view class="btnbox">
            <!-- 确认修改并登录按钮 -->
            <button class="loginbtn" @click="gotoMy()">确认修改并登录</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        showList: {
          // 是否登录
          isLogin: true,
          // 是否注册
          isEnroll:false,
          // 是否忘记密码
          isForgetPwd: false
        },
        // 验证码倒计时
        countdown: '',
        // 倒计时节流阀
        isCountdown: true,
        navtop: ''
      };
    },
    methods: {
      // 判断是否登录成功，成功之后返回到我的首页
      gotoMy() {
        this.$store.commit('user_info/changeLogin')
        uni.switchTab({
          url: '/pages/my/my'
        })
      },
      // 返回登录页
      gotoHome(truePage) {
        for (let e in this.showList) {
          if (e === truePage) {
            this.showList[e] = true
          } else {
            this.showList[e] = false
          }
        }
      },
      // 开始倒计时
      startCountdown() {
        // 初始化60秒
        // 节流阀
        if (this.isCountdown) {
          this.isCountdown = false
          this.countdown = 60
          clearInterval(timer)
          var timer = setInterval(() => {
            this.countdown--
            if (this.countdown < 0) {
              this.countdown = '验证码'
              clearInterval(timer)
              this.isCountdown = true
            }
          }, 1000)
        }
      }
    },
    beforeMount() {
      // 获取当前用户是否登录
      this.showList.isLogin = !(this.$store.state['user_info']['isLogin'])
    },
    onLoad() {
      this.$getNavTop()
    },
    filters: {
      formatCountDown(value) {
        if (value === '' || typeof(value) === 'undefined') {
          return '验证码';
        } else {
          return value;
        }
      }
    },
    computed: {},
    watch: {}
  }
</script>

<style lang="scss">
  // 页面背景
  $pageBgc:#fff;
  // 输入框样式
  // 输入框标签样式
  $inputLabelFontColor:#b7b7b7;
  $inputLabelFontSize:26rpx;
  $inputLabelFontWeight:700;
  // 登录页logo大小
  $loginLogoWidth:200rpx;
  $loginLogoHeight:190rpx;
  // 输入提示样式
  $placeholderFontColor:#cbcbcb;
  $placeholderFontSize:28rpx;
  // 按钮样式
  $btnBgc:#69e4e9; //按钮背景色
  $btnFontColor:#fff;
  $btnFontSize:30rpx;
  $btnRadius:40rpx;
  // （输入手机号进行注册）样式
  // 忘记密码页面样式
  // 标题样式
  $forgetTitleTextColor:#999999;
  $forgetTitleTextSize:24rpx;
  $forgetTitleTextWeight:700;
  // 验证码（样式统一）和注册账号密码页面一样
  $captchaBgc:#69e4e9;
  $captchaTextColor:#fff;
  $captchaTextSize:20rpx;
  // 眼睛样式
  $eyeSize:40rpx;
  // 顶部返回样式
  $backFontColor:#000;
  $backFontSize:30rpx;
  $backFontWeight:700;
  page {
    background-color: $pageBgc;
  }

  // 顶部返回样式
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
    color: $backFontColor;
    font-size: $backFontSize;
    font-weight: $backFontWeight;
    padding-left: 20rpx;
  }

  // 登录页
  .top-img {
    width: 100%;
    height: 450rpx;
    // background-color: pink;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    image {
      width: $loginLogoWidth;
      height: $loginLogoHeight;
      margin-bottom: 100rpx;
    }
  }

  // 账号密码输入样式
  .input-info {
    width: 100%;
    height: 300rpx;

    // background-color: red;
    .captcha-input {
      position: relative;
    }

    .user-info {
      width: 85%;
      // height: 110rpx;
      margin: 0 auto;
      margin-top: 20rpx;
      // background-color: yellow;
      border-bottom: 1px solid #f2f2f2;

      .info-title {
        color: $inputLabelFontColor;
        font-size: $inputLabelFontSize;
        font-weight: $inputLabelFontWeight;
        padding-bottom: 15rpx;
      }

      .inputcss {
        padding-bottom: 10rpx;
        // :focus {
        //   font-size: 24rpx;
        //   color: #000;
        //   font-weight: 700;
        // }
      }

      // placeholder样式
      .placeholdercss {
        color: $placeholderFontColor;
        font-size: $placeholderFontSize;
      }

      // 验证码样式
      .captcha {
        position: absolute;
        right: 5rpx;
        bottom: 10rpx;
        width: 100rpx;
        height: 40rpx;
        background-color: $captchaBgc;
        border-radius: 50rpx;
        display: flex;
        justify-content: center;
        align-items: center;

        text {
          color: $captchaTextColor;
          font-size: $captchaTextSize;
        }
      }

      // 眼睛样式
      .showpwd {
        position: absolute;
        right: 0;
        bottom: 10rpx;
        width: $eyeSize;
        height: $eyeSize;

        image {
          width: 100%;
          height: 100%;
        }
      }
    }

    // 登录按钮
    .btnbox {
      width: 85%;
      margin: 0 auto;
      margin-top: 100rpx;

      button {
        width: 100%;
        height: 80rpx;
        background-color: $btnBgc;
        color: $btnFontColor;
        font-size: $btnFontSize;
        line-height: 80rpx;
        border-radius: $btnRadius;
        letter-spacing: 2rpx;
      }
    }

    // 忘记密码 注册账号
    .forget-info {
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;

      text {
        color: $forgetTitleTextColor;
        font-size: $forgetTitleTextSize;
         font-weight: $forgetTitleTextWeight;
        padding-top: 30rpx;
      }
    }

    // 第三方登录
    // .third-party-logins {
    //   width: 80%;
    //   margin: 0 auto;

    //   .weixin-login {
    //     width: 80rpx;
    //     height: 80rpx;
    //     margin: 0 auto;
    //     margin-top: 100rpx;
    //     // background-color: red;
    //     border-radius: 50%;
    //     border: 2px solid #c9c9c9;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;

    //     image {
    //       width: 90%;
    //       height: 90%;
    //     }
    //   }
    // }
  }

  // 注册页
  .enroll-top {
    width: 100%;
    height: 380rpx;

    // background-color: pink;
    view {
      width: 85%;
      margin: 0 auto;
      text-align: left;

      &:first-child {
        padding-top: 220rpx;

        text {
          color: #000;
          font-size: 45rpx;
          font-weight: 700;
          letter-spacing: 2rpx;
        }
      }

      &:nth-child(2) {
        text {
          color: #a9a9a9;
          font-size: 23rpx;
        }
      }
    }
  }
</style>
