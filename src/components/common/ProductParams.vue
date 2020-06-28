<template>
    <div ref="proParamsBox" class="product-params" :class="{'is-fixed': isFixed}">
        <div class="container">
            <div class="product-main">{{paramsMain}}</div>
            <div class="product-info">
                <a href="javascript:;" class="info-item">概述</a>|
                <a href="javascript:;" class="info-item">参数</a>|
                <a href="javascript:;" class="info-item">用户评价</a>
                <a href="javascript:;" class="buy-now" @click="goPay">{{buyText}}</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'product-params',
    props: {
        paramsMain: {
            type: String,
            default: '小米手机'
        },
        buyText: {
            type: String,
            default: '立即购买'
        }
    },
    data () {
        return {
            isFixed: false
        }
    },
    mounted () {
        window.addEventListener('scroll',this._initPageSctoll);
    },
    methods: {
        _initPageSctoll () {
            let scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            // let top = this.$refs.proParamsBox.offsetTop; // 不会实时监听
            this.isFixed = scrollY > 220 ? true : false;
        },
        goPay () {
            let proId = this.$route.params.id;
            console.log(proId);
            this.axios.post('/carts',{
                productId: proId,
                selected: true
            }).then((res={cartTotalQuantity:0}) => {
                this.$store.dispatch('saveCartProduct',res.cartTotalQuantity);
                this.$router.push(`/detail/${proId}`);
            }).catch(err => {
                this.$message.error(err.message);
            })
            this.isShowModal = false;
        }
    }
}
</script>

<style scoped lang="less">
@import '../../common/less/config.less';
@keyframes aniParams {
    from {
        top: -220px;
    }
    to {
        top: 0;
    }
}
.product-params{
    width: 100%;
    height: 70px;
    border: 1px solid #e5e5e5;
    background-color: #fff;
    &.is-fixed{
        position: fixed;
        z-index: 99;
        top: 0;
        box-shadow: 0 5px 5px rgba(0,0,0,.07);
        animation: aniParams 0.7s;
    }
    .container{
        width: @min-width;
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: @fontJ;
        color: @colorC;
        .product-main{
            font-size: @fontH;
            color: @colorB;
            font-weight: bold;
        }
        .product-info{
            display: flex;
            align-items: center;
            a{
                text-decoration: none;
                color: @colorC;
            }
            .info-item{
                padding: 0 10px;
            }
            .buy-now{
                width: 110px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: @colorA;
                color: #fff;
                cursor: pointer;
                margin-left: 10px;
                transition: .3s;
                &:hover{
                    background-color: #f25807;
                }
            }
        }
    }
}
</style>