<template>
	<div>
		<el-card>
			<div id="title-detail">
				<h2>{{commentList.title}}</h2>
				<div>{{commentList.context}}</div>
				<div class="card-footer">
					<el-button type="primary" icon="el-icon-thumb" style="font-size: 14px;"> {{commentList.like}}</el-button>

					<div class="card-button-box">
						<el-button class="card-comment-button" icon="el-icon-edit" @click="addDialogVisible = true">写回答</el-button>
						<el-button class="card-comment-button" icon="el-icon-s-promotion">转发</el-button>
						<el-button class="card-comment-button" icon="el-icon-star-on">收藏</el-button>
					</div>
				</div>
			</div>
			<div v-for="(item, index) in commentList">

			</div>
		</el-card>
		
		<el-card style="margin-top: 25px;">
			<div class="answer-header">
				{{answer.length}}个回答
			</div>
			<div v-for="(item, index) in answer" :key="index" v-model="answer" class="answer-item">
				<!-- 用户信息 -->
				<div class="user">
					<el-dropdown @command="leaveMsg">
						<el-avatar shape="square" :size="50" src="http://m.imeitou.com/uploads/allimg/2019022710/b4jgfd5plcg.jpg" class="HeaderPho" >
						 </el-avatar>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item  :command="item.userId" >留言</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					
					 <div class="user-info">
						<div class="user-name">{{item.userName}}</div>
						<div class="user-desc">{{item.userDescribe}}</div>
					 </div>
				</div>
				<!-- 用户的评论 -->
				<div class="answer-content">
					{{item.context}}
				</div>
				<div class="answer-time">
					发布于{{item.time}}
				</div>
				<div class="answer-actions">
					<el-button type="primary" icon="el-icon-thumb" plain style="font-size: 14px;" size="mini" > {{item.like}}</el-button>
			    </div>
			</div>
			<el-dialog title="留言板" :visible.sync="leaveDialogVisible" width="40%" center custom-class="chatDialog" >
				<div id="chatDialogDiv">
					<el-input type="textarea" :rows="2" placeholder="请输入" v-model="leaveMsgInput">
					</el-input>
					<div slot="footer" class="dialog-footer">
						<el-button @click="leaveDialogVisible = false">取 消</el-button>
						<el-button type="primary" @click="leaveSend()">确 定</el-button>
					</div>
				</div>
			</el-dialog>
		</el-card>
	
	</div>
</template>

<script>
	export default {
		data() {
			return {
				leaveDialogVisible:false,
				leaveMsgInput:'',
				chatId:'',
				commentList: {
					id: '0',
					title: '蒋军成',
					context: "据留言大神的分析，他们说镯子应该是翡翠冰种或者玻璃种，不是水晶。水晶没有那么贵。我解释一下因为我不知道水晶翡翠的区别也没有刻意了解过，只是当年记忆深刻这个非常贵，不是为了引起误解，至于到底这个镯子是什么材质的，有人还私信让我再去问问，其实没有必要了，只当是个美好的回忆和小故事就好了。这个故事有快15年了，那个14万差不多就是2006年的14万。所以当年能买什么我也说不准。",
					content: '',
					isExpand: false,
					like: 20
				},
				answer:[
					{
						id:'0',
			            userName:'张三',
						userId:'13',
						userDescribe:'计算机学院',
						context:'退化，你想啥呢，一头成年猪需要五六个成年男性才能按住，这还是需要至少一个专业屠夫，用专业工具勾住下颚，这个时候猪会一直叫，就像你乱叫的时候，老辈人会说你叫的跟杀猪一样，保不齐他们看过怎么杀猪。然后能抓的都给他抓住，四条腿，耳朵， 尾巴，一个不能少，少一个晚上就吃不到肉了。话说家养的猪是真香！',
						time:'2020-5-20',
						like:17
					},
					{
						id:'1',
					    userName:'李四',
						userId:'14',
						userDescribe:'机电学院',
						context:'一般人都混淆了一个基本概念：公立/私立，盈利/非盈利机构。公立非盈利机构，最简单的就是政府。政府的存在不是以赚钱为目的的。但不盈利不代表不花钱，收支平衡即可。公立盈利性机构，最常见就是国企。国企以赚钱为目的，但是赚的钱归国家。私立盈利性机构，就是企业。企业以赚钱为目的，盈利归企业所有人，一般是股东。',
						time:'2020-5-20',
						like:17
					},
					{
						id:'2',
						userName:'王五',
						userId:'17',
						userDescribe:'外国语学院',
						context:'退化，你想啥呢，一头成年猪需要五六个成年男性才能按住，这还是需要至少一个专业屠夫，用专业工具勾住下颚，这个时候猪会一直叫，就像你乱叫的时候，老辈人会说你叫的跟杀猪一样，保不齐他们看过怎么杀猪。然后能抓的都给他抓住，四条腿，耳朵， 尾巴，一个不能少，少一个晚上就吃不到肉了。话说家养的猪是真香！',
						time:'2020-5-20',
						like:17
					}
				]
			
			}
		},
		methods:{
			leaveMsg(command){
				this.leaveDialogVisible = true;
				this.chatId = command;
				console.log(command)
			},
			leaveSend(){
			  var Msg = this.leaveMsgInput;
			  var Id =this.chatId;
			  this.$parent.send(Msg,Id)
			}	
		}
	}
</script>

<style>
	.answer-header{
		font-weight: bold;
	}
	.user-info{
		display: inline-block;
		height: 50px;
	}
	.user{
		height: 60px;
	}
	.user-info{
		margin-left: 10px;
	}
	.user-name{
		color: inherit;
		font-weight: 600;
		/* font-weight: bold; */
	}
	.user-desc{
		/* font-size: 12px; */
		color:#646464;
	}
	.answer-item{
		border-bottom: 1px solid #b9babd;;
	}
	.answer-time{
		color:#8590a6;
		font-size: 14px;
		margin-top: 5px;
	}
	.answer-actions{
		margin-top: 10px;
		margin-bottom: 15px;
	}
	.answer-content{
	
	}
</style>
