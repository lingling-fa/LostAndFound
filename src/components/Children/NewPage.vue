<template>
	<div>
		<el-card>
			
				<el-form :model="addForm" ref="addFormRef" :rules="addFormRules">
					<el-form-item label="文章标题" prop="title">
						<el-input v-model="addForm.title" class="addFrom-input" style="width: 200px;"></el-input>
					</el-form-item>
					<el-form-item label="文章内容" prop="content">
						<el-input v-model="addForm.content" class="addFrom-input" type="textarea" style="width: 600px;" :rows="6"></el-input>
					</el-form-item>
					<el-form-item label="图片" style="margin-left: 15px;" >
						<el-upload
						  class="upload-demo"
						  :action="uploadURL"
						  :headers="headerObj" 
						  :on-success="handlePublishSuccess"
						  :on-remove="handlePublishRemove"
						  :limit= 3
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
					title:'',
					content:'',
					author_id:window.sessionStorage.getItem('user_id'),
					article_pic:[]
				},
				addFormRules: {
					title: {
						required: true,
						message: "文章标题不能为空",
						trigger: "blur"
					},
					content: {
						required: true,
						message: '文章内容不能为空',
						trigger: 'blur'
					}				
				}
			}
		},
		methods:{
			handlePublishSuccess(res){
				const picInfo = {pics:res.data}
				this.addForm.article_pic.push(picInfo)
				// console.log(this.addForm.article_pic)
			},
			handlePublishRemove(file){
				// console.log(file)
				//获取要删除图片的临时路径
				const filePath = file.response.data
				//找到表单中对应的索引值
				const i = this.addForm.article_pic.findIndex(x => x.pics===filePath)
				console.log(i)
				//从表单中删除
				this.addForm.article_pic.splice(i,1)
				console.log(this.addForm.article_pic)
			},
			pulish(){
				this.$refs.addFormRef.validate(async valid => {
					console.log(this.addForm)
					if(!valid) return;
					var x = {
						author_id:this.addForm.author_id,
						title:this.addForm.title,
						content:this.addForm.content
					}
					console.log(x)
					const { data:res } = await this.$http.post('api/admin/checkError',x);
					console.log(res)
					if(res.code!==1000) return this.$message.error(res.message)
					// const { data:res } = await this.$http.post('article',{
					// 	// id:"",
					// 	author_id:this.addForm.author_id,
					// 	title:this.addForm.title,
					// 	main:this.addForm.content,
					// 	data:new Date(),
					// });
					// if(res.code !==1000) return this.$message.error("内容违规，无法发布")
					
					// console.log(res)
					this.$message.success("帖子发布成功")
					// this.addForm.title=""
					// this.addForm.content=""
					
					//登录失败后
					// if(res.code !== 1000) return this.$message.error(res.error)
					//登录成功后
					// this.$message.success('发布成功!');
					
				})
				// console.log(this.$refs)
			}
		}
	}
</script>

<style>
</style>
