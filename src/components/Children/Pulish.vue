<template>
	<div>
		<el-card>
			<el-form :model="addForm" ref="addFormRef" :rules="addFormRules">
				<el-form-item label="类型" prop="goods_classify">
					<el-radio v-model="addForm.goods_classify" label="1" style="margin-left: 30px;">捡到物品</el-radio>
					<el-radio v-model="addForm.goods_classify" label="2">丢失物品</el-radio>
				</el-form-item>
				<el-form-item label="物品名称" prop="goods_name">
					<el-input v-model="addForm.goods_name"  style="width: 500px;"></el-input>
				</el-form-item>
				<el-form-item label="时间" prop="goods_time">
					<div class="block" style="margin-left: 80px;">
						<el-date-picker v-model="addForm.goods_time" type="datetime" placeholder="选择日期时间" align="right" >
						</el-date-picker>
					</div>
				</el-form-item>
				<el-form-item label="地点" prop="goods_address">
					<el-input v-model="addForm.goods_address" style="width: 220px;margin-left: 30px;" ></el-input>
				</el-form-item>
				<el-form-item label="具体描述" prop="goods_describe">
					<el-input v-model="addForm.goods_describe" :rows="4" type="textarea" style="width: 500px;">

					</el-input>
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
			<el-button type="primary" @click="pulish" style="margin-left: 190px; margin-top: 60px;" >
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
				picList:[],
				addForm: {
					goods_classify: '',
					goods_name: '',
					goods_time: '',
					goods_address: '',
					goods_describe: '',
					goods_pic:[]
				},
				addFormRules: {
					goods_classify: {
						required: true,
						message: "类型不能为空",
						trigger: "blur"
					},
					goods_name: {
						required: true,
						message: '物品名称不能为空',
						trigger: 'blur'
					},
					goods_time: {
						required: true,
						message: "时间不能为空",
						trigger: "blur"
					},
					goods_address: {
						required: true,
						message: "地点不能为空",
						trigger: "blur"
					},
					goods_describe: {
						required: true,
						message: "描述不能为空",
						trigger: "blur"
					}

				}
			}
		},
		methods:{
			handlePublishSuccess(res){
				const picInfo = {pics:res.data}
				this.addForm.goods_pic.push(picInfo)
				console.log(this.addForm.goods_pic)
			},
			handlePublishRemove(file){
				// console.log(file)
				//获取要删除图片的临时路径
				const filePath = file.response.data
				//找到表单中对应的索引值
				const i = this.addForm.goods_pic.findIndex(x => x.pics===filePath)
				//从表单中删除
				this.addForm.goods_pic.splice(i,1)
				console.log(this.addForm.goods_pic)
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

<style lang="less" >
	
	.el-form-item__error{
		margin-left: 80px;
	}
</style>
