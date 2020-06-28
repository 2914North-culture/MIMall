<template>
    <div class="mil-logo">
        <router-link to="/" class="logo-a"></router-link>
    </div>
</template>

<script>
export default {
    name: 'mil-logo',
}
</script>

<style scoped lang="less">
@import '../../common/less/config.less';
.mil-logo{
    width: 55px;
    height: 55px;
    background-color: @colorA;
    overflow: hidden;
    .logo-a{
        display: block;
        width: 200%;
        height: 100%;
        transition: margin 0.2s;
        &:before{
            content: ' ';
            display: inline-block;
            width: 50%;
            height: 100%;
            background: url(../../../public/imgs/mi-logo.png) no-repeat center;
        }
        &:after{
            content: ' ';
            display: inline-block;
            width: 50%;
            height: 100%;
            background: url(../../../public/imgs/mi-home.png) no-repeat center;
        }
        &:hover{
            margin-left: -100%;
        }
    }
}
</style>