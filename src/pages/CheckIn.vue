<style lang="scss" scoped>
    
</style>

<template>
    <div class="page-wrap">
        <div class="page-content">
            checkin
        </div>
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'

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
            this.$store.dispatch('batchFetch')
        },
        methods:{
        }
    }
</script>

