<template>
  <view>
    <!-- 顶部活动图片 -->
    <view class="head_bg">
      <image :src="service.photos[0].url?service.photos[0].url:'https://s1.ax1x.com/2023/01/18/pS3RE0P.png'" mode=""
        @click="previewImage(0,service.photos)"></image>
      <!-- 高斯模糊 -->
      <view class="flur-box"></view>
      <!-- 地点信息栏 -->
      <view class="location">
        <view class="location-title">
          <view class="location-title-bold">{{service.name}}</view>
          <view class="location-title-small">{{service.business.keytag || service.type}}</view>
          <view class="location-title-time" v-if="service.business.opentime_today">
            营业时间：{{service.business.opentime_today}}
          </view>
        </view>
        <view class="location-msg">
          <view class="location-msg-left">
            <view class="location-destination">
              {{service.adname + service.address}}
            </view>
            <view class="location-duration">
              距你{{distance | formatDistance}} &nbsp; 驾车{{carDuration | formatDuration}} &nbsp; {{busDuration<=0?'':'公交'}}{{busDuration | formatDuration }}
            </view>
          </view>
          <!-- 右侧拨打电话 -->
          <view class="location-msg-right" @click="callPhone()" v-if="service.business.tel">
            <image src="../../static/电话.png" mode=""></image>
            <text>电话</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 顶部返回栏 -->
    <view class="fix-nav" :style="{'padding-top':navtop}">
      <navigator url="/subpkg/service_list/service_list" open-type="navigateBack">
        <van-icon name="arrow-left" size="50rpx" color="#fff" />
      </navigator>
    </view>
    <!-- 服务流程 -->
    <view class="service-process">
      <!-- 标题 -->
      <view class="process-title">
        <text>服务流程</text>
      </view>
      <!-- 流程项 -->
      <view class="process-item" v-for="(item,index) in serviceProcessList" :key="item.id">
        <view class="process-circle">
          <text>{{item.id}}</text>
        </view>
        <view class="process-content">
          {{item.content}}
        </view>
      </view>
    </view>
    <!-- 立即预订 -->
    <view class="orderbtn">
      <button @click="saveToOrder()">立即预订</button>
    </view>
    <!-- 底部空白 -->
    <view style="width: 100%;height: 40px;"></view>
  </view>
</template>

