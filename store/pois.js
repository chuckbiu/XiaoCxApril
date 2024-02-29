import {
  getLocation
}
from '../static/request/getData.js'
import amap from '../amap-wx.130.js'
export default {
  namespaced: true,
  state: () => ({
    // 当前经度
    mylongitude: '1',
    // 当前纬度
    mylatitude: '2',
    // 附近城市数据
    markers: [{}, {}, {}],
    poisdatas: [{}, {}, {}],
    // 城市数据
    cityList: '',
    nearby:false
  }),
  getters: {

  },
  mutations: {
    // 保存地图相关数据
    saveLoaction(state, location) {
      if (location.mylatitude) state.mylatitude = location.mylatitude
      if (location.mylongitude) state.mylongitude = location.mylongitude
      if (location.markers) state.markers = location.markers
      if (location.poisdatas) state.poisdatas = location.poisdatas
      if (location.cityList) state.cityList = location.cityList
      if(location.nearby) state.nearby = location.nearby
    }
  },
  actions: {
    // 获取经纬度
    async getLongitude() {
      console.log('getLongitude')
      var that = this;
      uni.getLocation({
        type: 'gcj02', //wgs84 地球坐标 (WGS84)  火星坐标 (GCJ-02)也叫国测局坐标系
        success: (res) => {
          this.commit('pois/saveLoaction', {
            mylatitude: res.latitude,
            mylongitude: res.longitude
          })
          this.dispatch('pois/getLocation',{
            mylatitude: res.latitude,
            mylongitude: res.longitude
          })
        },
      });
    },
    // 获取城市数据
    async getLocation(state,place) {
      console.log('pois/getLocation')
      // 根据地理坐标进行获取省市区
      const res = await getLocation({
        key: 'eaba766a470599a454dec9b6240f40ed',
        location: place.mylongitude + ',' + place.mylatitude
      })
      if (res.data.status === '1') {
        this.commit('pois/saveLoaction', {
          mylatitude: res.latitude,
          mylongitude: res.longitude,
          cityList: res.data.regeocode.addressComponent
        })
        console.log(res.data.regeocode.addressComponent)
        this.dispatch('pois/getMap')
      }
    },
    // 获得地图信息
    getMap() {
      console.log('pois/getMap')
      var amapPlugin = new amap.AMapWX({
        key: '70a0100e6dbde9b970181abe61ff5149'
      });
      var that = this;
      amapPlugin.getPoiAround({
        success: (data) => {
          //成功回调
          // 将附近的信息保存道state中
          this.commit('pois/saveLoaction', {
            poisdatas: data.poisData,
            nearby:true
          })
        },
        fail: function(info) {
          //失败回调
          console.log('info', info);
          this.commit('pois/saveLoaction', {
            nearby:false
          })
        }
      });
    }
  }
}
