<template>
    <div>
        <Col span="24">
        <Card>
            <p slot="title">
                <Icon type="qr-scanner"></Icon>
                上传图片
            </p>
            <Row :gutter="12">
                <div class="demo-upload-list" v-for="(item,index) in defaultList">
                    <template v-if="item">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
                        </div>
                    </template>

                </div>
                <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess"
                    :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" action=""
                    style="display: inline-block;width:58px;">
                    <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="ios-camera" size="20"></Icon>
                    </div>
                </Upload>
                <Modal title="View Image" v-model="visible">
                    <img :src="imgName" v-if="visible" style="width: 100%">
                </Modal>
            </Row>
        </Card>
        </Col>

    </div>

</template>
<script>
    export default {
        props:['changePic'],
        data() {
            return {
                defaultList: [],
                imgName: '',
                visible: false,
                uploadList: [],
                url:''
            }
        },
        methods: {
            handleView(name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove(index) {
                this.uploadList.splice(index,1);
                this.defaultList.splice(index,1)
                console.log(this.uploadList)
            },
            handleSuccess(res, file) {

            },
            handleFormatError(file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload(file) {
            
                this.$refs.upload.clearFiles()
                const isImage = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png'
                
                const is5m= file.size /1024 /1024 <5
                if (!isImage) {
                    this.$Notice.warning({
                        title: 'The file format is incorrect',
                        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                    });
                    return false;
                }
                if(isImage && !is5m){
                      this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 5M.'
                });
              
                }
                // 创建一个 FileReader 对象
                let reader = new FileReader()
                // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
                // 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
                // 读取文件作为 URL 可访问地址
                reader.readAsDataURL(file)
                const _this = this
                reader.onloadend = function (e) {
                    file.url = reader.result
                    _this.uploadList.push(file)
                    _this.$emit('getPic',_this.uploadList)
                    _this.defaultList.push(file)
                }   
              
                return false;
            },
        },
        watch:{
            changePic(val){
                let _this = this
                console.log('~~~~'+val)
                _this.$nextTick(function(){
                    let spiltVal = val.split(',')
                       console.log(spiltVal)
                    for(let i=0;i<spiltVal.length;i++){
                        let obj = {}
                        obj.url = _this.imgUrl+spiltVal[i]
                        _this.defaultList.push(obj)
                        console.log(_this.defaultList)
                    }
                  
                })
            }
        },
        mounted() {}
    }
</script>
<style>
    .demo-upload-list {
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        margin-right: 4px;
    }

    .demo-upload-list img {
        width: 100%;
        height: 100%;
    }

    .demo-upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6);
    }

    .demo-upload-list:hover .demo-upload-list-cover {
        display: block;
    }

    .demo-upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>