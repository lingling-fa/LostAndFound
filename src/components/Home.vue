<template>
	<div id="root">
		<!-- header开始 -->
		<div id="header">
			<div id="header-inner">
				<img src="../../public/schoolLogo.png" id="schoolLogo" />
				<el-menu :default-active="activeIndex" class="headNav" mode="horizontal" :router="true">
					<el-menu-item :index="'/'+'firstPage'">首页</el-menu-item>
					<el-menu-item :index="'/'+'pulish'">登记物品</el-menu-item>
					<el-menu-item :index="'/'+'newpage'">发布新帖子</el-menu-item>
				</el-menu>
				<!-- 搜索框 -->
				<!-- 	<el-input class="searchInput" placeholder="请输入内容">
					<i slot="prefix" class="el-input__icon el-icon-search "></i>
				</el-input> -->
				<div class="header-right">
					<!-- 消息提醒 -->
					<el-dropdown @command="chatCommand">
						<span id="header-right-span">消息</span>
						<el-badge id="header-right-badge" class="mark" :value="no_receive_num" />
						<el-dropdown-menu>
							<el-dropdown-item icon="el-icon-user-solid" v-for="(item, index) in allChatInfo" :command="item.name">{{item.name}}</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<!-- 聊天框 -->
					<el-dialog :title="chatObject" :visible.sync="chatDialogVisible" width="40%" center custom-class="chatDialog"
					 :before-close="chatDialogClose">
						<div id="chatDialogDiv">
							<div class="talkShow">
								<div v-for="item in currentChatInfo" :class="item.receiver_id == currentUserId ? 'hisTalks':'ourTalks'">
									<div class="talkTime">{{item.send_time}}</div>
									<div class="talkMsg">{{item.msg}}</div>
								</div>
							</div>
							<el-input type="textarea" :rows="2" placeholder="请输入" v-model="chatInputMessage">

							</el-input>
							<div slot="footer" class="dialog-footer">
								<el-button @click="chatDialogVisible = false">取 消</el-button>
								<el-button type="primary" @click="send()">确 定</el-button>
							</div>
						</div>
					</el-dialog>
					<!-- 头像和下拉框 -->
					<el-dropdown @command="handleCommand">
						<el-avatar shape="square" :size="50" :src="userImg" class="HeaderPho ">
						</el-avatar>
						<el-dropdown-menu slot="dropdown">
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
				path: 'ws://112.74.103.3:8080/seek_lost/server/chat?token=' + window.sessionStorage.getItem('token'),
				currentUserId: window.sessionStorage.getItem('user_id'),
				socket: "",
				activeIndex: '',
				userImg: 'http://112.74.103.3:80/seek_lost/static/image/user/defaultAvatar.png',
				no_receive_num: 0,
				chatDialogVisible: false,
				chatObject: '',
				allChatInfo: [],
				chatInputMessage: '',
				currentChatInfo: [],
				currentChatId: '',
				currentChatNum: '',
				wsMsgIds: [1, 2, 3, 4],
				isLeaveMsg: false
			}

		},
		mounted() {
			// 初始化
			this.init()
			// this.send()
		},
		methods: {
			handleCommand(command) {
				// this.$message('click on item ' + command);
				if (command === "a") {
					this.activeIndex = '/' + 'pulish';
					this.$router.push({
						path: 'pulish'
					})
				}
				if (command === 'b') {
					this.$router.push({
						path: 'setting'
					})
				}
				if (command === 'c') {
					window.sessionStorage.clear()
					this.$router.push({
						path: '/login'
					})
				}
				this.activeIndex = '/' + 'pulish'
			},
			chatCommand(command) {
				this.chatObject = command;
				this.chatDialogVisible = true;
				this.changeChatInfo(command); //调用函数，改变聊天内容
			},
			changeChatInfo(name) {
				var findFlag = false; //找到聊天对象则改为true
				for (let i = 0; i < this.allChatInfo.length; i++) {
					if (name === this.allChatInfo[i].name) {
						this.currentChatInfo = this.allChatInfo[i].talkInfo
						this.currentChatId = this.allChatInfo[i].id
						this.currentChatNum = i
						findFlag = true;
					}
				}
				if (findFlag === false) {
					this.currentChatNum = this.allChatInfo.length; //指向数组的下一个长度
				}
			},
			async changeMsgState() {
				// const { data:res1 } = await this.$http.get('wsMsg/selectAllUser');
				// const { data:res2 } = await this.$http.get('user/selectAllUser');  
				// console.log(res1)	
				// console.log(res2)
			},
			chatDialogClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						this.changeMsgState();
						done();
					})
					.catch(_ => {});
			},
			init: function() {
				if (typeof(WebSocket) === "undefined") {
					alert("您的浏览器不支持socket")
				} else {
					// 实例化socket
					this.socket = new WebSocket(this.path)
					// 监听socket连接
					this.socket.onopen = this.open
					// 监听socket错误信息
					this.socket.onerror = this.error
					// 监听socket消息
					this.socket.onmessage = this.getMessage
				}
			},
			open: function() {
				console.log("socket连接成功")
			},
			error: function() {
				console.log("连接错误")
			},
			getMessage: function(msg) {
				if (msg.data === '[]') return;

				var messageObj = JSON.parse(msg.data); //将json转为对象
				try {
					// console.log(messageObj)
					if (messageObj.length >= 0) { //获取未读消息的时候，是个数组
						for (let i = 0; i < messageObj.length; i++) {
							this.allChatInfo.push({
								id: messageObj[i].sender_id,
								name: messageObj[i].sender_name,
								talkInfo: messageObj[i].wsMsgList
							})
							this.no_receive_num += messageObj[i].no_receive_num;
						}
					} else { //实时接受时候，只是一条数据
				      	this.changeChatInfo(messageObj.receiver_id);
					    	if (this.currentChatNum < this.allChatInfo.length) { 
								//用户已经在列表里
								this.allChatInfo[this.currentChatNum].talkInfo.push({
									msg: messageObj.msg,
									send_time: messageObj.send_time,
									receiver_id: messageObj.receiver_id
								})
							} else { //用户并未在列表里，是第一次聊天							
								this.allChatInfo.push({
									id: messageObj.sender_id,
									name: messageObj.sender_name,
									talkInfo: [{
										msg: messageObj.msg,
										send_time: messageObj.send_time,
										receiver_id: messageObj.receiver_id
									}]
								})
						    }

					}
				} catch (error) {
					this.$message.error(error)
				}
				// console.log(this.allChatInfo)
			},
			send: function(Msg, ChatId) {
				if (typeof(Msg) == "undefined") {
					Msg = this.chatInputMessage
				}
				if (typeof(ChatId) == "undefined") {
					ChatId = this.currentChatId
				} else {
					this.isLeaveMsg = true;
				}
				var object = {
					"msg": Msg, //信息内容
					"msg_type": "String", //信息类型，一般为String
					"receiver_id": ChatId, //接收用户的id
					"sender_id": this.currentUserId, //发送用户ID
					"data": ''
				}
				this.socket.send(JSON.stringify(object)),
					this.chatInputMessage = ''
			},
			close: function() {
				console.log("socket已经关闭")
			}
		},
		destroyed() {
			// 销毁监听
			this.socket.onclose = this.close
		}
	}
