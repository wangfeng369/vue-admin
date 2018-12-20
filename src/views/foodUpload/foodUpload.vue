<style>
	.ivu-select-dropdown-list{
		max-height: 200px;
	}
	.ivu-auto-complete.ivu-select-dropdown{
		max-height: 200px !important;
	}
</style>

<template>
	<div>

		<Row>
			<Col span="12">
			<Card>
				<Form :label-width="100" ref="formInline" :rules="ruleInline" :model="formInline">
					<FormItem label="商品一级分类" prop="typeName">
						<AutoComplete v-model="formInline.typeName" :filter-method="filterMethod1" placeholder="input here" style="width:200px"
						 :disabled="isAdd">
							<div class="demo-auto-complete-item">
								<Option v-for="option in options1" :value="option.name" :key="option.id">
								</Option>
							</div>
						</AutoComplete>
					</FormItem>
					<FormItem label="商品二级分类" prop="productsName">
						<AutoComplete v-model="formInline.productsName" :filter-method="filterMethod2" placeholder="input here" style="width:200px"
						 :disabled="isAdd">
							<div class="demo-auto-complete-item">
								<Option v-for="option in options2" :value="option.productName" :key="option.id">
								</Option>
							</div>
						</AutoComplete>
					</FormItem>
					<FormItem label="商品三级分类" prop="categoryName">
						<AutoComplete v-model="formInline.categoryName" :filter-method="filterMethod3" placeholder="input here" style="width:200px"
						 :disabled="isAdd">
							<div class="demo-auto-complete-item">
								<Option v-for="option in options3" :value="option.name" :key="option.id">
								</Option>
							</div>
						</AutoComplete>
					</FormItem>
					<FormItem label="商品名称" prop="foodName">
						<Input v-model="formInline.foodName" icon="android-list" />
					</FormItem>
					<FormItem label="英文名称" prop="foodEnName">
						<Input v-model="formInline.foodEnName" icon="android-list" />
					</FormItem>
					<FormItem label="价格" prop="price">
						<Input v-model="formInline.price" icon="android-list" />
					</FormItem>
					<FormItem label="条形码" prop="foodCode">
						<Input v-model="formInline.foodCode" icon="android-list" />
					</FormItem>
					<FormItem label="规格" prop="foodSize">
						<Input v-model="formInline.foodSize" icon="android-list" />
					</FormItem>
					<FormItem label="保质期" prop="deadLine">
						<Input v-model="formInline.deadLine" icon="android-list" />
					</FormItem>
					<FormItem label="产地" prop="palce">
						<Input v-model="formInline.palce" icon="android-list" />
					</FormItem>
					<FormItem label="商品描述" prop="detail">
						<Input v-model="formInline.detail" type="textarea" icon="android-list" />
					</FormItem>
				</Form>

			</Card>
			</Col>
			<Col span="12">
			<imageCroper @getPic="getPic" @getOldPic="getOldPic" :changePic='pic'></imageCroper>
			</Col>
			<Col span="24">
			<Button type="primary" :loading="loading" @click="uploadDetail('formInline')" style="margin:20px auto;display: inherit;width:100px;">
				<span v-if="!loading">提交</span>
				<span v-else>Loading...</span>
			</Button>
			</Col>

		</Row>
	</div>
</template>

