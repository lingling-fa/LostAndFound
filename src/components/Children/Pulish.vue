<template>
	<div>
		<el-card>
					<el-form>
						<el-form-item label="类型" prop="">
							<el-radio v-model="addForm.goods_classify" label="1" style="margin-left: 30px;">捡到物品</el-radio>
							  <el-radio v-model="addForm.goods_classify" label="2">丢失物品</el-radio>
						</el-form-item>
						<el-form-item label="物品名称" prop="">
							<el-input v-model="addForm.goods_name" class="addFrom-input"></el-input>
						</el-form-item>
						<el-form-item label="时间" prop="">
							<div class="block" style="margin-left: 70px;">
								<el-date-picker v-model="addForm.goods_time" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions">
								</el-date-picker>
							</div>
						</el-form-item>
						<el-form-item label="地点" prop="" >
							<el-input v-model="addForm.goods_weight"  style="width: 220px;margin-left: 30px;"></el-input>
						</el-form-item>
						<el-form-item label="具体描述" prop="">
							<el-input v-model="addForm.goods_number" :row="5" type="textarea" class="addFrom-input">

							</el-input>
						</el-form-item>
					</el-form>
				<el-button  type="primary" style="margin-left: 120px; margin-top: 20px;">
					点击发布
				</el-button>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				addForm: {
					goods_classify:'',
					goods_name: '',
					goods_time: '',
					goods_weight: '',
					goods_number: '',
					goods_cat: '',
					pics: [],
					goods_introduce: '',
					attrs: []
				},
			}
		}
	}
</script>

<style lang="less" scoped>
	.addFrom-input {
		width: 500px;
	}
</style>
