<style lang="scss" scoped>
    
</style>

<template>
    <div class="page-wrap">
        <div class="page-content">
            the wall
        </div>
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'
    import 'tracking'

    export default{
        components:{
        },
        data(){
            return {
            }
        },
        computed:{
            ...mapState({
            }),
        },
        mounted(){
            console.log(tracking)
        },
        methods:{
            
        }
    }
</script>