<script>
	import imageCroper from '../foodUpload/imageUpload.vue'
	export default {
		name: "artical-publish",
		data() {
			return {
				formInline: {
					foodName: "",
					price: '',
					detail: '',
					articleError: "",
					foodCode: "",
					foodEnName: '',
					foodSize: "",
					deadLine: "",
					palce: "",
					typeName: '',
					productsName: '',
					categoryName: '',
				},
				loading: false,
				options1: [],
				options2: [],
				options3: [],
				loading1: false,
				loading2: false,
				loading3: false,
				pic: {},
				list1: [],
				list2: [],
				list3: [],
				isAdd: false,
				ruleInline: {
					foodName: [{
						required: true,
						message: '请填写商品名称',
						trigger: 'blur'
					}],
					foodEnName: [{
						required: true,
						message: '请填写英文商品名称.',
						trigger: 'blur'
					}, ],
					typeName: [{
						required: true,
						message: '请填写一级分类',
						trigger: 'blur'
					}],
					productsName: [{
						required: true,
						message: '请填写二级分类',
						trigger: 'blur'
					}],
					categoryName: [{
						required: true,
						message: '请填写三级分类',
						trigger: 'blur'
					}],
					price: [{
						required: true,
						message: '请填写价格',
						trigger: 'blur'
					}],
					foodCode: [{
						required: true,
						message: '请填写条形码',
						trigger: 'blur'
					}],
					foodSize: [{
						required: true,
						message: '请填写规格',
						trigger: 'blur'
					}],
					deadLine: [{
						required: true,
						message: '请填写保质期',
						trigger: 'blur'
					}],
					palce: [{
						required: true,
						message: '请填写产地',
						trigger: 'blur'
					}],
					detail: [{
						required: true,
						message: '请填写商品描述',
						trigger: 'blur'
					}],

				}
			};
		},

		components: {
			imageCroper: imageCroper
		},
		methods: {

			toLoading() {

			},
			filterMethod1(value, option) {
				return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
			},
			filterMethod2(value2, option2) {
				return option2.toUpperCase().indexOf(value2.toUpperCase()) !== -1;
			},
			filterMethod3(value3, option3) {
				return option3.toUpperCase().indexOf(value3.toUpperCase()) !== -1;
			},
			getPic: function (data) {
				let _this = this
				_this.pic = data
				console.log('~~~~' + data)
				console.log(_this.pic)
			},
			getOldPic: function (data) {
				let _this = this
				_this.pic = data
				console.log(_this.pic)
			},
			uploadDetail: function (name) {
				let _this = this
				this.$refs[name].validate((valid) => {
					if (valid) {
						_this.loading = true;
						let detailId = _this.$route.params.id
						if (detailId == undefined) {
							detailId = ''
						}
						let foodName = _this.formInline.foodName
						let foodCode = _this.formInline.foodCode
						let foodEnName = _this.formInline.foodEnName
						let foodSize = _this.formInline.foodSize
						let deadLine = _this.formInline.deadLine
						let palce = _this.formInline.palce
						let pic = _this.pic
						let price = _this.formInline.price
						let detail = _this.formInline.detail
						let categoryName = _this.formInline.categoryName
						let productsName = _this.formInline.productsName
						let typeName = _this.formInline.typeName
						let formData = new FormData();
						for (let i = 0; i < _this.pic.length; i++) {
							formData.append('files', _this.pic[i])
						}
						formData.append('id', detailId)
						formData.append('foodName', foodName)
						formData.append('foodCode', foodCode)
						formData.append('foodEnName', foodEnName)
						formData.append('foodSize', foodSize)
						formData.append('deadLine', deadLine)
						formData.append('categoryName', categoryName)
						formData.append('productsName', productsName)
						formData.append('typeName', typeName)
						formData.append('palce', palce)
						formData.append('price', price)
						formData.append('detail', detail)
						formData.forEach(function (item) {
							console.log(item)
						})

						_this.$axios.post(_this.apiUrl + '/article/uploadDetail', formData, {
								headers: {
									'Content-Type': 'multipart/form-data'
								}
							})
							.then(function (response) {
								if (response.data.success != 0) {
									_this.loading = false;
									_this.$Message.success({
										content: response.data.info,
										duration: 1
									})
									return;
								}
								_this.loading = false;
								_this.$Message.success({
									content: response.data.info,
									duration: 1
								})

							})
							.catch(function (error) {});
					} else {
						this.$Message.error('未填满');
					}
				})

			},
			onload: function () {
				let _this = this
				_this.$axios.post(_this.apiUrl + '/article/getList', {}, {
						'Content-Type': 'application/json'
					})
					.then(function (response) {
						console.log(response.data.data.listTwo)
						if (response.data.sucess != 0) {
							return;
						}
						for (let i = 0; i < response.data.data.listOne.length; i++) {
							_this.options1.push(response.data.data.listOne[i])
						}
						for (let j = 0; j < response.data.data.listTwo.length; j++) {
							_this.options2.push(response.data.data.listTwo[j])
						}

						for (let k = 0; k < response.data.data.listThree.length; k++) {
							_this.options3.push(response.data.data.listThree[k])
						}

					})
					.catch(function (error) {});
			},
			loadChangData: function () {
				let _this = this
				_this.$axios.post(_this.apiUrl + '/article/getTableList', {
						id: _this.$route.params.id
					}, {
						'Content-Type': 'application/json'
					}).then(function (response) {
						let detailList = response.data.result
						if (_this.$route.params.id == undefined || _this.$route.params.id == null || _this.$route.params.id == '') {} else {
							for (let q = 0; q < detailList.length; q++) {
								if (_this.$route.params.id == detailList[q].id) {
									_this.formInline.foodName = detailList[q].name
									_this.formInline.foodCode = detailList[q].code
									_this.formInline.foodEnName = detailList[q].englishName
									_this.formInline.foodSize = detailList[q].size
									_this.formInline.deadLine = detailList[q].deadline
									_this.formInline.palce = detailList[q].place
									_this.formInline.pic = detailList[q].pic
									_this.formInline.price = detailList[q].price
									_this.formInline.detail = detailList[q].detail
									_this.formInline.categoryName = detailList[q].categoryName
									_this.formInline.productsName = detailList[q].productsName
									_this.formInline.typeName = detailList[q].typeName
								}
							}

						}
					})
					.catch(function (error) {});

			}
		},

		computed: {},
		mounted() {
			if (this.$route.params.id == undefined || this.$route.params.id == null || this.$route.params.id == '') {
				this.isAdd = false
			} else {
				this.isAdd = true

			}
			this.onload();
			this.loadChangData();
		},
		create() {

		},
		beforeCreate() {


		},
		destroyed() {}
	};
</script>