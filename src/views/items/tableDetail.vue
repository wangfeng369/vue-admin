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
			<Col span="24">
			<Card>
                <Button type="primary" @click="uploadDetail" style="margin:20px 0;display: inherit;width:100px;">
				    <span>新增商品</span>
			    </Button>
				<Table border :columns="columns" :data="items"></Table>
                <Modal
                    v-model="modal1"
                    title="删除"
                    @on-ok="delteok"
                    @on-cancel="deletecancel">
                    <p>确定删除该项数据？</p>
                 
                </Modal>
			</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
	export default {
		name: "tableDetail",
		data() {
			return {
                id:"",
                columns:[ {
                        title: '商品一级分类',
                        key: 'typeName',
                    },
                    {
                        title: '商品二级分类',
                        key: 'productsName'
                    },
                    {
                        title: '商品三级分类',
                        key: 'categoryName'
                    },
                    {
                        title: '商品名称',
                        key: 'name'
                    },
                    {
                        title: '英文名称',
                        key: 'englishName'
                    },
                    {
                        title: '价格',
                        key: 'price'
                    },
                    {
                        title: '条形码',
                        key: 'code'
                    },
                    {
                        title: '规格',
                        key: 'size'
                    },
                    {
                        title: '产地',
                        key: 'place'
                    },
                    {
                        title: '保质期',
                        key: 'deadline'
                    },
                    {
                        title: '商品描述',
                        key: 'detail'
                    },
                    {
                        title: '修改',
                        key: 'id',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                              this.$router.push({
                                                    name: 'change_detail',
                                                      params:{
                                                        id:params.row.id
                                                      }
                                            });
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.modal1 = true
                                            this.detailId = params.row.id
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }],
                items:[],
                modal1:false,
                detailId:''
			};
		},
		components: {
		},
		methods: {
            loadData:function(){
                let _this = this
              _this.$axios.post(_this.apiUrl + '/article/getTableList', {}, {
						'Content-Type': 'application/json'
					})
					.then(function (response) {
						if (response.data.success != 0) {
                            _this.$Message.error('发生异常')
							return;
                        }
                    _this.items = response.data.result
					})
					.catch(function (error) {

                    });
            },
            uploadDetail:function(){
                      this.$router.push({name: 'upload_index'});
            },
            delteok:function(){
                let _this = this
                _this.$axios.post(_this.apiUrl + '/article/deleteDetail', {
                    id : _this.detailId
                }, {
                    'Content-Type': 'application/json'
                })
                .then(function (response) {
                    if (response.data.success != 0) {
                        _this.$Message.error('发生异常')
                        return;
                    }
                    _this.$Message.success({
                        content:response.data.info,
                        duration:2000
					})
                })
                .catch(function (error) {});
            },
            deletecancel:function(){

            }
		},

		computed: {},
		mounted() {
            this.loadData();
		},
		destroyed() {}
	};
</script>