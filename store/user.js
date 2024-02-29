export default {
  namespaced: true,
  state: () => ({
    // 登录信息
    userinfo: {
      // 是否登录了
      isLogin: false,
      // 头像路径
      avatarUrl: 'https://s1.ax1x.com/2023/01/10/pSmEr2n.jpg',
      // 用户名
      userName: '康养用户',
      // 报名的活动
      activityList:[],
      // 用药记录数据
      medRecordList: [{
          tip: '999感冒灵早晚各一次，1次2片',
          time: '2018-01-13 09:00'
        },
        {
          tip: '999感冒灵早晚各一次，1次2片',
          time: '2018-01-13 09:00'
        },
        {
          tip: '999感冒灵早晚各一次，1次2片',
          time: '2018-01-13 09:00'
        }
      ],
      // 订单数据
      orderList: [{
          text: '全部订单',
          count: 10,
          order: [{
            bussinessType: '家政',
            shopName: '全莘家政123123123123123',
            shopAddress: '金海路112号',
            tel: '18789891886',
            imgUrl: 'http://store.is.autonavi.com/showpic/31dd70995012f8b139f5fa4ef0accad5',
            orderStatus: '待进行'
          }]
        },
        {
          text: '待进行',
          count: 1,
          order: []
        },
        {
          text: '正在进行',
          count: 3,
          order: []
        },
        {
          text: '待评价',
          count: 4,
          order: []
        }
      ],
      // 健康档案数据
      archivesList: {
        // 基础信息列表
        infoList: [{
            light: '42',
            dark: '岁',
            unit: '年龄'
          },
          {
            light: '160',
            dark: 'cm',
            unit: '身高'
          },
          {
            light: '46',
            dark: 'kg',
            unit: '体重'
          }
        ],
        // 其他健康信息项数据
        otherItemList: [{
            imgSrc: 'https://s1.ax1x.com/2023/01/07/pSVN69P.png',
            time: '01-07 23:00',
            title: '体温',
            bgColor: '#22c889',
            itemList: [{
              text: '36.5',
              unit: '℃'
            }]
          },
          {
            imgSrc: 'https://s1.ax1x.com/2023/01/07/pSVNgc8.png',
            time: '01-06 10:00',
            title: '脉搏',
            bgColor: '#f68a91',
            itemList: [{
              text: '109',
              unit: '次/分'
            }]
          },
          {
            imgSrc: 'https://s1.ax1x.com/2023/01/07/pSVNsht.png',
            time: '01-04 09:45',
            title: '血压',
            bgColor: '#44a0f1',
            itemList: [{
                text: '109',
                unit: 'mmHg',
                tip: '高压'
              },
              {
                text: '82',
                unit: 'mmHg',
                tip: '低压'
              }
            ]
          },
          {
            imgSrc: 'https://s1.ax1x.com/2023/01/07/pSVNc1f.png',
            time: '01-22 12:45',
            title: '运动',
            bgColor: '#fdc64e',
            itemList: [{
                text: '2533',
                unit: '步',
                tip: '步数'
              },
              {
                text: '2.4',
                unit: 'km',
                tip: '距离'
              },
              {
                text: '10.3',
                unit: 'cal',
                tip: '能耗'
              },
              {
                text: '30',
                unit: '分钟',
                tip: '时长'
              }
            ]
          }
        ],
        // 体检信息项
        phyList: [{
          type: '常规检查',
          doc: '梁振江',
          time: '2019-11-29 11:22',
          photos: [{
              id: '1',
              src: 'https://s1.ax1x.com/2023/01/08/pSVb4hj.png'
            },
            {
              id: '2',
              src: 'https://s1.ax1x.com/2023/01/08/pSVbhNQ.jpg'
            },
            {
              id: '3',
              src: 'https://s1.ax1x.com/2023/01/08/pSZm0L6.jpg'
            }
          ],
          tips: ''
        }, {
          type: '人体成分分析',
          doc: '梁振江',
          time: '2019-05-09 09:22',
          photos: [{
            id: '1',
            src: 'https://s1.ax1x.com/2023/01/08/pSZm0L6.jpg'
          }],
          tips: '您好！你的脂肪密度偏高，请多注意饮食，并且保持良好的饮食习惯。'
        }]
      },
      // 关爱家人数据
      carefulFamily: {
        // 我已关联数据
        myRelList: [{
            avatarUrl: '../../static/weixin.png',
            name: '王大锤1',
            age: 61,
            sex: 'man',
            phone: '22224646163'
          },
          {
            avatarUrl: '../../static/weixin.png',
            name: '王大锤2',
            age: 61,
            sex: 'woman',
            phone: '12345678912'
          }
        ],
        // 被人关联的数据
        otherRelList: [{
          avatarUrl: '../../static/weixin.png',
          name: '王大锤3',
          age: 62,
          sex: 'man',
          phone: '12345678912'
        }]
      }
    }
  }),
  getters: {

  },
  mutations: {
    // 判断是否登录成功了
    changeLogin(state) {
      state.userinfo.isLogin = true
    },
    signOut(state) {
      console.log('user_info/signOut')
      state.userinfo.isLogin = false
    },
    // 保存订单数据
    saveOrder(state, shopList) {
      console.log(shopList)
      console.log('user_info/saveOrder:state.userinfo.orderList=', state.userinfo.orderList)
      // 将当前数据添加到数据中
      state.userinfo.orderList.forEach(function(e) {
        if (e.text === '全部订单' || e.text === '待进行') {
          e.order.unshift(shopList)
        }
      })
      this.commit('user_info/changeOrderCount')
    },
    // 更新订单数量
    changeOrderCount(state) {
      console.log('user_info/changeOrderCount')
      state.userinfo.orderList.forEach(function(e) {
        e.count = e.order.length
      })
    },
    // 添加用药记录
    AddmedRecordList(state, medList) {
      console.log('user_info/AddmedRecordList:medList=', medList)
      state.userinfo.medRecordList.unshift(medList)
    },
    // 解除关联
    removeRel(state, removeItem) {
      console.log('user_info/Disassociate 解除关联!')
      var listName = removeItem.listName
      var carefulFamily = state.userinfo.carefulFamily
      for(var key in carefulFamily){
        if(key === listName){
          // 删除指定元素
          carefulFamily[key].splice(removeItem.index,1)
        }
      }
      console.log('carefulFamily',carefulFamily)
    },
    // 活动报名处理
    addActivityId(state,activityId){
      console.log('user_info/addActivityId')
      console.log(activityId)
      // 将报名的id添加到数组中
      state.userinfo.activityList.push(activityId)
      console.log(state.userinfo.activityList)
    }
  },
  actions: {
  }
}
