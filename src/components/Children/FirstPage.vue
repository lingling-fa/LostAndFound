<template>
	<el-card>
		<div class="card">
			<div class="card-inner" v-for="(item, index) in commentList" :key="index"  >
				<div @click="CardDetail(item.id)" class="card-detail">
				<h2 class="card-title">
					{{item.title}}
				</h2>
				<div style="display: flex">
				<div class="card-pic" v-if= "item.pic">
					<img :src="item.pic"/>
				</div>
				<div class="card-content" >
					{{item | flod }}
					<a class="btn-pick-up" v-show=" item.context.length>= 200" @click.stop="togglePickUp(item)">{{item.isExpand?'收起':'...全文'}}</a>
				</div>
				</div>
				</div>
				<div class="card-footer">
					<el-button type="primary" icon="el-icon-thumb" style="font-size: 14px;"> {{item.like}}</el-button>

					<div class="card-button-box">
						<el-button class="card-comment-button" icon="el-icon-s-promotion">转发</el-button>
						<el-button class="card-comment-button" icon="el-icon-star-on">收藏</el-button>
					</div>
				</div>
				<!-- 	<el-dialog title="请写下你的回答" :visible.sync="addDialogVisible" width="40%" :before-close="handleClose">
					<el-input type="textarea" :rows="4"  placeholder="请输入回答" v-model="textarea">
						
					</el-input>
					<span slot="footer" class="dialog-footer">
						<el-button @click="addDialogVisible = false">取 消</el-button>
						<el-button type="primary" @click="contentSure(item.id)">确 定</el-button>
					</span>
				</el-dialog> -->
			</div>

		</div>
	</el-card>


</template>

<script>
	export default {
		data() {
			return {
				commentList: [{
						id: '0',
						title: '拼多多是怎么从拼夕夕变成拼爹爹的？为什么口碑会越来越好？',
						context: "据留言大神的分析，他们说镯子应该是翡翠冰种或者玻璃种，不是水晶。水晶没有那么贵。我解释一下因为我不知道水晶翡翠的区别也没有刻意了解过，只是当年记忆深刻这个非常贵，不是为了引起误解，至于到底这个镯子是什么材质的，有人还私信让我再去问问，其实没有必要了，只当是个美好的回忆和小故事就好了。这个故事有快15年了，那个14万差不多就是2006年的14万。所以当年能买什么我也说不准其实没有必要了，只当是个美好的回忆和小故事就好了。这个故事有快15年了，那个14万差不多就是2006年的14万。所以当年能买什么我也说不准其实没有必要了，只当是个美好的回忆和小故事就好了。这个故事有快15年了，那个14万差不多就是2006年的14万。所以当年能买什么我也说不准。",
						content: '',
						pic:'http://112.74.103.3:80/seek_lost/static/image/user/2020/06/02/1591109499769617654.png',
						isExpand: false,
						like: 20
					},
					{
						id: '1',
						title: '赵成',
						context: "根据留言大神的分析，他们说镯子应该是翡翠冰种或者玻璃种，不是水晶。水晶没有那么贵。我解释一下因为我不知道水晶翡翠的区别也没有刻意了解过，只是当年记忆深刻这个非常贵，不是为了引起误解，至于到底这个镯子是什么材质的，有人还私信让我再去问问，其实没有必要了，只当是个美好的回忆和小故事就好了。这个故事有快15年了，那个14万差不多就是2006年的14万。所以当年能买什么我也说不准。",	
						isExpand: false,
						pic:'',
						like: 8
					},
					{
						id: '2',
						title: '赵成',
						context: "根据留言大神的分析，他们说镯子应该是翡翠冰种或者玻璃种，不是水晶。水晶没有那么贵。我解释一下因为我不知道水晶翡翠的区别也没有刻意了解过，只是当年记忆深刻这个非常贵，不是为了引起误解，至于到底这个镯子是什么材质的，有人还私信让我再去问问，其实没有必要了，只当是个美好的回忆和小故事就好了。这个故事有快15年了，那个14万差不多就是2006年的14万。所以当年能买什么我也说不准。",
						isExpand: false,
						pic:'',
						like: 8
					}
				],

				addDialogVisible: false
			}
		},
		methods: {
			togglePickUp(item) {
				item.isExpand = !item.isExpand; //切换状态
			},
			contextFold(status) {
				console.log(status)
				return !status;
			},
			contentSure(id) {
				console.log(id)
			},
			CardDetail(id) {
				//   直接调用$router.push 实现携带参数的跳转
				this.$router.push({
					// path: `/describe/${id}`
					path:'detail'
				})
			}
		}}
</script>

<style lang="less">
	.btn-pick-up{
		color: blue;
	}
	.card-pic{
		flex: none;
		height: 120px;
		width: 150px;
	}
	.card-pic img{
		width: 100%;
		height: 100%;
	}
	.card-content{
		flex: 1;
	}
	.card {
		border-bottom: 1px solid #f0f2f7;
	}

	.card-footer {
		display: flex;
		padding-top: 20px;
	}

	.card-comment-button {
		border: none;
	}

	.card-inner {
		padding: 10px 30px;
		border-bottom: 1px solid #f0f2f7;
		// padding-bottom: 20px;
	}

	.Table {
		// height: 200px;
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
