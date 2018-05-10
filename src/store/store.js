import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment';
import { fetchUserinfo, fetchSystemMenu, getAccessToken, validateAccessToken, getWechatUserinfo } from '../js/api'
import { getQueryString } from '../js/util'

import { 
    Message
} from 'element-ui'
import page1Store from './page1Store'
//{importStore}//

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        userinfo:{},
        permission:true,
        menuData:[],
        currentPage: '/'
    },
    getters: {
        mapData(state) {
            if(state.switchValue == '1'){
                //中小件
                return state.mapDataBase[1];
            } else {
                //全部|大件
                return state.mapDataBase[0];
            }
        }
    },
    mutations:{
        setUserinfo(state, data){
            state.userinfo = data
        },
        setUserPermission(state, value){
            state.permission = value
        },
        setSystemMenu(state, data){
            state.menuData = data
        },
        setCurrentPage(state, value){
            state.currentPage = value
        }
    },
    actions:{
        /**
         * 获取用户信息
         * 
         * @param {any} {commit} 
         */
        getUserinfo({commit}){
            fetchUserinfo()
                .subscribe(result => {
                    if(result.success){
                        commit('setUserinfo', result.data);
                    }
                });
        },
        /**
         * 获取系统菜单
         * @param {*} param0 
         */
        getSystemMenu({commit}){
            fetchSystemMenu()
                .subscribe(result => {
                    if(result.success){
                        commit('setSystemMenu', result.data);
                    }
                });
        },
        /**
         * 获取用户权限
         * 
         * @param {any} {commit, state} 
         * @param {any} permissionObj 从外部设置permission对象
         */
        getUserPermission({commit, state}, permissionObj){
            if(!state.permission.requested){
                if(!permissionObj){
                    fetchUserPermission()
                        .subscribe(data => {
                            if(data.status == 1){
                                commit('setUserPermission', { permission: {
                                    requested: true,
                                    valid: data.obj
                                } })
                            }else{
                                commit('setUserPermission', { permission: {
                                    requested: true,
                                    valid: false
                                } })
                            }
                        });
                }else{
                    commit('setUserPermission', permissionObj);
                }
            }
        },
        setUserPermission({commit}, value){
            commit('setUserPermission', value)
        },
        setCurrentPage({commit}, value){
            commit('setCurrentPage', value)
        },
        async batchFetch(){
            const code = getQueryString('code')
            alert(code)
            const result = await getAccessToken({
                appid: 'wxea81161da9af8167',
                secret: '4c64e5d683908d81b645e62f36b398cb',
                code: code,
                grant_type: 'authorization_code'
            })
            alert(JSON.stringify(result))

            const resultValidate = await validateAccessToken({
                access_token: result.access_token,
                openid: result.openid
            })
            alert(JSON.stringify(resultValidate))

            const userInfo = await getWechatUserinfo({
                access_token: result.access_token,
                openid: result.openid,
                lang: 'zh_CN'
            })
            alert(JSON.stringify(userInfo))

        }
    },
    modules:{
        page1: page1Store,
        //{importModule}// 
    }
})

export default store