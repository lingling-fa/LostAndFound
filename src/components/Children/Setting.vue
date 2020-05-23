<template>
	<div>
		<el-card class="setting-card">
				<el-tabs tab-position="left" style="" >
					<el-tab-pane label="个人资料">
						<el-form >
						<el-form-item label="用户头像" prop="" class="img-item">
							<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
							 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
								<img v-if="imageUrl" :src="imageUrl" class="setting-avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						
						<el-form-item label="用户昵称" prop="">
							<el-input v-model="settingForm.user_name" class="addFrom-input" style="width: 200px;"></el-input>
						</el-form-item>
						<el-form-item class="btns">
							<el-button @click="" type="primary">保存</el-button>
						</el-form-item>
                        </el-form>

					</el-tab-pane>
					
					<el-tab-pane label="账户安全">
						<el-form :rules="FormRules" :model="changeForm">
						<el-form-item label="原始密码" prop="oldPassword">
							<el-input v-model="changeForm.oldPassword" prefix-icon="el-icon-s-cooperation" type="password" clearable></el-input>
						</el-form-item>
						<el-form-item label="新密码" prop="newPassword">
							<el-input v-model="changeForm.newPassword" prefix-icon="el-icon-s-cooperation" type="password" clearable></el-input>
						</el-form-item>
						<el-form-item label="确认密码" prop="checkPassword">
							<el-input v-model="changeForm.checkPassword" prefix-icon="el-icon-s-cooperation" type="password" clearable>
							</el-input>
						</el-form-item>
						<el-form-item class="btns">
							<el-button @click="" type="primary">确认修改</el-button>
						</el-form-item>
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
				} else if (value !== this.changeForm.newPassword) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				settingForm: {
					user_icon: '',
					user_name: ''
				},
				changeForm: {
					oldPassword: '',
					newPassword: '',
					checkPassword: ''
				},
				//验证输入是否合法
				FormRules: {
					oldPassword: [{
						required: true,
						message: "请输入原密码",
						trigger: "blur"
					}],
					checkPassword: [{
						validator: validatePass,
						trigger: "blur"
					}],
					newPassword: [{
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
				imageUrl: 'http://m.imeitou.com/uploads/allimg/2019022710/b4jgfd5plcg.jpg'
			}
		}
	}
</script>

<style>
	.setting-avatar {
		width: 100px;
	}

	.img-item label {
		/* line-height: 110px; */
	}
</style>