<script>
  import {
    mapActions,
    mapState,
    mapMutations
  } from 'vuex'
  import {
    getDistance,
    getBusDuration,
    getServiceDeatil
  } from '../../static/request/getData.js'
  export default {
    data() {
      return {
        // 顶部距离
        navtop: '',
        // 服务详情数据
        service: {
          // "address": "金海路112号",
          // "business": {
          //   "opentime_today": "08:00-20:00",
          //   "keytag": "家政",
          //   "rating": "4.3",
          //   "tel": "18789891886",
          //   "rectag": "家政",
          //   "opentime_week": "08:00-20:00"
          // },
          // "distance": "",
          // "pcode": "460000",
          // "adcode": "469002",
          // "pname": "海南省",
          // "cityname": "琼海市",
          // "type": "生活服务;生活服务场所;生活服务场所",
          // "photos": [{
          //     "title": "",
          //     "url": "http://store.is.autonavi.com/showpic/31dd70995012f8b139f5fa4ef0accad5"
          //   },
          //   {
          //     "title": "",
          //     "url": "http://store.is.autonavi.com/showpic/bece30c2797c3a6c7ffacadc4b1a3dda"
          //   }
          // ],
          // "typecode": "070000",
          // "adname": "琼海市",
          // "citycode": "1894",
          // "name": "全莘家政",
          // "location": "110.465825,19.252276",
          // "id": "B0IDTSM919"
        },
        // 服务详情标识
        serviceId: '',
        // 我的维度
        // mylatitude: '',
        // 我的经度
        // mylongitude: '',
        // 两地相距的距离（米）
        distance: '1544',
        // 行车时间（秒）
        carDuration: '417',
        // 公交车时长1746
        busDuration: null,
        // 流程图数据
        serviceProcessList: [{
            id: 1,
            content: '用户预订，服务人员接收'
          },
          {
            id: 2,
            content: '服务人员收到订单消息，联系对应商家进行上门服务'
          },
          {
            id: 3,
            content: '商家前往服务地点，进行服务'
          },
          {
            id: 4,
            content: '服务完成，用户确认后对进行服务评价'
          }
        ]
      };
    },
    beforeMount() {
      // 获取vuex中的数据
      this.mylatitude = this.$store.state['pois']['mylatitude']
      this.mylongitude = this.$store.state['pois']['mylongitude']
    },
    onLoad(options) {
      // 获取导航条距离屏幕的高度
      this.$getNavTop()
      this.service = JSON.parse(options.service)
      // this.mylatitude = options.mylatitude
      // this.mylongitude = options.mylongitude
      // 获取服务详情信息 
      this.getServiceList()
      // 计算两地相距距离
      this.compuDistance()
      // 计算巴士时间
      if (this.distance >= 1000) {
        this.compuBusDuration()
      }
    },
    methods: {
      ...mapMutations({
        saveOrder: 'user_info/saveOrder'
      }),
      // 展示缩略图
      previewImage(index, list) {
        let photoList = list.map(item => {
          return item.url
        });
        uni.previewImage({
          current: index,
          urls: photoList
        });
      },
      // 获取服务详情页 
      async getServiceList() {
        const res = await getServiceDeatil({
          id: this.serviceId,
          key: 'eaba766a470599a454dec9b6240f40ed',
          show_fields: 'children,business,photos'
        })
        this.service = res.data.pois[0]
      },
      // 计算两地相距的距离和时间
      async compuDistance() {
        const res = await getDistance({
          origin: this.mylongitude + ',' + this.mylatitude,
          destination: this.service.location,
          extensions: 'all',
          output: 'JSON',
          key: 'eaba766a470599a454dec9b6240f40ed'
        })
        // 赋值
        // console.log(res)
        if (res.data.status !== 0) {
          this.distance = res.data.route.paths[0].distance
          this.carDuration = res.data.route.paths[0].duration
        }
      },
      // 计算巴士时间
      async compuBusDuration() {
        const res = await getBusDuration({
          origin: this.mylongitude + ',' + this.mylatitude,
          destination: this.service.location,
          extensions: 'all',
          output: 'JSON',
          key: 'eaba766a470599a454dec9b6240f40ed',
          city: this.service.citycode
        })
        console.log('busRes:', res)
        if (res.data.info === 'OK') {
          this.busDuration = res.data.route.transits[0].duration
        }
      },
      // 吊起拨打电话
      callPhone() {
        if (this.service.business.tel) {
          uni.makePhoneCall({
            phoneNumber: this.service.business.tel
          })
        }
        // else {
        //   uni.showToast({
        //     icon: 'none',
        //     title: '当前商家没有预留电话号码'
        //   })
        // }
      },
      // 保存订单数据道vuex
      saveToOrder() {
        var img = 'https://s1.ax1x.com/2023/01/18/pS3RE0P.png'
        if (this.service.photos) {
          img = this.service.photos[0].url
        }
        this.saveOrder({
          bussinessType: this.service.business.keytag,
          shopName: this.service.name,
          shopAddress: this.service.address,
          tel: this.service.business.tel ? this.service.business.tel : 'none',
          imgUrl: img,
          orderStatus: '待进行'
        })
        // 跳转到成功页面
        return uni.navigateTo({
          url:'/success-page/success/success'
        })
      }
    },
    computed:{
      ...mapState({
        //当前纬度
        mylatitude: state => state.pois.mylatitude,
        // 当前经度
        mylongitude: state => state.pois.mylongitude
      })
    },
    filters: {
      // 距离格式化
      formatDistance(value) {
        // return (value / 1000).toFixed(1) + '公里'
        var count = (value / 1000)
        if (count <= 1) {
          return value + '米'
        } else {
          return count.toFixed(1) + '公里'
        }
      },
      // 巴士时间格式化
      formatDuration(value) {
        if (value <= 0) {
          return ''
        } else {
          return Math.ceil(value / 60) + '分钟'
        }
      },
      // 服务类型格式化
      formatServiceType(value) {
        var strList = value.split(';')
        return strList[0]
      }
    }
  }
