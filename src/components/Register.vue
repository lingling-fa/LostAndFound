<template>
	<div class="login_container">
		<el-card body-style="padding : 0" shadow="hover">
			<el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules"  class="login_form" label-width="80px">
				<!-- 用户名 -->
				<el-form-item label="账号" prop="userName">
					<el-input v-model="registerForm.userName" prefix-icon="el-icon-user" clearable ></el-input>
				</el-form-item>
				<!-- 密码 -->
				<el-form-item label="密码"prop="password">
					<el-input v-model="registerForm.password" prefix-icon="el-icon-s-cooperation" type="password" clearable ></el-input>
				</el-form-item>
				<el-form-item label="确认密码"prop="checkPass">
					<el-input v-model="registerForm.checkPass" prefix-icon="el-icon-s-cooperation" type="password" clearable ></el-input>
				</el-form-item>
				<el-form-item class="btns">
					<el-button @click="register" type="primary">注册</el-button>
				</el-form-item>
				 <el-link type="primary" class="link" href="/">已有账号，直接登录</el-link>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
			        if (value === '') {
			          callback(new Error('请再次输入密码'));
			        } else if (value !== this.registerForm.password) {
			          callback(new Error('两次输入密码不一致!'));
			        } else {
			          callback();
			        }
			      };
			return {
				//登录表单的数据绑定
				registerForm: {
					userName:  '',
					password:  '',
					checkPass: ''
				},
				//验证输入是否合法
				registerFormRules: {
					userName: [{
							required: true,
							message: "请输入账号",
							trigger: "blur"
						},
						{
							min: 3,
							max: 10,
							message: "长度在3到10个字符",
							trigger: "blur"
						}
					],
					checkPass: [{
							validator: validatePass, 
							trigger: "blur"
						}
					],
					password: [{
							required: true,
							message: "请输入密码",
							trigger: "blur"
						},
						{
							min: 6,
							max: 15,
							message: "长度在6到15个字符",
							trigger: "blur"
						}
					],
				}
			}
		},
		methods: {
			register(){
				this.$refs.registerFormRef.validate(async valid => {
					if(!valid) return;
					// const { data:res } = await this.$http.post('user/register',{
					// 		userName:this.registerForm.userName,
					// 		password:this.registerForm.password
					// })
					const res = await this.$http.post('api/user/register',{
							userName:this.registerForm.userName,
							password:this.registerForm.password
					})
					console.log(res)
					if(res.data.code !== 1000) 
					    return this.$message.error('注册失败!');
					// window.sessionStorage.setItem("token",res.data.token);
					this.$message.success('注册成功!');
					this.$router.push('/login');
				})
			}
			// register(){
			// 	this.$router.push('/register');
			// }
		}
	}
</script>

<style lang="less" scoped>
 .login_container{
	 background-color: pink;
	 height: 100%;
 }
 .el-card{
	 width: 450px;
	 height: 300px;
	 position: absolute;
	 left: 50%;
	 top: 50%;
	 transform: translate(-50%, -50%);
 }
 .login_form {
 	position: absolute;
 	bottom: 0;
 	width: 100%;
 	padding: 0 30px;
 	box-sizing: border-box;
 }
 .btns{
	 display: flex;
	 justify-content: flex-end;
 }
 .link{
	 float: right;
 }
</style>