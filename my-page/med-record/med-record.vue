<template>
  <view>
    <!-- 日期组件 -->
    <van-calendar class="calendar" title="选择用药日期" color="#69e4e9" :poppable="false" :show-confirm="false" :min-date="minDate"
      :max-date="maxDate" @confirm="selectDate($event,'2')" row-height="32"></van-calendar>

    <!-- 用药记录 -->
    <view class="record-box">
      <view class="record-box-item" v-for="(item,index) in medRecordList" :key="index">
        <view class="record-box-item-left">
          <image src="https://s1.ax1x.com/2023/02/04/pSy7ti9.png" mode=""></image>
        </view>
        <view class="record-box-item-right">
          <view class="record-box-item-right-bold">
            {{item.tip}}
          </view>
          <view class="record-box-item-right-dark">
            {{item.time}}
          </view>
        </view>
      </view>
    </view>
    <view style="height: 300rpx;width: 100%;">

    </view>
    <button class="btnrecord" @click="show = true">添加用药记录</button>
    <!-- 定义添加用药记录弹出层 -->
    <van-popup :show="show" closeable position="bottom" custom-style="height: 80%" @close="onClose">
      <view class="add-title">
        添加用药提醒
      </view>
      <van-notice-bar left-icon="volume-o" scrollable text="养生之道，莫久行久坐、久卧久听；莫强食欲，莫大醉，莫大忧怒，莫大哀思，此所谓中和。能中和者，必久寿也。" />
      <view class="add-input">
        <text class="add-input-title">服用详情</text>
        <view style="position: relative;">
          <textarea v-model="textAreaValue" maxlength="30"></textarea>
          <!-- 次数限制提醒 -->
          <view class="limit-text">
            {{valueLength}}/30
          </view>
        </view>
      </view>
      <view class="add-input" @click="showDialog = true">
        <text class="add-input-title">用药时间(点击修改)</text>
        <view class="add-input-time">
          <!-- 年份 -->
          <view class="input-time-year">
            {{date | formatYear}}
          </view>
          <view style="height: 1px;width: 200rpx;background-color: #ccc;">
          </view>
          <!-- 时间 -->
          <view class="input-time-date">
            {{date | formatHour}}
          </view>
        </view>
      </view>
      <button type="warn" class="confirmbtn" @click="confirmOK()">确定</button>
    </van-popup>
    <!-- 弹出选择时间对话框 -->
    <vant-dialog use-slot title="选择用药时间" :show="showDialog" show-cancel-button confirm-button-open-type="getUserInfo"
      @confirm="handlerConfirm()" @cancel="showDialog = false">
      <van-datetime-picker item-height="32" :show-toolbar="false" @input="getFullTime" :min-date="minDate"></van-datetime-picker>
    </vant-dialog>
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
        // 定义日历日期范围
        minDate: new Date().getTime(),
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()).getTime(), //加一个月
        // 当前日期
        date: '',
        // 选择的时间
        seleceDate: '',
        // 显示隐藏弹出层
        show: false,
        // 展示对话框
        showDialog: false,
        // 用药提醒文本
        textAreaValue: '',
        // 文本限制提醒
        valueLength: 0
      };
    },
    methods: {
      ...mapMutations({
        // 添加用药记录
        AddmedRecordList: 'user_info/AddmedRecordList'
      }),
      // 去往添加用药记录页面
      onClose() {
        this.show = false
      },
      selectDate(event, dates) {
        // 页面加载时
        let date = ''
        if (dates === '0') { // 重置为当前时间
          date = new Date()
        } else if (dates === '1') { //指定时间传入：当用户选择了时间时
          date = new Date(event)
        } else {
          date = new Date(event.detail) //用户没有选择时间时：保持当前时间不变
        }
        // 对日期进行格式化
        const month = this.padZero(date.getMonth() + 1)
        const day = this.padZero(date.getDate())
        const hour = this.padZero(date.getHours())
        const minute = this.padZero(date.getMinutes())
        const formatDate = `${date.getFullYear()}-${month}-${day} ${hour}:${minute}`
        if (dates === '1') {
          this.seleceDate = formatDate
        } else {
          this.date = formatDate
        }
        console.log(formatDate)
      },
      // 补零函数
      padZero(num) {
        return num < 10 ? '0' + num : num
      },
      // 获取选择的用药时间
      getFullTime(e) {
        console.log('getFullTime(获取选择的用药戳):',e.detail)
        this.selectDate(e.detail, '1')
      },
      handlerConfirm() {
        this.date = this.seleceDate
        this.showDialog = false
      },
      // 点击确定、添加用药记录
      confirmOK() {
        if (this.textAreaValue === '') {
          return uni.showToast({
            icon: 'error',
            title: '服用不能为空'
          })
        }
        if (this.seleceDate !== this.date) {
          this.AddmedRecordList({
            tip: this.textAreaValue,
            time: this.date
          })
        } else {
          this.AddmedRecordList({
            tip: this.textAreaValue,
            time: this.seleceDate
          })
        }
        this.textAreaValue = ''
        // 将date重置为当前时间
        this.selectDate('', '0')
        this.show = false
      }
    },
    computed: {
      ...mapState({
        medRecordList: state => state.user_info.userinfo.medRecordList
      })
    },
    onLoad() {
      // 加载时设置标题
      uni.setNavigationBarTitle({
        title: '用药记录'
      })
      this.selectDate('', '0') //页面初次加载
    },
    filters: {
      // 年月日格式化
      formatYear(value) {
        const dateArr = value.split(' ')
        const years = dateArr[0].split('-')
        return years[0] + '年' + years[1] + '月' + years[2] + '日'
      },
      // 时间格式化
      formatHour(value) {
        const dateArr = value.split(' ')
        return dateArr[1]
      }
    },
    watch: {
      textAreaValue: {
        deep: true,
        handler: function() {
          this.valueLength = this.textAreaValue.length
        }
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #f6f6f6;
  }

  // 日历高度
  .calendar {
    --calendar-height: 800rpx;
  }

  // 用药记录
  .record-box {
    width: 100%;
    // height: 200rpx;
    margin-top: 35rpx;
    background-color: #f6f6f6;

    .record-box-item {
      width: 88%;
      height: 135rpx;
      display: flex;
      align-items: center;
      margin: 0 auto;
      margin-top: 20rpx;
      padding-left: 25rpx;
      border-radius: 25rpx;
      background-color: #fff;

      .record-box-item-left {
        height: 50rpx;
        width: 50rpx;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f5f5f5;

        image {
          width: 50%;
          height: 50%;
        }
      }

      .record-box-item-right {
        width: 80%;
        margin-left: 25rpx;

        // 提示消息
        // padding: 20rpx;
        .record-box-item-right-bold {
          color: #000;
          font-size: 30rpx;
          padding: 5rpx 5rpx 0 5rpx;
        }

        .record-box-item-right-dark {
          color: #d0d0d0;
          font-size: 24rpx;
          font-weight: 700;
        }
      }
    }
  }

  // 按钮样式
  .btnrecord {
    width: 100%;
    height: 100rpx;
    color: #fff;
    font-size: 30rpx;
    line-height: 100rpx;
    letter-spacing: 2rpx;
    background-color: #69e4e9;
  }

  // 添加用药提醒样式
  .add-title {
    height: 120rpx;
    width: 100%;
    text-align: center;
    color: #000;
    font-size: 30rpx;
    font-weight: 700;
    line-height: 120rpx;
    background-color: #fff;
  }

  .add-input {
    height: 300rpx;
    width: 100%;
    margin-top: 35rpx;

    // background-color: pink;
    .add-input-title {
      font-size: 40rpx;
      font-weight: 600;
      padding: 20rpx 0 20rpx 45rpx;
    }

    textarea {
      height: 200rpx;
      width: 90%;
      margin: 0 auto;
      padding: 10rpx;
      resize: none;
      margin-top: 20rpx;
      border: 1px solid #ccc;
      border-radius: 20rpx;
      // background-color: red;

    }

    .limit-text {
      position: absolute;
      right: 50rpx;
      bottom: 10rpx;
      color: #ccc;
      font-size: 25rpx;
    }


    // 时间样式
    .add-input-time {
      width: 90%;
      margin: 0 auto;
      padding-top: 30rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .input-time-year,
      .input-time-date {
        color: #000;
        font-size: 35rpx;
      }
    }
  }

  // 按钮样式
  .confirmbtn {
    width: 85%;
    height: 85rpx;
    line-height: 85rpx;
    font-size: 35rpx;
    border-radius: 50rpx;
  }
</style>
