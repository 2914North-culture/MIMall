<template>
    <div class="loading">
        <img src="/imgs/loading-svg/loading-bars.svg" alt="努力加载中..."/>
    </div>
</template>

<script>
export default {
    name: 'Loading',
    data () {
        return {

        }
    }
}
</script>

<style scoped lang="less">
.loading{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 98px 0;
    img{
        width: 120px;
    }
}
</style>
