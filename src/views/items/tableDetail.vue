<style>
	.ivu-select-dropdown-list{
		max-height: 200px;
	}
	.ivu-auto-complete.ivu-select-dropdown{
		max-height: 200px !important;
	}
    .page{
        margin-top: 30px;
        display: flex;
        justify-content: flex-end;
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
                <Page :class-name='pageClass' :total="total" :page-size='pageSize' :current='currentPage' show-sizer  show-elevator show-total @on-change="changepage" @on-page-size-change="changepageSize"/>
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
                total:0,
                page:0,
                pageClass:'page',
                pageSize:10,
                currentPage:1,
                columns:[ 
                    {
                        title: '序号',
                        type: 'index2',
                        width: 60,
                        render: (h, params) => {
                            console.log('1213'+params)
                            return h('span', params.index + (this.currentPage - 1) * this.pageSize + 1);
                        }
                    },
                    {
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
            changepage:function(page){
                console.log(page)
                this.currentPage = page
                console.log(this.pageSize)
                this.loadData()
            },
            changepageSize:function(pageSize){
                console.log(pageSize)
                this.pageSize = pageSize
                this.loadData();
            },
            loadData:function(){
                let _this = this
              _this.$axios.post(_this.apiUrl + '/article/getTableList', {
                  pageSize: this.pageSize,
                  currentPage: this.currentPage
              }, {
						'Content-Type': 'application/json'
					})
					.then(function (response) {
						if (response.data.success != 0) {
                            _this.$Message.error('发生异常')
							return;
                        }
                        _this.items = []
                        let result = response.data.result
                        result.forEach(items=>{
                            _this.items.push(items)
                        })
                        _this.total = response.data.count
                        _this.page = Math.ceil(_this.total / _this.pageSize)
                        console.log(_this.page)
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
                    _this.items.forEach(function(items,index) {
                        if(items.id == _this.detailId){
                            _this.items.splice(index,1)
                        }
                    });
                    _this.$Message.success({
                        content:response.data.info,
                        duration:1
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