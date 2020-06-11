<template>
	<div>
		<el-card class="setting-card">
			<el-tabs tab-position="left" style="">
				<el-tab-pane label="个人资料">
					<el-form :rules="infoFormRules" label-position="left" ref="infoFormRef" :model="infoForm">
						<el-form-item label="用户头像" prop="" class="img-item">
							<el-upload class="avatar-uploader" :action="uploadURL" :show-file-list="false" :on-success="handleAvatarSuccess"
							 :headers="headerObj" :on-error="handleAvatarError">
								<img v-if="imageUrl" :src="imageUrl" class="setting-avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>

						</el-form-item>

						<el-form-item label="昵称" prop="nick_name">
							<el-input v-model="infoForm.nick_name" class="addFrom-input" style="width: 200px; margin-left: 25px;"></el-input>
						</el-form-item>
						<el-form-item label="性别" prop="sex">
							<el-radio v-model="infoForm.sex" label="0" style="margin-left: 25px;">男</el-radio>
							<el-radio v-model="infoForm.sex" label="1">女</el-radio>
						</el-form-item>
						<el-form-item label="自我介绍" prop="introduction">
							<el-input v-model="infoForm.introduction" class="addFrom-input" style="width: 200px;"></el-input>
						</el-form-item>
						<el-form-item class="btns">
							<el-button @click="saveInfoSetting" type="primary">保存</el-button>
						</el-form-item>
					</el-form>

				</el-tab-pane>

				<el-tab-pane label="账户安全">
					<el-form :rules="safeFormRules" :model="safeForm" ref="safeFormRef">
						<!-- <el-form-item label="原始密码" prop="oldPassword">
							<el-input v-model="safeForm.oldPassword" prefix-icon="el-icon-s-cooperation" type="password" clearable class="safeForm-input"></el-input>
						</el-form-item> -->
						<el-form-item label="新密码" prop="password">
							<el-input v-model="safeForm.password" prefix-icon="el-icon-s-cooperation" type="password" clearable class="safeForm-input"
							 style="margin-left: 25px;"></el-input>
						</el-form-item>
						<el-form-item label="确认密码" prop="checkPassword">
							<el-input v-model="safeForm.checkPassword" prefix-icon="el-icon-s-cooperation" type="password" clearable class="safeForm-input"
							 style="margin-left: 20px;">
							</el-input>
						</el-form-item>
					</el-form>
					<el-button @click="saveSafeSetting()" type="primary">确认修改</el-button>
					</el-form>
				</el-tab-pane>
			</el-tabs>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.safeForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				uploadURL: 'http://112.74.103.3:8080/seek_lost/api/file/photo',
				imageUrl:window.sessionStorage.getItem('user_icon'),
				headerObj: {
					token: window.sessionStorage.getItem('token')
				},
				infoForm: {
					user_id:window.sessionStorage.getItem('user_id'),
					user_icon:window.sessionStorage.getItem('user_icon'),
					nick_name: window.sessionStorage.getItem('nick_name'),
					sex:window.sessionStorage.getItem('sex'),
					introduction: window.sessionStorage.getItem('introduction')
				},
				safeForm: {
					user_id:window.sessionStorage.getItem('user_id'),
					user_name:window.sessionStorage.getItem('user_name'),
					// oldPassword: '',
					password: '',
					checkPassword: ''
				},
				//验证输入是否合法
				safeFormRules: {
					// oldPassword: [{
					// 	required: true,
					// 	message: "请输入原密码",
					// 	trigger: "blur"
					// }],
					checkPassword: [{
						validator: validatePass,
						trigger: "blur"
					}],
					password: [{
							required: true,
							message: "请输入新密码",
							trigger: "blur"
						},
						{
							min: 6,
							max: 15,
							message: "长度在6到15个字符",
							trigger: "blur"
						}
					],
				},
				infoFormRules: {
					nick_name: {
						required: true,
						message: "用户名不能为空",
						trigger: "blur"
					},
					sex: {
						required: true,
						message: '性别不能为空',
						trigger: 'blur'
					},
					introduction: {
						required: true,
						message: "自我介绍不能为空",
						trigger: "blur"
					}
				}

			}
		},
		methods: {
			//监听图片上传成功的事件
			handleAvatarSuccess(res) {
				if (res.code === 1000) {
					this.imageUrl = res.data
					this.infoForm.user_icon = res.data
				} else {
					this.$message.error(res.message)
				}
			},
			handleAvatarError(res) {
				console.log(res)
			},
			handlePreview() {

			},
			handleRemove() {

			},
			saveInfoSetting() { //保存个人信息
				this.$refs.infoFormRef.validate(async valid => {
					if (!valid) return;
					console.log(this.infoForm)
					const { data:res } = await this.$http.post('api/user/updateUser',
					this.infoForm);
					if(res.code !== 1000) return this.$message.error(res.message)
					this.$emit('sendData', this.infoForm.user_icon)
					window.sessionStorage.setItem("user_icon",this.infoForm.user_icon)
					window.sessionStorage.setItem("nick_name",this.infoForm.nick_name)
					window.sessionStorage.setItem("sex",this.infoForm.sex)
					window.sessionStorage.setItem("introduction",this.infoForm.introduction)
					this.$message.success('设置个人信息成功!');
				})
			},
			saveSafeSetting(){ //保存用户信息
				this.$refs.safeFormRef.validate(async valid => {
					if (!valid) return;
					const { data:res } = await this.$http.post('api/user/updatePassword',
					this.safeForm);
					//登录失败后
					if(res.code !== 1000) return this.$message.error(res.message)
					//登录成功后
					this.$message.success('设置密码成功!');
				
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.setting-avatar {
		width: 100px;
	}

	.img-item label {
		/* line-height: 110px; */
	}

	.el-form-item__error {
		margin-left: 90px;
	}

	.safeForm-input {
		width: 200px;
		margin-left: 10px;
	}
</style>
