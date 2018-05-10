<style lang="scss" scoped>
    
</style>

<template>
    <div class="page-wrap">
        <div class="page-content">
            <h1>#{PageName}#</h1>
            <div>{{#{pageName}#.value1}}</div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default{
        components:{
            chart: ECharts
        },
        data(){
            return {
                isAnim: false
            }
        },
        computed:{
            ...mapState({
                #{pageName}#: state => state.#{pageName}#
            })
        },
        mounted(){
            this.isAnim = true;
        },
        methods:{
            
        }
    }
</script>

