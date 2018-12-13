import Vue from 'vue';
import iView from 'iview';
import {
    router
} from './router/index';
import {
    appRouter
} from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from '@/libs/util';
import axios from 'axios'
Vue.use(VueI18n);
Vue.use(iView);
Vue.prototype.$axios = axios;
Vue.prototype.imgUrl = 'http://120.79.213.80:1000/images/'
const debug = true
Vue.prototype.apiUrl = debug ? 'http://localhost:8888' : 'http://120.79.213.80:8888';


//添加请求拦截器
axios.interceptors.request.use(
    config => {
        //在发送请求之前做某事
        let token = sessionStorage.getItem('token');
        if (token) {
            config.headers.token = token
        }

        return config;
    },
    function (error) {
        //请求错误时做些事
        return Promise.reject(error);
    });

axios.interceptors.response.use(
    response => { /*在这里可以设置请求成功的一些设置*/
        console.log(response.data)
        if (response.data.code == 1001) {
            Vue.prototype.$Message.warning('登录信息过期，请重新登录');
            router.replace({
                path: '/login'
            })
        }
        return response;
    },
    error => { /*在这里设置token过期的跳转*/
        if (error.response) {
            if (!error.response.data.success) {
                Vue.prototype.$Message.warning('登录信息过期，请重新登录');
                router.replace({
                    path: '/login'
                })
            }
        }
    });



new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted() {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
        // iview-admin检查更新
        util.checkUpdate(this);
    },
    created() {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});