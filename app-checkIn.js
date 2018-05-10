import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { routerConfig } from './router-config'
import Rx from 'rxjs/Rx';
import VueRx from 'vue-rx'
import store from './src/store/store.js'
import App from './app-checkIn.vue'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueRx, Rx)

var router;
routerConfig(router, store, 'checkIn').then((router) => {

    new Vue({
        el: '#app',
        components:{
            App
        },
        store,
        router
    });

})

