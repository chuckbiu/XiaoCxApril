<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/* 导入vant组件样式 */
  @import '/wxcomponents/vant/common/index.wxss'
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
/*  @font-face {
    font-family: PingFangSC-Medium;
    source: 'url(https://www.your-server.com/PingFangSC-Medium.ttf)'
  } */
/* #endif */
</style>
