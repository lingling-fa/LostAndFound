<template>
	<div id="detail">
		<el-card>
			<div id="title-detail">
				<h2>{{commentList.title}}</h2>
				<div>{{commentList.context}}</div>
				<div class="card-footer">
					<!-- <el-button type="primary" icon="el-icon-thumb" style="font-size: 14px;"> {{commentList.like}}</el-button> -->
					<span id="commentList-readnum">阅读量：{{commentList.read_number || 0}}</span>
					<div class="card-button-box">
						<el-button class="card-comment-button" icon="el-icon-edit" @click="commentVisible = true">写回答</el-button>
						<el-button class="card-comment-button" type="primary" icon="el-icon-star-on" @click="leaveMsg('A.'+commentList.id)">私信</el-button>
					</div>
				</div>
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
						<el-avatar shape="square" :size="50" src="http://m.imeitou.com/uploads/allimg/2019022710/b4jgfd5plcg.jpg" class="HeaderPho">
						</el-avatar>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item :command="'A.'+item.user_id">私信</el-dropdown-item>
							<el-dropdown-item :command="'B.'+item.user_id" v-if="currentUserRoleNum == 2">管理权限</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>

					<div class="user-info">
						<div class="user-name">{{item.userName}}</div>
						<div class="user-desc">{{item.userDescribe}}</div>
					</div>
				</div>
				<!-- 用户的评论 -->
				<div class="answer-content">
					{{item.content}}
				</div>
				<div class="answer-time">
					发布于{{item.date}}
				</div>
				<div class="answer-actions">
					<el-button type="primary" icon="el-icon-thumb" plain style="font-size: 14px;" size="mini"> {{item.like_number}}</el-button>
				</div>
			</div>
			<el-dialog title="写评论" :visible.sync="commentVisible" width="40%" center custom-class="chatDialog">
				<div id="chatDialogDiv">
					<el-input type="textarea" :rows="2" placeholder="请输入" v-model="commentInput">
					</el-input>
					<div slot="footer" class="dialog-footer">
						<el-button @click="commentVisible = false">取 消</el-button>
						<el-button type="primary" @click="commentSend()">确 定</el-button>
					</div>
				</div>
			</el-dialog>
			<el-dialog title="留言板" :visible.sync="leaveDialogVisible" width="40%" center custom-class="chatDialog">
				<div id="chatDialogDiv">
					<el-input type="textarea" :rows="2" placeholder="请输入" v-model="leaveMsgInput">
					</el-input>
					<div slot="footer" class="dialog-footer">
						<el-button @click="leaveDialogVisible = false">取 消</el-button>
						<el-button type="primary" @click="leaveSend()">确 定</el-button>
					</div>
				</div>
			</el-dialog>

			<el-dialog title="权限管理" :visible.sync="changeRoleVisible" width="30%" style="margin-top: 23vh;" center>
				<div id="changeRoleDiv">
					<el-radio-group v-model="changeRoleNum">
						<el-radio :label="3">普通用户</el-radio>
						<el-radio :label="1">管理员</el-radio>
					</el-radio-group>
					<!-- <el-radio v-model="changeRoleNum" label="3">普通用户</el-radio>
					  <el-radio v-model="changeRoleNum" label="1">管理员</el-radio> -->
					<div class="dialog-footer">
						<el-button @click="changeRoleVisible = false">取 消</el-button>
						<el-button type="primary" @click="updataRoleNum()">确 定</el-button>
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
				PostId: this.$route.params.id, //获取帖子的id
				changeRoleNum: '',
				changUserId: '',
				commentVisible: false,
				changeRoleVisible: false,
				leaveDialogVisible: false,
				currentUserRoleNum: 2,
				leaveMsgInput: '',
				commentInput: '',
				chatId: '13',
				commentList: '',
				answer: []

			}
		},
		created() {
			this.getDetails()
		},
		methods: {
			async getDetails() { //获取帖子详情
				const {
					data: res
				} = await this.$http.get('article', {
					params: {
						id: this.PostId
					}
				});
				console.log(res)
				if (res.code !== 1000) {
					this.$message.error("该贴有异常")
					this.$router.back(-1)
				}
				this.commentList = {
					id: res.data.author_id,
					title: res.data.title,
					context: res.data.content,
					read_number: res.data.read_number
				}
				this.answer = res.data.comments
				for (var i = 0; i < this.answer.length; i++) {
					if(this.answer[i].user_id === 13){
						this.answer[i]['userName']="ls"
						this.answer[i]['userDescribe']="哥只是一个传说"	
					}
					if(this.answer[i].user_id === 14){
						this.answer[i]['userName']="ww"
						this.answer[i]['userDescribe']="这个人很懒，什么也没留下"	
					}
					if(this.answer[i].user_id === 16){
						this.answer[i]['userName']="zhangsan"
						this.answer[i]['userDescribe']="我是三三三"	
					}
					if(this.answer[i].user_id === 17){
						this.answer[i]['userName']="lisi"
						this.answer[i]['userDescribe']="我是老四啊"	
					}
				}
			},
			async commentSend() {

				const {
					data: res
				} = await this.$http.post('comment', {
					id: this.PostId
				});
			},
			leaveMsg(command) {
				var arr = command.split(".")
				// console.log(arr)
				if (arr[0] === "A") {
					this.leaveDialogVisible = true;
					this.chatId = arr[1];
				}
				if (arr[0] === "B") {
					//调用更新权限的接口
					this.changUserId = arr[1]
					this.showRoleDialog(arr[1])
				}
			},
			leaveSend() {
				var Msg = this.leaveMsgInput;
				var Id = this.chatId;
				// console.log(Msg)
				// console.log(Id)
				this.$parent.send(Msg, Id)
				this.leaveMsgInput = "";

			},
			async showRoleDialog(userId) {
				const {
					data: res
				} = await this.$http.post('api/admin/selectRoleIdByUserId', {
					user_id: userId, //查看用户的id	
				});
				console.log(res.data)
				if (res.data !== 3) {
					return this.$message.error("对方也是管理员，您无法管理他的权限")
				}

				this.changeRoleNum = res.data;
				this.changeRoleVisible = true;
			},
			updataRoleNum() {
				var roleName
				if (this.changeRoleNum === 1) roleName = "管理员"
				if (this.changeRoleNum === 3) roleName = "普通用户"
				this.$confirm("确认修改为" + roleName + "?")
					.then(_ => {

						this.updataRoleInterface(this.changUserId, this.changeRoleNum)
						this.changeRoleVisible = false;
						done();
					})
					.catch(_ => {});
			},
			async updataRoleInterface(id, num) {
				const {
					data: res
				} = await this.$http.post('api/admin/updateUserRole', {
					user_id: id,
					role_id: num
				});
				if (res.code !== 1000) {
					return this.$message.error(res.message)
				}
				this.$message.success("设置成功！")
			}
		}
	}
</script>

<style scoped lang="less">
	#detail /deep/ #commentList-readnum {
		color: #8590a6;
		font-size: 14px;
		margin-top: 15px;
	}

	#detail /deep/ .answer-header {
		font-weight: bold;
	}

	#detail /deep/ .user-info {
		display: inline-block;
		height: 50px;
	}

	#detail /deep/ .user {
		height: 60px;
	}

	#detail /deep/ .user-info {
		margin-left: 10px;
	}

	#detail /deep/ .user-name {
		color: inherit;
		font-weight: 600;
		/* font-weight: bold; */
	}

	#detail /deep/ .user-desc {
		 font-size: 12px; 
		color: #646464;
	}

	#detail /deep/ .answer-item {
		border-bottom: 1px solid #dcdfe6;
		;
	}

	#detail /deep/ .card-footer {
		display: flex;
		padding-top: 20px;
	}

	#detail /deep/ .answer-time {
		color: #8590a6;
		font-size: 14px;
		margin-top: 5px;
	}

	#detail /deep/ .answer-actions {
		margin-top: 10px;
		margin-bottom: 15px;
	}

	#detail /deep/ .card-button-box {
		margin-left: auto;
		display: inline-block;
	}

	#detail /deep/ .answer-content {}
</style>
