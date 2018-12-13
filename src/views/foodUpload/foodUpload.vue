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
				<Form :label-width="100">
					<FormItem label="商品一级分类">
						<AutoComplete v-model="typeName" :filter-method="filterMethod1" placeholder="input here" style="width:200px"
						 :disabled="isAdd">
							<div class="demo-auto-complete-item">
								<Option v-for="option in options1" :value="option.name" :key="option.id">
								</Option>
							</div>
						</AutoComplete>
					</FormItem>
					<FormItem label="商品二级分类">
						<AutoComplete v-model="productsName" :filter-method="filterMethod2" placeholder="input here" style="width:200px"
						 :disabled="isAdd">
							<div class="demo-auto-complete-item">
								<Option v-for="option in options2" :value="option.productName" :key="option.id">
								</Option>
							</div>
						</AutoComplete>
					</FormItem>
					<FormItem label="商品三级分类">
						<AutoComplete v-model="categoryName" :filter-method="filterMethod3" placeholder="input here" style="width:200px"
						 :disabled="isAdd">
							<div class="demo-auto-complete-item">
								<Option v-for="option in options3" :value="option.name" :key="option.id">
								</Option>
							</div>
						</AutoComplete>
					</FormItem>
					<FormItem label="商品名称">
						<Input v-model="foodName" @on-blur="handleArticletitleBlur" icon="android-list" />
					</FormItem>
					<FormItem label="英文名称">
						<Input v-model="foodEnName" icon="android-list" />
					</FormItem>
					<FormItem label="价格">
						<Input v-model="price" @on-blur="priceBlur" icon="android-list" />
					</FormItem>
					<FormItem label="条形码">
						<Input v-model="foodCode" @on-blur="tiaoxingmaBlur" icon="android-list" />
					</FormItem>
					<FormItem label="规格">
						<Input v-model="foodSize" @on-blur="guigeBlur" icon="android-list" />
					</FormItem>
					<FormItem label="保质期">
						<Input v-model="deadLine" @on-blur="baozhiqiBlur" icon="android-list" />
					</FormItem>
					<FormItem label="产地">
						<Input v-model="palce" @on-blur="changdiBlur" icon="android-list" />
					</FormItem>
					<FormItem label="商品描述">
						<Input v-model="detail" type="textarea" @on-blur="detailBlur" icon="android-list" />
					</FormItem>
				</Form>
			</Card>

			</Col>
			<Col span="12">
				<imageCroper @getPic="getPic" @getOldPic="getOldPic" :changePic='pic'></imageCroper>
			</Col>
			<Col span="24">
			<Button type="primary" :loading="loading" @click="uploadDetail" style="margin:20px auto;display: inherit;width:100px;">
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
				foodName: "",
				price: '',
				detail: '',
				articleError: "",
				foodCode: "",
				foodEnName: '',
				foodSize: "",
				deadLine: "",
				palce: "",
				loading: false,
				typeName: '',
				productsName: '',
				categoryName: '',
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
				isAdd: false
			};
		},
		components: {
			imageCroper: imageCroper
		},
		methods: {
			handleArticletitleBlur() {
				if (this.foodName.length !== 0) {} else {
					this.$Message.error("商品名称不可为空哦");
				}
			},
			tiaoxingmaBlur() {
				if (this.foodCode.length !== 0) {} else {
					this.$Message.error("条形码不可为空哦");
				}
			},
			guigeBlur() {
				if (this.foodCode.length !== 0) {} else {
					this.$Message.error("规格不可为空哦");
				}
			},
			baozhiqiBlur() {
				if (this.deadLine.length !== 0) {} else {
					this.$Message.error("保质期不可为空哦");
				}
			},
			changdiBlur() {
				if (this.palce.length !== 0) {} else {
					this.$Message.error("产地不可为空哦");
				}
			},
			priceBlur() {
				if (this.price.length !== 0) {} else {
					this.$Message.error("价格不可为空哦");
				}
			},
			detailBlur() {
				if (this.detail.length !== 0) {} else {
					this.$Message.error("描述不可为空哦");
				}
			},
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
				console.log('~~~~'+data)
				console.log(_this.pic)
			},
			getOldPic: function (data) {
				let _this = this
				_this.pic = data
				console.log(_this.pic)
			},
			uploadDetail: function () {
				let _this = this
				_this.loading = true;
				let detailId = _this.$route.params.id
				if (detailId == undefined) {
					detailId = ''
				}
				let foodName = _this.foodName
				let foodCode = _this.foodCode
				let foodEnName = _this.foodEnName
				let foodSize = _this.foodSize
				let deadLine = _this.deadLine
				let palce = _this.palce
				let pic = _this.pic
				let price = _this.price
				let detail = _this.detail
				let categoryName = _this.categoryName
				let productsName = _this.productsName
				let typeName = _this.typeName
				let formData = new FormData();
				for(let i =0;i <_this.pic.length;i++){
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
									_this.foodName = detailList[q].name
									_this.foodCode = detailList[q].code
									_this.foodEnName = detailList[q].englishName
									_this.foodSize = detailList[q].size
									_this.deadLine = detailList[q].deadline
									_this.palce = detailList[q].place
									_this.pic = detailList[q].pic
									_this.price = detailList[q].price
									_this.detail = detailList[q].detail
									_this.categoryName = detailList[q].categoryName
									_this.productsName = detailList[q].productsName
									_this.typeName = detailList[q].typeName
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
		create(){
			
		},
		beforeCreate() {


		},
		destroyed() {}
	};
</script>