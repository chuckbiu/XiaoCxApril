(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["subpkg/activity_detail/activity_detail"],{"33c7":function(t,n,e){"use strict";e.r(n);var i=e("3dd1"),c=e("f7d9");for(var o in c)"default"!==o&&function(t){e.d(n,t,(function(){return c[t]}))}(o);e("6e44");var u,a=e("f0c5"),r=Object(a["a"])(c["default"],i["b"],i["c"],!1,null,"b4ed30fa",null,!1,i["a"],u);n["default"]=r.exports},"3dd1":function(t,n,e){"use strict";var i,c=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"b",(function(){return c})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return i}))},"6e44":function(t,n,e){"use strict";var i=e("9d18"),c=e.n(i);c.a},"9d18":function(t,n,e){},da2c:function(t,n,e){"use strict";(function(t){e("ae9b");i(e("66fd"));var n=i(e("33c7"));function i(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},ddb0:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{imgId:"",navtop:"",avtivityList:{imgSrc:"https://s1.ax1x.com/2023/01/09/pSZOrzd.jpg",icon:"../../static/羽毛球.png",title:"",infoList:[{pure:"创建人",content:"老年社区（李华）"},{pure:"活动地点",content:"老年社区体育馆"},{pure:"活动时间",content:"2021-06-25 9:00~2021-06-25 17:20"},{pure:"报名截止时间",content:"2021-06-25 9:00"},{pure:"人数限制",current:"88",total:"100"},{pure:"举办方",content:"老年社区组委会"}]}}},onLoad:function(t){this.imgId=t.id,this.getImg(),this.$getNavTop()},methods:{gotoHome:function(){t.switchTab({url:"/pages/home/home"})},getImg:function(){var n=this,e=t.getStorageSync("activityList");e.forEach((function(t){t.id==n.imgId&&(n.avtivityList.imgSrc=t.cover,n.avtivityList.title=t.songs)}))}}};n.default=e}).call(this,e("543d")["default"])},f7d9:function(t,n,e){"use strict";e.r(n);var i=e("ddb0"),c=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);n["default"]=c.a}},[["da2c","common/runtime","common/vendor"]]]);