</script>

<style lang="less">
	#header {
		border-bottom: 2px solid #E4E7ED;
		box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
	}

	#main-inner {
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
		width: 700px;
		border-bottom: none !important;
	}

	.el-menu-item {
		font-size: 16px !important;
		padding: 0 40px !important;
	}

	.el-dropdown-menu__item {
		padding: 0 30px !important;
	}

	.header-right {
		display: flex;
		align-items: center;
		// display: inline-block !important;
		margin-left: auto;
	}

	.el-badge {
		// width: 100px;
	}

	#header-right-span {
		color: #909399;
		font-size: 16px;
	}

	#header-right-badge {
		margin-bottom: 10px;
	}

	.el-dropdown {
		margin-left: 10px;
		margin-right: 10px;
	}

	.chatDialog>.el-dialog__body {
		max-height: 500px;
		overflow: auto;
	}

	.chatDialog>.el-dialog__header {
		// position:absolute;
		// top: 20px;
		// left: 20px;
	}

	.talkTime {
		font-size: 12px;
		// display: inline-block;
		// margin: 0 auto;
		// width: 100%;
	}

	.talkMsg {
		font-size: 16px;
		font-weight: 500;
		max-width: 90%;
		// width: 100%;
	}

	.hisTalks {
		display: flex;
		flex-direction: column;
		// // flex-wrap: wrap;
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */
		max-width: 180px;
		margin: 10px;
		border-radius: 10px;
		background-color: skyblue;
	}

	.ourTalks {
		display: flex;
		flex-direction: column;
		// // flex-wrap: wrap;
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */
		max-width: 180px;
		margin: 10px;
		margin-left: auto;
		border-radius: 10px;
		background-color: lightgreen;
	}

	.dialog-footer {
		display: flex;
		// margin-left: auto;
	}

	.dialog-footer>.el-button {
		margin-top: 10px;
		margin-left: auto;
	}
</style>
