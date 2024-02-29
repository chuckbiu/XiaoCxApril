<template>
  <view>
    <!-- 顶部固定返回 -->
    <view class="fix-nav" :style="{'padding-top':navtop}">
      <navigator url="/pages/home/home" open-type="switchTab">
        <van-icon name="arrow-left" size="33rpx" color="#646464" />
        <text>选择房间</text>
      </navigator>

    </view>
    <!-- 房型 -->
    <view class="home-order" v-for="(item,index) in homeList" :key="item">
      <!-- 顶部房间图 -->
      <view class="home-img">
        <image :src="item.homeImg" mode="aspectFitll"></image>
        <!-- 房间信息 -->
        <view class="home-msg">
          <!-- 房间类型 -->
          <view class="home-type">
            <text>{{item.homeType}}</text>
          </view>
          <!-- 房间特点 -->
          <view class="home-traits">
            <view class="home-traits-box" v-for="item2 in item.homeTraits" :key="item2">
              {{item2}}
            </view>
          </view>
        </view>
      </view>
      <!-- 底部价格和预订栏 -->
      <view class="home-bottom">
        <!-- 价格 -->
        <view class="home-price">
          {{item.homePrice}}
        </view>
        <!-- 预订按钮 -->
        <view class="order-btn">
          <button class="order-btn" @click="gotoHomeDetail(item)">马上预订</button>
        </view>
      </view>
    </view>
    <!-- 底部预留空间 -->
    <view style="width: 100%;height: 45rpx;"></view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        navtop: '',
        // 房间数据
        homeList: [{
            homeImg: 'https://s1.ax1x.com/2023/02/10/pSf41Vf.jpg',
            homeType: '高级大床房',
            homeTraits: ['58m²', '大床', '有窗', '双早'],
            homePrice: '￥666',
            homeDescribes: ' 君胜国际大酒店是由君胜投资集团投资1.2亿元人民币，按照国家四星级标准兴建的集商务、会议、住宿、娱乐于一体的综合性商务酒店。酒店位于鄂尔多斯市铁西区黄金地段，与东胜区政府毗邻，地理位置优越，交通便捷。酒店外观设计独特，富有浓郁的现代气息，总建筑面积为18000平方米。酒店设施豪华，功能齐全，同时设有大型户外和地下停车场，方便您的爱车停泊。',
            homeFacility: ['免费wifi', '有线宽带', '冰箱', '泳池', '电视', '健身', '停车场', '餐饮']
          },
          {
            homeImg: 'https://gd-hbimg.huaban.com/107a9f6be448e8c8fdf4cdd5b98d1e424c07c57414897-PXorJA',
            homeType: '双层独栋别墅',
            homeTraits: ['250m²', '多床', '有窗', '无早'],
            homePrice: '￥1280',
            homeDescribes: ' 君胜国际大酒店是由君胜投资集团投资1.2亿元人民币，按照国家四星级标准兴建的集商务、会议、住宿、娱乐于一体的综合性商务酒店。酒店位于鄂尔多斯市铁西区黄金地段，与东胜区政府毗邻，地理位置优越，交通便捷。酒店外观设计独特，富有浓郁的现代气息，总建筑面积为18000平方米。酒店设施豪华，功能齐全，同时设有大型户外和地下停车场，方便您的爱车停泊。',
            homeFacility: ['有线宽带', '冰箱', '泳池', '电视', '健身', '停车场']
          },
          {
            homeImg: 'https://gd-hbimg.huaban.com/92fa99e79d34abbd805e12e807bd90e7cb27836a7428c0-yGm3Y4',
            homeType: '高级套房',
            homeTraits: ['160m²', '大床', '有窗', '无早'],
            homePrice: '￥2888',
            homeDescribes: ' 君胜国际大酒店是由君胜投资集团投资1.2亿元人民币，按照国家四星级标准兴建的集商务、会议、住宿、娱乐于一体的综合性商务酒店。酒店位于鄂尔多斯市铁西区黄金地段，与东胜区政府毗邻，地理位置优越，交通便捷。酒店外观设计独特，富有浓郁的现代气息，总建筑面积为18000平方米。酒店设施豪华，功能齐全，同时设有大型户外和地下停车场，方便您的爱车停泊。',
            homeFacility: ['免费wifi','冰箱','电视', '健身', '停车场', '餐饮']
          }
        ]
      };
    },
    methods: {
      // 前往酒店详情页面
      gotoHomeDetail(homeList) {
        uni.navigateTo({
          url: '/home-page/home-detail/home-detail?homeItem=' + JSON.stringify(homeList)
        })
      }
    },
    onLoad() {
      // 设置标题文字
      // uni.setNavigationBarTitle({
      //   title: '选择房间'
      // })
      this.$getNavTop()
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #efefef;
  }

  .fix-nav {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: left;
    color: rgba(255, 255, 255, .8);
    font-size: 34rpx;
    position: relative;
    top: 0;
    left: 0;

    navigator {
      display: flex;
      align-items: center;

      text {
        color: #646464;
        font-size: 33rpx;
        // font-weight: 700;
      }
    }
  }

  // 房型预订
  .home-order {
    width: 90%;
    // height: 480rpx;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 20rpx;
    border-radius: 20rpx;

    .home-img {
      position: relative;
      width: 93%;
      height: 350rpx;
      margin: 0 auto;
      padding-top: 20rpx;
      padding-bottom: 15rpx;

      image {
        width: 100%;
        height: 100%;
        border-radius: 20rpx;
      }
    }

    // 房间信息
    .home-msg {
      position: absolute;
      left: 25rpx;
      bottom: 30rpx;

      .home-type {
        color: #fff;
        font-size: 35rpx;
        margin-bottom: 10rpx;
      }

      .home-traits {
        display: flex;

        .home-traits-box {
          width: 60rpx;
          height: 35rpx;
          color: #fff;
          font-size: 18rpx;
          text-align: center;
          line-height: 35rpx;
          border-radius: 8rpx;
          background-color: rgba($color: #5c5c5c, $alpha: .5);

          &:first-child {
            margin-left: 0;
          }

          margin-left: 10rpx;
        }
      }
    }

    // 底部信息栏：价格、预订按钮
    .home-bottom {
      width: 93%;
      height: 80rpx;
      // background-color: red;
      margin: 0 auto;
      margin-top: 15rpx;
      padding-bottom: 15rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .home-price {
        color: #000;
        font-size: 38rpx;
        font-weight: 700;
      }

      .order-btn {
        button {
          width: 280rpx;
          height: 75rpx;
          background-color: #69e4e9;
          color: #fff;
          font-size: 25rpx;
          line-height: 75rpx;
          border-radius: 20rpx;
        }
      }
    }
  }
</style>
