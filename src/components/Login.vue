<template>
	<div class="login_container">
		<el-card body-style="padding : 0" shadow="hover">
			<el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="60px" class="login_form">
				<!-- 用户名 -->
				<el-form-item prop="user_name" label="账号">
					<el-input v-model="loginForm.user_name" prefix-icon="el-icon-user" clearable></el-input>
				</el-form-item>
				<!-- 密码 -->
				<el-form-item prop="password" label="密码">
					<el-input v-model="loginForm.password" prefix-icon="el-icon-s-cooperation" type="password" clearable></el-input>
				</el-form-item>
			
				<el-form-item class="btns">
					<el-button type="primary" @click="login">登录</el-button>
					<el-button @click="register">注册</el-button>
				</el-form-item>
			
			</el-form>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				//登录表单的数据绑定
				loginForm: {
					user_name: 'ls',
					password: '777777'
				},
				//验证输入是否合法
				loginFormRules: {
					user_name: [{
							required: true,
							message: "请输入用户名",
							trigger: "blur"
						}
						// {
						// 	min: 3,
						// 	max: 10,
						// 	message: "长度在3到10个字符",
						// 	trigger: "blur"
						// }
					],
					password: [{
							required: true,
							message: "请输入密码",
							trigger: "blur"
						}
						// {
						// 	min: 6,
						// 	max: 15,
						// 	message: "长度在6到15个字符",
						// 	trigger: "blur"
						// }
					]
				}
			}
		},
		methods: {
			login(){
				this.$refs.loginFormRef.validate(async valid => {
					if(!valid) return;
					const { data:res } = await this.$http.post('api/user/loginByPassword',this.loginForm);
					console.log(res)
					//登录失败后
					if(res.code !== 1000) return this.$message.error(res.error)
					//登录成功后
					this.$message.success('登录成功!');
					window.sessionStorage.setItem("token",res.data.token)
					window.sessionStorage.setItem("user_id",res.data.user_id)
					window.sessionStorage.setItem("user_name",res.data.user_name)
					window.sessionStorage.setItem("user_icon",'http://112.74.103.3:80/seek_lost/static/image/user/'+res.data.icon)
					window.sessionStorage.setItem("nick_name",res.data.nick_name)
					window.sessionStorage.setItem("sex",res.data.sex)
					window.sessionStorage.setItem("introduction",res.data.introduction)
					
					this.$router.push('/firstPage');
				})
			},
			register(){
				this.$router.push('/register');
			}
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
 	padding: 0 40px;
 	box-sizing:  border-box;
 }
 .btns{
	 display: flex;
	 justify-content: flex-end;
 }
</style>
