<style lang="less">

</style>

<template>
	<div>
		<Row>
			<Col span="12">
			<Card>
				<Form :label-width="100">
					<FormItem label="商品分类">
						<Cascader :data="foodFilter" v-model="foodFilterModel"></Cascader>
					</FormItem>
					<FormItem label="商品名称">
						<Input v-model="articleTitle" @on-blur="handleArticletitleBlur" icon="android-list" />
					</FormItem>
					<FormItem label="条形码">
						<Input v-model="tiaoxingma" @on-blur="tiaoxingmaBlur" icon="android-list" />
					</FormItem>
					<FormItem label="规格">
						<Input v-model="guige" @on-blur="guigeBlur" icon="android-list" />
					</FormItem>
					<FormItem label="保质期">
						<Input v-model="baozhiqi" @on-blur="baozhiqiBlur" icon="android-list" />
					</FormItem>
					<FormItem label="产地">
						<Input v-model="changdi" @on-blur="changdiBlur" icon="android-list" />
					</FormItem>
				</Form>
			</Card>
		
			</Col>
			<Col span="12" >
				<imageCroper></imageCroper>
            </Col>
				<Button type="primary" :loading="loading" @click="toLoading" style="margin:20px auto;display: inherit;width:100px;">
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
				articleTitle: "",
				articleError: "",
				tiaoxingma: "",
				guige: "",
				baozhiqi: "",
				changdi: "",
				loading: false,
				foodFilter: [{
					value: "beijing",
					label: "北京",
					children: [{
							value: "gugong",
							label: "故宫"
						},
						{
							value: "tiantan",
							label: "天坛"
						},
						{
							value: "wangfujing",
							label: "王府井"
						}
					]
				}],
				foodFilterModel: [],
				sDisabled: true,
				tDisabled: true,
				foodList: [{
					value: "意大利面",
					label: "意大利面"
				}]
			};
		},
		components:{
			imageCroper:imageCroper
		},
		methods: {
			handleArticletitleBlur() {
				if (this.articleTitle.length !== 0) {} else {
					this.$Message.error("商品名称不可为空哦");
				}
			},
			tiaoxingmaBlur() {
				if (this.articleTitle.length !== 0) {} else {
					this.$Message.error("条形码不可为空哦");
				}
			},
			guigeBlur() {
				if (this.articleTitle.length !== 0) {} else {
					this.$Message.error("规格不可为空哦");
				}
			},
			baozhiqiBlur() {
				if (this.articleTitle.length !== 0) {} else {
					this.$Message.error("保质期不可为空哦");
				}
			},
			changdiBlur() {
				if (this.articleTitle.length !== 0) {} else {
					this.$Message.error("产地不可为空哦");
				}
			},
			toLoading() {
				this.loading = true;
			}
		},
		computed: {},
		mounted() {},
		destroyed() {}
	};
</script>