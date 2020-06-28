<template>
    <div class="nav-header">
        <div class="site-topbar">
            <div class="container">
                <ul class="header-menu header-list">
                    <li class="menu-item header-item" v-for="(item,index) of menuItem" :key="index">
                        <a class="menu-item-a header-a nav-header-item" href="javascript:void(0);">{{item}}</a>
                    </li>
                </ul>
                <ul class="header-user header-list">
                    <li class="user-user user-item header-item" v-if="saveUsername">
                        <a class="login-a header-a nav-header-item" href="javascript:void(0);">{{saveUsername}}</a>
                    </li>
                    <li class="user-login user-item header-item" v-if="!saveUsername">
                        <a class="login-a header-a nav-header-item" href="/#/userdeel/login">登录</a>
                    </li>
                    <li class="user-reg user-item header-item" v-if="!saveUsername">
                        <a class="login-a header-a nav-header-item" href="/#/userdeel/register">注册</a>
                    </li>
                    <li class="user-logout user-item header-item" v-if="saveUsername" @click="logout">
                        <a class="login-a header-a nav-header-item" href="javascript:void(0);">退出</a>
                    </li>
                    <li class="user-order user-item header-item">
                        <a class="login-a header-a nav-header-item" href="/#/order">我的订单</a>
                    </li>
                    <li class="user-shopcart user-item header-item" @click="getCart">
                        <a class="shopcart-a header-a" href="javascript:void(0);">
                            <span class="iconfont icon-gouwuche shopcart-icon"></span>
                            购物车{{saveCartProduct}}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="site-header">
            <div class="container">
                <mil-logo></mil-logo>
                <ul class="header-product">
                    <li class="header-product-item">
                        <span>小米手机</span>
                        <ul class="product-children">
                            <li class="children-item" v-for="(item,index) of milPhone" :key="index">
                                <a :href="'/#/detail/' + item.id">
                                    <img v-lazy="item.mainImage" alt="产品图片"/>
                                    <div class="pro-name pro-msg">{{item.name}}</div>
                                    <div class="pro-price pro-msg">{{item.price | currency}}</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="header-product-item">
                        <span>RedMi红米</span>
                    </li>
                    <li class="header-product-item">
                        <span>电视</span>
                        <ul class="product-children">
                            <li class="children-item" v-for="(item,index) of TV" :key="index">
                                <a :href="'/#/product/' + item.id">
                                    <img v-lazy="item.imgUrl" alt="产品图片"/>
                                    <div class="pro-name pro-msg">{{item.name}}</div>
                                    <div class="pro-price pro-msg">{{item.price | currency}}</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div class="header-search">
                    <input class="header-search-text" type="text" placeholder="手机" >
                    <router-link to="/" class="iconfont icon-sousuo header-search-find"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MilLogo from './MilLogo';
export default {
    name: "nav-header",
    components: {
        MilLogo
    },
    data () {
        return {
            menuItem: [
                '小米商城',
                'MUI',
                '云服务',
                '协议规则'
            ],
            // username: '',
            // shopNum: 0,
            milPhone: [],
            TV: [
                {
                    id: '01',
                    imgUrl: require('../../../public/imgs/nav-img/nav-3-1.jpg'),
                    name: '小米壁画电视 65英寸',
                    price: '6999'
                },
                {
                    id: '02',
                    imgUrl: require('../../../public/imgs/nav-img/nav-3-2.jpg'),
                    name: '小米全面屏电视E55A',
                    price: '1999'
                },
                {
                    id: '03',
                    imgUrl: require('../../../public/imgs/nav-img/nav-3-3.png'),
                    name: '小米壁画电视 65英寸',
                    price: 699
                },
                {
                    id: '04',
                    imgUrl: require('../../../public/imgs/nav-img/nav-3-4.jpg'),
                    name: '小米电视4A 32英寸',
                    price: ''
                },
                {
                    id: '05',
                    imgUrl: require('../../../public/imgs/nav-img/nav-3-5.jpg'),
                    name: '小米电视4A 55英寸',
                    price: 2699
                },
                {
                    id: '06',
                    imgUrl: require('../../../public/imgs/nav-img/nav-3-6.png'),
                    name: '小米电视4A 65英寸',
                    price: '全部'
                }
            ]
        }
    },
    computed: {
        saveUsername () {
            return this.$store.state.username;
        },
        saveCartProduct () {
            return this.$store.state.cartCount;
        }
    },
    filters: {
        currency (val) {
            let toNum = Number(val);
            if(!isNaN(toNum)){
                if(!val) return '¥' + '0.00' + '元';
                return '¥' + toNum.toFixed(2) + '元';
            }else{
                return val;
            }
        }
    },
    methods: {
        getProductsData () {
            this.axios.get('/products',{
                params: {
                    categoryId: '100012',
                    pageSize: 6
                }
            }).then(res => {
                this.milPhone = res.list;
            })
        },
        getCartCount () {
            this.axios.get('/carts/products/sum').then((res=0) => {
                this.$store.dispatch('saveCartProduct',res);
            })
        },
        getCart () {
            this.$router.push({
                name: 'cart'
            })
        },
        logout () {
            this.axios.post('/user/logout').then(() => {
                this.$message.success('退出成功');
                this.$cookie.set('userId','',{expires: '-1'});
                this.$store.dispatch('saveUsername','');
                this.$store.dispatch('saveCartProduct',0);
            })
        },
    },
    created () {
        this.$nextTick(() => {
            this.getProductsData();
            let params =  this.$route.params;
            if(params && params.from == 'login'){
                this.getCartCount();
            }
        })
    }
}
</script>

