import {
  request
} from './request.js'; //导入封装好的js文件

//每一个请求的接口都返回一个函数，便于直接调用

//根据坐标获取省市区
export const getLocation = (data) =>{
  return request({
    url:'/v3/geocode/regeo',
    method:'GET',
    data:data
  })
}

//请求搜索的接口
export const getServiceList = (data) => {
  return request({
    url: '/v5/place/text',
    method: 'GET',
    data: data
  })
}
// 计算返回驾车时间距离
export const getDistance = (data) => {
  return request({
    url: '/v3/direction/driving',
    method: 'GET',
    data: data
  })
}

// 获取公交行驶时间
export const getBusDuration = (data) => {
  return request({
    url: '/v3/direction/transit/integrated',
    method: 'GET',
    data: data
  })
}

// 行政区查询
export const getPlace = (data) => {
  return request({
    url:'/v3/config/district',
    method:'GET',
    data:data
  })
}

// 请求服务详情页
export const getServiceDeatil = (data) =>{
  return request({
    url:'/v5/place/detail',
    method:'GET',
    data:data
  })
}