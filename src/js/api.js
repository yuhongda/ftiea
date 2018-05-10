import Rx from 'rxjs/Rx'
import fetchJsonp from 'fetch-jsonp';
import { objectToQueryString } from './util'

const host = __ENV == 'pro' ? '' : 'http://localhost:3008';

/**
 * 获取userinfo
 */
export function fetchUserinfo() {
    return Rx.Observable.fromPromise($.ajax({
        url: `${host}/api/getUserinfo`,
        dataType: 'json',
        type: 'get',
        cache: false
    }).promise()).toPromise()
}

/**
 * 获取系统菜单
 */
export function fetchSystemMenu() {
    return Rx.Observable.fromPromise($.ajax({
        url: `${host}/api/getSystemMenu`,
        dataType: 'json',
        type: 'get',
        cache: false
    }).promise())
}

/**
 * 登录
 */
export function signIn(params) {
    return Rx.Observable.fromPromise($.ajax({
        url: `${host}/api/signin`,
        data: params,
        dataType: 'json',
        type: 'post',
        cache: false
    }).promise())
}

/**
 * 获取部门
 */
export function fetchDept() {
    return Rx.Observable.fromPromise($.ajax({
        url: `${host}/api/getDept`,
        data: {},
        dataType: 'json',
        type: 'post',
        cache: false
    }).promise())
}

/**
 * 获取Page1数据
 */
export function fetchPage1Data(params) {
    return Rx.Observable.fromPromise($.ajax({
        url: `${host}/api/fetchPage1Data`,
        data: params || {},
        dataType: 'json',
        type: 'post',
        cache: false
    }).promise())
}

/**
 * 获取Page2数据
 */
export function fetchPage2Data(params) {
    return Rx.Observable.fromPromise($.ajax({
        url: `${host}/api/fetchPage2Data`,
        data: params || {},
        dataType: 'json',
        type: 'post',
        cache: false
    }).promise())
}


/**
 * 微信授权
 */
export function getAccessToken(params) {
    // return Rx.Observable.fromPromise($.ajax({
    //     url: `https://api.weixin.qq.com/sns/oauth2/access_token`,
    //     data: params || {},
    //     dataType: 'jsonp',
    //     type: 'get',
    //     cache: false
    // }).promise()).toPromise()
    return new Promise((resolve, reject) => {
        fetchJsonp(`https://api.weixin.qq.com/sns/oauth2/access_token?${objectToQueryString(params)}`, {
            jsonpCallback: 'callback'
        }).then(response => {
            return resolve(response.json());
        })
    })
}
export function validateAccessToken(params) {
    return new Promise((resolve, reject) => {
        fetchJsonp(`https://api.weixin.qq.com/sns/auth?${objectToQueryString(params)}`, {
            jsonpCallback: 'callback'
        }).then(response => {
            return resolve(response.json());
        })
    })
}
export function getWechatUserinfo(params) {
    return Rx.Observable.fromPromise($.ajax({
        url: `https://api.weixin.qq.com/sns/userinfo`,
        data: params || {},
        dataType: 'jsonp',
        type: 'get',
        cache: false
    }).promise()).toPromise()
}