<style scoped lang="less">
@import '../../common/less/config.less';
.nav-header{
    width: 100%;
    .site-topbar{
        width: 100%;
        height: 39px;
        background-color: @colorB;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: @fontK;
        .container{
            width: @min-width;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .header-list{
                height: 100%;
                display: flex;
                .header-item{
                    display: inline-block;
                    margin-right: 17px;
                    height: 100%;
                    .header-a{
                        display: block;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-decoration: none;
                        color: #B0B0B0;
                        &.nav-header-item:hover{
                            color: @colorG;
                        }
                    }
                }
            }
            .header-user{
                .user-shopcart{
                    width: 110px;
                    margin-right: 0;
                    .shopcart-a{
                        background-color: @colorA;
                        color: #fff;
                        font-size: @fontK;
                        align-items: baseline;
                        line-height: 39px;
                        &:hover{
                            background-color: #fff;
                            color: @colorA;
                        }
                        .shopcart-icon{
                            margin-right: 4px;
                        }
                    }
                }
            }
        }
    }
    .site-header{
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .container{
            // position: relative;
            width:1226px;
            height: 112px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .header-product{
                list-style: none;
                margin-left: 209px;
                width: 643px;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                .header-product-item{
                    font-size: @fontI;
                    color: @colorB;
                    font-weight: bold;
                    margin-right: 20px;
                    cursor: pointer;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    &:hover{
                        span{
                            color: @colorA;
                        }
                        .product-children{
                            opacity: 1;
                            height: 220px;
                        }
                    }
                    .product-children{
                        position: absolute;
                        z-index: 12;
                        background-color: #fff;
                        top: 100%;
                        left: 0;
                        width: 100%;
                        height: 0;
                        display: flex;
                        opacity: 0;
                        justify-content: center;
                        overflow: hidden;
                        transition: 0.5s;
                        // border-top: solid 1px @colorH;
                        box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
                        &:before{
                            content: ' ';
                            display: block;
                            position: absolute;
                            width: 100%;
                            border-top: 1px solid @colorH;
                        }
                        .children-item{
                            position: relative;
                            // width: 16.6%;
                            width: 204px;
                            height: 100%;
                            overflow: hidden;
                            font-size: 12px;
                            cursor: pointer;
                            padding-top: 26px;
                            &:after{
                                content: ' ';
                                display: block;
                                height: 100px;
                                border-right: 1px solid @colorF;
                                position: absolute;
                                top: 50%;
                                right: 0;
                                transform: translateY(-75%);
                            }
                            &:last-child:after{
                                content: '';
                                display: none;
                            }
                            a{
                                text-decoration: none;
                                display: block;
                                width: 100%;
                                height: 100%;
                                img{
                                    display: block;
                                    height: 111px;
                                    margin: 0 auto;
                                    transition: 0.3s ease;
                                    &:hover{
                                        transform: scale(1.1);
                                    }
                                }
                                .pro-msg{
                                    text-align: center;
                                }
                                .pro-name{
                                    color: @colorB;
                                    margin: 19px 0 8px;
                                }
                                .pro-price{
                                    color: @colorA;
                                }
                            }
                        }
                    }
                }
            }
            .header-search{
                width: 319px;
                height: 50px;
                display: flex;
                border: solid 1px #E0E0E0;
                transition: .2s;                
                &:hover{
                    border-color: #b0b0b0;
                    .header-search-text{
                        border-right-color: #b0b0b0;
                    }
                }
                .header-search-text{
                    width: 264px;
                    height: 100%;
                    padding-left: 14px;
                    outline: none;
                    border: none;
                    border-right: solid 1px #E0E0E0;
                    font-size: 14px;
                    transition: .2s;   
                }
                .header-search-find{
                    text-decoration: none;
                    display: inline-block;
                    width: 55px;
                    height: 100%;
                    font-size: 22px;
                    color: #666666;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }
}
</style>
