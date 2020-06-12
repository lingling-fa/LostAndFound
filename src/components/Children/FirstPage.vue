<template>
	<el-card id="first">
		<div class="card">
			<div class="card-inner" v-for="(item, index) in commentList" :key="index"  >
				<div @click="CardDetail(item.id)" class="card-detail">
				<h2 class="card-title">
					{{item.title}}
				</h2>
				<div style="display: flex">
				<div class="card-pic" v-if= "item.pic">
					<img src="../../../public/schoolGate.jpg"/>
				</div>
				<div class="card-content" >
					{{item | flod }}
					<!-- <a class="btn-pick-up" v-show=" item.main.length>= 200" @click.stop="togglePickUp(item)">{{item.isExpand?'收起':'...全文'}}</a> -->
					<!-- {{item.main}} -->
				</div>
				</div>
				</div>
				<div class="card-footer">
					<!-- <el-button type="primary" icon="el-icon-thumb" style="font-size: 14px;"> {{item.like}}</el-button> -->
					<!-- <span class="commentList-readnum">阅读量:{{item.like}}</span> -->
					<div class="card-button-box">
						<!-- <el-button class="card-comment-button" icon="el-icon-s-promotion">转发</el-button> -->
					<!-- 	<el-button class="card-comment-button" icon="el-icon-star-on">收藏</el-button> -->					<span class="commentList-readnum">阅读量:{{item.read_number || 0}}</span>
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
				// commentList: [
				// 	{
				// 		id: 'SL457632',
				// 		title: '拼多多是怎么从拼夕夕变成拼爹爹的？为什么口碑会越来越好？',
				// 		main: "据留言大神的分析，他们说镯子应该是翡翠冰种或者玻璃种，不是水晶。水晶没有那么贵。我解释一下因为我不知道水晶翡翠的区别也没有刻意了解过，只是当年记忆深刻这个非常贵，不是为了引起误解，至于到底这个镯子是什么材质的，有人还私信让我再去问问，其实没有必要了，只当是个美好的回忆和小故事就好了。这个故事有快15年了，那个14万差不多就是2006年的14万。所以当年能买什么我也说不准其实没有必要了，只当是个美好的回忆和小故事就好了。这个故事有快15年了，那个14万差不多就是2006年的14万。所以当年能买什么我也说不准其实没有必要了，只当是个美好的回忆和小故事就好了。这个故事有快15年了，那个14万差不多就是2006年的14万。所以当年能买什么我也说不准。",
				// 		pic:'../../../public/schoolGate.jpg',
				// 		isExpand: false,
				// 		like: 20
				// 	},
				// 	{
				// 		id: 'SL457632',
				// 		title: '赵成',
				// 		main: "根据留言大神的分析，他们说镯子应该是翡翠冰种或者玻璃种，不是水晶。水晶没有那么贵。我解释一下因为我不知道水晶翡翠的区别也没有刻意了解过，只是当年记忆深刻这个非常贵，不是为了引起误解，至于到底这个镯子是什么材质的，有人还私信让我再去问问，其实没有必要了，只当是个美好的回忆和小故事就好了。这个故事有快15年了，那个14万差不多就是2006年的14万。所以当年能买什么我也说不准。",	
				// 		isExpand: false,
				// 		pic:'',
				// 		like: 8
				// 	},
				// 	{
				// 		id: 'SL457632',
				// 		title: '赵成',
				// 		main: "根据留言大神的分析，他们说镯子应该是翡翠冰种或者玻璃种，不是水晶。水晶没有那么贵。我解释一下因为我不知道水晶翡翠的区别也没有刻意了解过，只是当年记忆深刻这个非常贵，不是为了引起误解，至于到底这个镯子是什么材质的，有人还私信让我再去问问，其实没有必要了，只当是个美好的回忆和小故事就好了。这个故事有快15年了，那个14万差不多就是2006年的14万。所以当年能买什么我也说不准。",
				// 		isExpand: false,
				// 		pic:'',
				// 		like: 8
				// 	}
				// ],
				commentList:[],
				addDialogVisible: false
			}
		},
		created(){
			this.getArticlesList()
		},
		methods: {
			togglePickUp(item) {
				item.isExpand = !item.isExpand; //切换状态
			},
			async getArticlesList(){
				// const { data:res } = await this.$http.get('articles', {params : 
				// {
				// 	uid:this.uid
				// }});
				// console.log(res)
				// this.commentList=res.data
				const { data:res } = await this.$http.get('articles');
				console.log(res)
				this.commentList=res.data
				for (var i = 0; i < this.commentList.length; i++) {
						 this.commentList[i]['isExpand'] = false	
					
				}
			},
			CardDetail(id) {
				//   直接调用$router.push 实现携带参数的跳转
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
	#first /deep/ .commentList-readnum{
		color:#8590a6;
		font-size: 14px;
	}
	 #first /deep/ .btn-pick-up{
		color: skyblue;
	}
	#first /deep/ .card-pic{
		flex: none;
		height: 120px;
		width: 150px;
	}
	#first /deep/ .card-pic img{
		width: 100%;
		height: 100%;
		
	}
	#first /deep/ .card-content{
		flex: 1;
		// margin-left: 10px;
	}
	#first /deep/ .card {
		border-bottom: 1px solid #f0f2f7;
	}

	#first /deep/ .card-footer {
		display: flex;
		padding-top: 20px;
	}

	#first /deep/ .card-comment-button {
		// border: none;
	}

	#first /deep/ .card-inner {
		padding: 10px 30px;
		border-bottom: 1px solid #f0f2f7;
	}



	#first /deep/ .card-content {}

	#first /deep/ .card-button-box {
		margin-left: auto;
		display: inline-block;
	}

	#first /deep/ .btn-pick-up {
		color: skyblue;
	}
	
	#first /deep/ .card-detail{
		cursor: pointer;
	}
</style>
