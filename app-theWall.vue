<style lang="scss">
    @import './src/css/common.scss';

    @media only screen and (-webkit-min-device-pixel-ratio: 2){html{-webkit-text-size-adjust:none}}
    body,div,p,h1,h2,h3,h4,h5,h6,blockquote,dl,dt,dd,ul,ol,li,pre,form,fieldset,legend,button,input,textarea,table,th,td{margin:0;padding:0;}address,cite,em,i{font-style:normal;}li{list-style:none;}a{text-decoration:none;}a:hover{text-decoration:underline;}legend{color:#000;}fieldset,img{border:0;}table{border-collapse:collapse;border-spacing:0;}
    html, body{height: 100%;}
    body {
        color:#333; background: #f1f1f1;
        -webkit-appearance: none;
        font-family:"Microsoft YaHei","微软雅黑",tahoma,Helvetica,arial,sans-serif,simsun,"宋体";
        font-size:1rem;
    }
    .layout-box { display: -webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex; }

    .slide-fade-enter-active {
        transition: all 1s ease .5s;
    }
    .slide-fade-leave-active {
        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(30px);
        opacity: 0;
    }

    /* layout */
    .site-wrap{height: 100%;}
    .page-wrap{
        .page-content{margin:20px;background: #fff; padding:20px;}
    }

</style>

<template>
    <div class="site-wrap">
        <transition name="slide-fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapState, mapGetters } from 'vuex'
    import Rx from 'rxjs/Rx'

    export default {
        data() {
            return {
                
            }
        },
        computed:{
        },
        components:{
        },
        methods:{
            
        },
        created (){

        },
        mounted (){
            
        }
     };
</script>
