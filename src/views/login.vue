<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
 import crypto from 'crypto';
export default {
    data () {
        return {
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                //     Cookies.set('user', this.form.userName);
                //     Cookies.set('password', this.form.password);
                //     this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                //     if (this.form.userName === 'iview_admin') {
                //         Cookies.set('access', 0);
                //     } else {
                //         Cookies.set('access', 1);
                //     }
                //     this.$router.push({
                //         name: 'home_index'
                //     });
                    let _this = this
                    let userName = _this.form.userName
                    let  md5 = crypto.createHash("md5");
                    md5.update(_this.form.password) //需要加密的密码
                    let password = md5.digest('hex');  //password 加密完的密码
                    console.log(password);
                    _this.$axios.post(_this.apiUrl+'/user/login',
                        {userName:userName,password:password}, 
                        {'Content-Type': 'application/json'})
                        .then(function (response) {
                            if(!response.data.sucess){
                                _this.$Message.error(response.data.info)
                                return;
                            }
                            sessionStorage.setItem('token',response.data.token);
                            sessionStorage.setItem('username',response.data.name)
                             _this.$Message.success('登录成功')
                            _this.$router.push({
                                 name: 'home_index'
                        });
                        
                        })
                    .catch(function (error) {});
                }
             
            });
            
        }
    }
};
</script>

<style>

</style>