</script>

<style lang="scss">
  // 页面背景色
  page {
    background-color: #f7f7f7;
  }

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
    text-align: left;
    color: rgba(255, 255, 255, .8);
    font-size: 34rpx;
    position: fixed;
    top: 0;
    left: 0;
  }

  // 高斯模糊
  .flur-box {
    height: 100rpx;
    width: 100%;
    background-color: #fff;
    filter: blur(10px);
    transform: translateY(-50rpx);
  }

  // 地点信息栏
  .location {
    height: 355rpx;
    width: 96%;
    position: absolute;
    bottom: -60%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    border-radius: 20rpx;

    .location-title {
      width: 100%;
      padding-bottom: 15rpx;
      border-bottom: 1px solid #eaeaea;

      view {
        padding: 10rpx 30rpx;
      }

      .location-title-bold {
        font-size: 40rpx;
        font-weight: 600;
        color: #000;
        padding: 20rpx 15rpx 0 30rpx;
      }

      .location-title-small {
        font-size: 28rpx;
        font-weight: 550;
        color: #000;
        padding-bottom: 5rpx;
      }

      .location-title-time {
        font-size: 24rpx;
        font-weight: 550;
        color: #a49696;
        padding-top: 0;
      }
    }

    .location-msg {
      width: 100%;
      height: 50%;
      display: flex;
      justify-content: space-between;

      // background-color: purple;
      // border-bottom-left-radius: 20rpx;
      // border-bottom-right-radius: 20rpx;
      view {
        padding: 5rpx 20rpx;
      }

      .location-destination {
        padding-top: 20rpx;
        font-size: 30rpx;
        font-weight: 700;
      }

      .location-duration {
        font-size: 25rpx;
        font-weight: 700;
        color: #969696;
      }

      .location-msg-right {
        width: 50rpx;
        height: 100%;
        // background-color: pink;
        display: flex;
        flex-direction: column;
        // align-items: center;
        // justify-content: center;
        padding-top: 25rpx;
        margin-right: 20rpx;

        image {
          width: 50rpx;
          height: 50rpx;
        }

        text {
          font-size: 24rpx;
        }
      }
    }
  }

  // 用户评价
  .service-process {
    width: 96%;
    // height: 395rpx;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 320rpx;
    border-radius: 20rpx;

    .process-title {
      font-size: 35rpx;
      font-weight: 700;
      color: #000;
      padding: 30rpx;
      border-bottom: 3px dashed #f7f7f7;
      margin-bottom: 20rpx;
    }

    // 流程项
    .process-item {
      width: 100%;
      height: 88rpx;
      // background-color: red;
      display: flex;
      align-items: center;
      padding-left: 30rpx;
      padding-bottom: 10rpx;

      .process-circle {
        width: 60rpx;
        height: 60rpx;
        text-align: center;
        border-radius: 50%;
        background-color: #24c2fe;

        text {
          color: #fff;
          font-size: 25rpx;
          font-weight: 700;
          line-height: 60rpx;
        }
      }

      .process-content {
        width: 80%;
        padding-left: 20rpx;
        font-size: 25rpx;
        // background-color: yellow;
      }
    }
  }

  // 预订样式
  .orderbtn {
    width: 60%;
    height: 80rpx;
    margin: 0 auto;
    margin-top: 35rpx;

    button {
      width: 100%;
      height: 100%;
      border-radius: 40rpx;
      color: #fff;
      font-size: 30rpx;
      background-color: #24c2fe;
    }
  }
</style>
