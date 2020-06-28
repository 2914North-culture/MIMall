<template>
    <div class="nav-footer">
        <div class="footer-logo">
            <img src="../../../public/imgs/logo-footer.png" alt="商家logo"/>
            <p class="logo-name">小米商城</p>
        </div>
        <div class="footer-msg">
            <a href="javascript:;">小米商城</a>
            <span class="divide">|</span>
            <a href="javascript:;">MIUI</a>
            <span class="divide">|</span>
            <a href="javascript:;">小米商城用户协议</a>
            <span class="divide">|</span>
            <a href="javascript:;">Select Location</a>
        </div>
        <div class="footer-link">
            Copyright ©2019 
            <a href="/#/">mi.com/static/intellectual</a>
            All Rights Reserved.
        </div>
    </div>
</template>

<script>
export default {
    name: "nav-footer",
    data () {
        return {
            
        }
    }
}
</script>

<style scoped lang="less">
@import '../../common/less/config.less';
.nav-footer{
    width: 100%;
    height: 234px;
    color: @colorD;
    background-color: @colorB;
    border-top: 4px solid @colorA;
    .footer-logo{
        margin: 46px 0 31px;
        display: flex;
        align-content: center;
        justify-content: center;
        flex-wrap: wrap;
        img{
            width: 53px;
            height: 36px;
            margin-bottom: 13px;
        }
        .logo-name{
            display: block;
            width: 100%;
            text-align: center;
        }
    }
    .footer-msg{
        text-align: center;
        margin-bottom: 13px;
        a{
            text-decoration: none;
            color: @colorD;
        }
        .divide{
            margin: 0 10px;
        }
    }
    .footer-link{
        text-align: center;
        a{
            text-decoration: none;
            color: @colorA;
        }
    }
}
</style>
