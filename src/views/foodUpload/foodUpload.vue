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
						<AutoComplete
							v-model="typeName"
							:filter-method="filterMethod1"
							placeholder="input here"
							style="width:200px">
							  <div class="demo-auto-complete-item">
							<Option v-for="option in options1" :value="option.name" :key="option.id" >
							</Option>
							  </div>
						</AutoComplete>
					</FormItem>
					<FormItem label="商品二级分类">
						<AutoComplete
							v-model="productsName"
							:filter-method="filterMethod2"
							placeholder="input here"
							style="width:200px">
							  <div class="demo-auto-complete-item">
							<Option v-for="option in options2" :value="option.productName" :key="option.id">
							</Option>
							  </div>
						</AutoComplete>
					</FormItem>
					<FormItem label="商品三级分类">
						<AutoComplete
							v-model="categoryName"
							:filter-method="filterMethod3"
							placeholder="input here"
							style="width:200px">
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
				</Form>
			</Card>

			</Col>
			<Col span="12">
			<imageCroper 
				@getPic="getPic"
				@getOldPic ="getOldPic"
			></imageCroper>
			</Col>
			<Button type="primary" :loading="loading" @click="uploadDetail" style="margin:20px auto;display: inherit;width:100px;">
				<span v-if="!loading">提交</span>
				<span v-else>Loading...</span>
			</Button>
		</Row>
	</div>
</template>

<script>
	import imageCroper from '../my-components/image-editor/image-editor.vue'
	export default {
		name: "artical-publish",
		data() {
			return {
				foodName: "",
				articleError: "",
				foodCode: "",
				foodEnName:'',
				foodSize: "",
				deadLine: "",
				palce: "",
				loading: false,
				typeName: '',
				productsName: '',
				categoryName: '',
				options1:[],
				options2:[],
				options3:[],
				loading1:false,
				loading2:false,
				loading3:false,
				pic:{},
				list1:[],
				list2:[],
				list3:[]
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
			toLoading() {
				
			},
			filterMethod1(value,option){
 				return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
			},
			filterMethod2(value2,option2){
 				return option2.toUpperCase().indexOf(value2.toUpperCase()) !== -1;
			},
			filterMethod3(value3,option3){
 				return option3.toUpperCase().indexOf(value3.toUpperCase()) !== -1;
			},
			getPic:function(data){
				let _this = this
				_this.pic = data
				console.log(_this.pic)
			},
			getOldPic:function(data){
				let _this = this
				_this.pic = data
				console.log(_this.pic )
			},
			uploadDetail:function(){
			
				let _this = this 
				_this.loading = true;
			    let foodName = _this.foodName
				let foodCode = _this.foodCode
				let foodEnName = _this.foodEnName
				let foodSize = _this.foodSize
				let deadLine = _this.deadLine
				let palce = _this.palce
				let pic = _this.pic
				let categoryName = _this.categoryName
				let productsName = _this.productsName
				let typeName = _this.typeName
				let formData = new FormData();
				formData.append('file',pic)
				formData.append('foodName',foodName)
				formData.append('foodCode',foodCode)
				formData.append('foodEnName',foodEnName)
				formData.append('foodSize',foodSize)
				formData.append('deadLine',deadLine)
				formData.append('categoryName',categoryName)
				formData.append('productsName',productsName)
				formData.append('typeName',typeName)
				formData.append('palce',palce)
				formData.forEach(function(item){
					console.log(item)
				})
				
				_this.$axios.post(_this.apiUrl+'/article/uploadDetail',formData,
					{headers:{'Content-Type':'multipart/form-data'}})
					.then(function (response) {
						if(response.data.sucess !=0){
							_this.loading = false;
							return;
						}
							_this.loading = false;
						console.log(response.data.info)
					
					})
				.catch(function (error) {});
			},
			onload:function(){
				let _this = this
				_this.$axios.post(_this.apiUrl+'/article/getList',
					{}, 
					{'Content-Type': 'application/json'})
					.then(function (response) {
						console.log(response.data.data.listTwo)
						if(response.data.sucess !=0){
							return;
						}
						for(let i =0 ;i<response.data.data.listOne.length;i++){
							_this.options1.push(response.data.data.listOne[i])
						}
						for(let j =0 ;j<response.data.data.listTwo.length;j++){
							_this.options2.push(response.data.data.listTwo[j])
						}
						
						for(let k =0 ;k<response.data.data.listThree.length;k++){
							_this.options3.push(response.data.data.listThree[k])
						}

						
					})
				.catch(function (error) {});
			}
		},
	
		computed: {},
		mounted() {
			this.onload();
		},
		destroyed() {}
	};
</script>