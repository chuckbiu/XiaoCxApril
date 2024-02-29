<template>
  <view>
    <view class="containbox">
      <image :src="imageSrc" mode=""></image>
      <view class="content">
        <text class="title-text">{{title}}</text>
        <view class="title-tips">
          <text>{{tips}}</text>
        </view>
      </view>
      <!-- 定位失败显示切换手动切换定位 -->
      <view class="toggle-place" v-if="title == '定位失败'">
        <view class="">
          <pickerAddress @change="change">{{txt}}</pickerAddress>
        </view>
      </view>

    </view>
    <!-- 选择具体城镇弹出层-->
    <uni-popup ref="popup" type="bottom" background-color="#fff">
      <view class="popup">
        <view class="list-title">
          请选择一个{{cityName}}以下的地区
        </view>
        <scroll-view scroll-y="true" class="scroll-y">
          <view v-for="(item,index) in townList" :key="item" class="list-item" @click="getTownMsg(item)">
            {{item.name}}
          </view>
        </scroll-view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  import {
    getPlace
  } from '../../static/request/getData.js'
  // 导入选择地址
  import pickerAddress from '../wangding-pickerAddress/wangding-pickerAddress.vue'
  export default {
    data() {
      return {
        txt: '手动切换定位',
        title: 'Hello',
        // 街道名称列表数据
        townList: '',
        // 城市名称
        cityName:'',
        // 选择到的城镇具体信息
        townDetailList:''
      };
    },
    props: ['imageSrc', 'title', 'tips'],
    methods: {
      change(data) {
        // this.txt = data.data.join('')
        console.log(data.data[2])
        this.cityName = data.data[2]
        this.getPlaces()
        // 弹出选择城镇框
        this.open()
      },
      // 根据城市名字获取经纬度
      async getPlaces() {
        const res = await getPlace({
          key: 'eaba766a470599a454dec9b6240f40ed',
          keywords: this.cityName
        })
        console.log(res.data.districts[0].districts)
        // 将所有城镇的信息赋值
        this.townList = res.data.districts[0].districts
      },
      // 控制弹出层打开关闭
      open() {
        this.$refs.popup.open('top')
      },
      // 获取当前城镇具体信息
      getTownMsg(item){
        console.log(item)
        this.townDetailList = item
        this.$refs.popup.close('top')
        // 向父组件提交数据
        this.$emit('changePlace',{
          // 经纬度
          location:this.townDetailList.center,
          // 城镇名字
          townName:this.townDetailList.name,
          // 城市代码
          cityCode:this.townDetailList.citycode,
          // 城市名
          cityName:this.cityName,
        })
      }
    },
    onLoad() {

    },
    components: {
      pickerAddress
    }
  }
</script>

<style lang="scss" scoped>
  .containbox {
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, 50%);
    width: 400rpx;
    height: 400rpx;

    // background-color: pink;
    image {
      width: 100%;
      height: 100%;
    }

    // 内容标题样式
    .content {
      text-align: center;
      margin-top: 100rpx;

      .title-text {
        color: #000;
        font-size: 43rpx;
        letter-spacing: 5rpx;
      }

      .title-tips {
        color: #666;
        margin-top: 30rpx;
        letter-spacing: 5rpx;
      }
    }

    // 手动切换定位按钮
    .toggle-place {
      margin-top: 200rpx;
      text-align: center;
      display: flex;
      justify-content: center;

      view {
        // width: 100rpx;
        width: 280rpx;
        height: 90rpx;
        line-height: 90rpx;
        color: #fff;
        font-size: 26rpx;
        border-radius: 20px;
        background-color: #fd889b;
      }
    }
  }
</style>
