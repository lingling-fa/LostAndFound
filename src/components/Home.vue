<template>
	<div id="root">
		<!-- header开始 -->
		<div id="header">
			<div id="header-inner">
				<img src="../../public/schoolLogo.png" id="schoolLogo" />
				<el-menu :default-active="activeIndex" class="headNav" mode="horizontal" @select="handleSelect" :router="true">
					<el-menu-item :index="'/'+'hot'" >首页</el-menu-item>
					<el-menu-item index="2">热榜</el-menu-item>
					<el-menu-item :index="'/'+'pulish'">登记物品</el-menu-item>
				</el-menu>
				   <!-- 搜索框 -->
				<el-input class="searchInput" placeholder="请输入内容">
					<i slot="prefix" class="el-input__icon el-icon-search "></i>
				</el-input>
				<div class="header-right">
				   <!-- 消息提醒 -->
					<span id="header-right-span">消息</span>   <el-badge id="header-right-badge" class="mark" :value="12" />
					<!-- 头像和下拉框 -->
				<el-dropdown @command="handleCommand">
				<el-avatar shape="square" :size="50" src="http://m.imeitou.com/uploads/allimg/2019022710/b4jgfd5plcg.jpg" class="HeaderPho " >
				 </el-avatar>
					<el-dropdown-menu slot="dropdown" >
						<!-- <el-dropdown-item icon="el-icon-message-solid">消息</el-dropdown-item> -->
						<el-dropdown-item icon="el-icon-tickets" command="a">发帖</el-dropdown-item>
						<el-dropdown-item icon="el-icon-s-tools" command="b">设置</el-dropdown-item>
						<el-dropdown-item icon="fontFamily hhtxtuichu" command="c">退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				</div>
			</div>
		</div> 
		<!-- header结束 -->
	<div id="main">
		<div id="main-inner">
			<router-view>
				
			</router-view>
		</div>
	</div>	
		
	</div>
	  <!-- root结束 -->
</template>

<script>
	export default {
		data() {
			return {
				activeIndex:''
				}
				
				},
	methods: {
		handleCommand(command) {
		        // this.$message('click on item ' + command);
			if(command==="a") {
				 this.activeIndex='/'+'pulish';
				    this.$router.push({
				 	  path: 'pulish'
				 })
			}
			if(command==='b'){
				this.$router.push({
					  path: 'setting'
				})
			}
			   
			//    this.$router.push({
			// 	  path: 'pulish'
			// })
			 this.activeIndex='/'+'pulish'
		      }
	}
	}
</script>

<style lang="less">
	#header {
		border-bottom: 2px solid #E4E7ED;
		box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
	}
	#main-inner{
		    height: 800px;
			width: 960px;
			margin: 0 auto;
	}
	#header-inner {
		height: 70px;
		width: 960px;
		display: flex;
		// justify-content: center;
		align-items: center;
		margin: 0 auto;
	}

	#schoolLogo {
		width: 60px;
	}

	.searchInput {
		width: 300px !important;
	}

	.headNav {
		display: inline-block;
		padding-left: 40px !important;
		font-size: 16px;
		width: 400px;
		border-bottom: none !important;
	}

	.el-menu-item {
		font-size: 16px !important;
		padding: 0 40px !important;
	}
	.el-dropdown-menu__item{
		padding: 0 30px !important;
	}
	.header-right {
		display: flex;
		align-items: center;
		// display: inline-block !important;
		margin-left: auto;
	}
	.el-badge{
		// width: 100px;
	}
	#header-right-span{
		color: #909399;
		font-size: 16px;
	}
	#header-right-badge{
		margin-bottom: 10px;
	}
	.el-dropdown{
		margin-left: 10px;
	}
</style>
