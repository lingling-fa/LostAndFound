<template>
	<div>
		<el-card>
			
				<el-form :model="addForm" ref="addFormRef" :rules="addFormRules">
					<el-form-item label="文章标题" prop="article_title">
						<el-input v-model="addForm.article_title" class="addFrom-input" style="width: 200px;"></el-input>
					</el-form-item>
					<el-form-item label="文章内容" prop="article_details">
						<el-input v-model="addForm.article_details" class="addFrom-input" type="textarea" style="width: 600px;" :rows="6"></el-input>
					</el-form-item>
					<el-form-item label="图片" style="margin-left: 15px;" >
						<el-upload
						  class="upload-demo"
						  :action="uploadURL"
						  :headers="headerObj" 
						  :on-success="handlePublishSuccess"
						  :on-remove="handlePublishRemove"
						  :file-list="fileList"
						  list-type="picture">
						  <el-button size="small" type="primary" style="margin-left: 20px;">上传图片</el-button>
						</el-upload>
					</el-form-item>
				</el-form>
				<el-button type="primary" @click="pulish" style="margin-left: 120px; margin-top: 20px;" >
					点击发布
				</el-button>
			
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				uploadURL:'http://112.74.103.3:8080/seek_lost/api/file/photo',
				headerObj:{
					token:window.sessionStorage.getItem('token')
				},
				fileList:[],
				addForm: {
					article_title:'',
					article_details:''
				},
				addFormRules: {
					article_title: {
						required: true,
						message: "文章标题不能为空",
						trigger: "blur"
					},
					article_details: {
						required: true,
						message: '文章内容不能为空',
						trigger: 'blur'
					}				
				}
			}
		},
		methods:{
			handlePublishSuccess(){
				
			},
			handlePublishRemove(){
				
			},
			pulish(){
				this.$refs.addFormRef.validate(async valid => {
					if(!valid) return;
					console.log(this.addForm)
					// const { data:res } = await this.$http.post('user/loginByPassword',this.loginForm);
					// console.log(res)
					//登录失败后
					// if(res.code !== 1000) return this.$message.error(res.error)
					//登录成功后
					this.$message.success('发布成功!');
					
				})
				// console.log(this.$refs)
			}
		}
	}
</script>

<style>
</style>
