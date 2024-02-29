<template>
  <view>
    <!-- 服务列表页 -->
    <!--    <view class="service-list"> -->
    <view class="service-list-item" v-for="(item,index) in serviceList" :key="item" @click="gotServiceDetail(item)">
      <view class="item-image">
        <image :src="item.photos[0].url?item.photos[0].url:'https://s1.ax1x.com/2023/01/18/pS3RE0P.png'" mode="scaleToFill"></image>
      </view>
      <view class="item-content">
        <view class="item-content-title">{{item.name}}</view>
        <view class="item-content-center" v-if="item.business.rating>=4.0"><text class="center-big">{{item.business.rating}}</text><text
            class="center-small">推荐</text></view>
        <view class="item-content-bottom">{{item.address}}</view>
      </view>
    </view>
    <view class="" style="width: 100%;height: 35px;"></view>
    <!--    </view> -->
  </view>
</template>

<script>
  import {
    getServiceList
  } from '../../static/request/getData.js'
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        // 我的纬度
        // mylatitude: null,
        // 我的经度
        // mylongitude: null,
        // 城市代码
        cityCode: '',
        // 服务名称
        serviceText: '',
        // 服务列表数据
        serviceList: [{
            "address": "教育路与振华路交叉口东北140米",
            "business": {
              "keytag": "家电维修",
              "rating": "3.5",
              "rectag": "家电维修"
            },
            "distance": "",
            "pcode": "460000",
            "adcode": "469002",
            "pname": "海南省",
            "cityname": "琼海市",
            "type": "生活服务;生活服务场所;生活服务场所",
            "photos": [{
              "title": "",
              "url": "http://store.is.autonavi.com/showpic/85a8c6b902bd66c7587c12e571d5b3a3"
            }],
            "typecode": "070000",
            "adname": "琼海市",
            "citycode": "1894",
            "name": "专业清洗家电",
            "location": "110.469570,19.235556",
            "id": "B0ID7UC49D"
          },
          {
            "address": "福海路与银海北一横街交叉口西300米",
            "business": {
              "keytag": "家电维修",
              "rating": "3.8",
              "rectag": "家电维修"
            },
            "distance": "",
            "pcode": "460000",
            "adcode": "469002",
            "pname": "海南省",
            "cityname": "琼海市",
            "type": "购物服务;家电电子卖场;家电电子卖场",
            "photos": [{
              "title": "",
              "url": "http://store.is.autonavi.com/showpic/0a54443d71c9ac0fd9449b2fbff1a7a1"
            }],
            "typecode": "060300",
            "adname": "琼海市",
            "citycode": "1894",
            "name": "天霖家电专业清洗",
            "location": "110.469092,19.263107",
            "id": "B0HKCB0DV5"
          },
          {
            "address": "兴工路与豪华路交叉口北160米",
            "business": {
              "keytag": "家电维修",
              "rating": "3.0",
              "rectag": "家电维修"
            },
            "distance": "",
            "pcode": "460000",
            "adcode": "469002",
            "pname": "海南省",
            "cityname": "琼海市",
            "type": "生活服务;生活服务场所;生活服务场所",
            "typecode": "070000",
            "adname": "琼海市",
            "citycode": "1894",
            "name": "蓝导家电深度清洗中心",
            "location": "110.466021,19.228923",
            "id": "B0G1313RIO"
          },
          {
            "address": "德海路与兴海路交叉口东南160米",
            "business": {
              "keytag": "家电维修",
              "rating": "3.5",
              "tel": "13976394699",
              "rectag": "家电维修"
            },
            "distance": "",
            "pcode": "460000",
            "adcode": "469002",
            "pname": "海南省",
            "cityname": "琼海市",
            "type": "生活服务;生活服务场所;生活服务场所",
            "typecode": "070000",
            "adname": "琼海市",
            "citycode": "1894",
            "name": "空调拆装维修清洗",
            "location": "110.475834,19.255519",
            "id": "B0HKA5JCRA"
          }
        ]
      };
    },
    methods: {
      // 跳转到服务详情页
      gotServiceDetail(item) {
        uni.navigateTo({
          url: '../service_detail/service_detail?service=' + JSON.stringify(item)
        })
      },
      // 获取服务数据
      async getServiceList() {
        const res = await getServiceList({
          keywords: this.serviceText,
          city: this.cityCode,
          offset: 20,
          page: 1,
          key: 'eaba766a470599a454dec9b6240f40ed',
          show_fields: 'business,photos'
        })
        this.serviceList = res.data.pois
      }
    },
    beforeMount() {
      // 获取vuex中的数据
      // this.mylatitude = this.$store.state['pois']['mylatitude']
      // this.mylongitude = this.$store.state['pois']['mylongitude']
    },
    onLoad(options) {
      // 赋值给data中对应的数据
      // 设置标题
      uni.setNavigationBarTitle({
        title: options.text
      })
      this.serviceText = options.text
      this.cityCode = options.cityCode
      // 获取列表数据
      this.getServiceList()
    },
    computed: {
      ...mapState({
        //当前纬度
        mylatitude: state => state.pois.mylatitude,
        // 当前经度
        mylongitude: state => state.pois.mylongitude
      })
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #f6f6f6;
  }

  // 服务列表页
  // .service-list {
  //   width: 100%;

  .service-list-item {
    width: 95%;
    height: 200rpx;
    display: flex;
    align-items: center;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 20rpx;
    border-radius: 20rpx;

    &:last-child {
      margin-bottom: 20rpx;
    }

    .item-image {
      width: 200rpx;
      height: 150rpx;
      margin-left: 25rpx;

      image {
        width: 100%;
        height: 100%;
        border-radius: 25rpx;
      }
    }

    .item-content {
      // height: 150rpx;
      width: 60%;
      margin-left: 20rpx;

      .item-content-title {
        font-size: 33rpx;
        font-weight: 700;
        padding-bottom: 3rpx;
      }

      .center-big {
        font-size: 30rpx;
        font-weight: 700;
        color: #4f74e7;
      }

      .center-small {
        font-size: 24rpx;
        font-weight: 700;
        color: #638be9;
        padding-left: 2rpx;
      }

      .item-content-bottom {
        font-size: 24rpx;
        font-weight: 700;
        color: #868686;
      }
    }
  }

  // }
</style>
