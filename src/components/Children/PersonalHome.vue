<template>
	<el-card id="person">
		<div class="card">
			<div id="card-introduce">
				个人发帖记录
			</div>
			<div class="card-inner-wrapper">
			<div class="card-inner" v-for="(item, index) in commentList" :key="index"  >
				<div @click="CardDetail(item.id)" class="card-detail">
				<div class="card-title">
					<span class="card-title-num">{{index+1}}.</span>
					<span class="card-title-context">{{item.title}}</span>
				</div>
				<div style="display: flex">
				<div class="card-pic" v-if= "item.pic">
					<img src="../../../public/schoolGate.jpg"/>
				</div>
				<div class="card-content" >
				<!-- 	{{item | flod }}
					<a class="btn-pick-up" v-show=" item.main.length>= 200" @click.stop="togglePickUp(item)">{{item.isExpand?'收起':'...全文'}}</a> -->
					{{item.main}}
				</div>
				</div>
				</div>
			</div>
			</div>
		</div>
	</el-card>


</template>

<script>
	export default {
		data() {
			return {
				uid:window.sessionStorage.getItem('user_id'),
				commentList:[],
				addDialogVisible: false
			}
		},
		created(){
			this.getArticlesList()
		},
		methods: {
			togglePickUp(item) {
				item.isExpand = !item.isExpand //切换状态
				this.$forceUpdate()//强制刷新
			},
			async getArticlesList(){
				const { data:res } = await this.$http.get('user_articles', {params : 
				{
					uid:this.uid
				}});
				// const { data:res } = await this.$http.get('articles');
				console.log(res)
				this.commentList=res.data
				for (var i = 0; i < this.commentList.length; i++) {
						 this.commentList[i]['isExpand'] = false	
					
				}
				console.log(this.commentList)
				// console.log(typeof(this.commentList))
			},
			CardDetail(id) {
				//   直接调用$router.push 实现携带参数的跳转
				console.log(id)
				this.$router.push({
					name:'Detail',
					params: {
					            id: id
					      }
				})
			}
		}}
</script>

<style lang="less" scoped>
	#person /deep/ #card-introduce{
		font-weight:600;
		font-size:16px;
	}
	#person /deep/ .card-title-num{
		color: #ff9607;
		font-size:18px;
	}
	#person /deep/ .card-title-context{
		display: inline-block;
		margin-left: 20px;
		color:#1a1a1a;
		font-size:22px;
		font-weight: 530;
	}
	#person /deep/ .btn-pick-up{
		color: skyblue;
	}
	#person /deep/ .card-pic{
		flex: none;
		height: 120px;
		width: 150px;
	}
	#person /deep/ .card-pic img{
		width: 100%;
		height: 100%;
		
	}
	#person /deep/ .card-content{
		flex: 1;
		margin-left: 35px;
		margin-top: 10px;
		// margin-left: 10px;
	}
	#person /deep/ .card {
		border-bottom: 1px solid #f0f2f7;
	}

	#person /deep/ .card-footer {
		display: flex;
		padding-top: 20px;
	}

	#person /deep/ .card-comment-button {
		border: none;
	}

	#person /deep/ .card-inner {
		padding: 10px 30px;
		 margin-top: 10px;
		border: 1px solid #eef0f4;
		// border: 1px solid #f0f2f7;
	}
	#person /deep/ .card-inner-wrapper{
		// padding: 10px 30px;
		margin-top: 20px;
		// border: 1px solid #c9cbce;
	}


	.card-content {}

	.card-button-box {
		margin-left: auto;
		display: inline-block;
	}

	.btn-pick-up {
		color: skyblue;
	}
	
	.card-detail{
		cursor: pointer;
	}
</style>
