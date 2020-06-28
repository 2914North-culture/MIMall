<template>
    <div class="index">
        <div class="container">
            <div ref="swiper-box" class="swiper-box">
                <ul class="side-menu">
                    <li class="side-item">
                        <a class="item-main" href="javascript:;">手机 电话卡</a>
                        <div class="item-branch">
                            <ul class="branch-list" v-for="(item,index) of branchData" :key="index">
                                <li class="branch-item" v-for="(item,index) of item" :key="index">
                                    <a class="branch-item-link" :href="item ? '/#/detail/' + item.id : ''">
                                        <img class="link-img" v-lazy="item ? item.imgUrl : '/imgs/item-box-1.png' "/>
                                        <span class="link-text">{{item? item.name : '小米9'}}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="side-item">
                        <a class="item-main" href="javascrip:;">电视 盒子</a>
                        <div class="item-branch">
                            <ul class="branch-list" v-for="(item,index) of branchData" :key="index">
                                <li class="branch-item" v-for="(item,index) of item" :key="index">
                                    <a class="branch-item-link" :href="item ? '/#/product/' + item.id : ''">
                                        <img class="link-img" v-lazy="item ? item.imgUrl : '/imgs/item-box-1.png' "/>
                                        <span class="link-text">{{item? item.name : '小米9'}}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="side-item">
                        <a class="item-main" href="javascrip:;">笔记本 平板</a>
                        <div class="item-branch">
                            <ul class="branch-list" v-for="(item,index) of branchData" :key="index">
                                <li class="branch-item" v-for="(item,index) of item" :key="index">
                                    <a class="branch-item-link" :href="item ? '/#/product/' + item.id : ''">
                                        <img class="link-img" v-lazy="item ? item.imgUrl : '/imgs/item-box-1.png' "/>
                                        <span class="link-text">{{item? item.name : '小米9'}}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="side-item">
                        <a class="item-main" href="javascrip:;">家电 插线板</a>
                        <div class="item-branch">
                            <ul class="branch-list" v-for="(item,index) of branchData" :key="index">
                                <li class="branch-item" v-for="(item,index) of item" :key="index">
                                    <a class="branch-item-link" :href="item ? '/#/product/' + item.id : ''">
                                        <img class="link-img" v-lazy="item ? item.imgUrl : '/imgs/item-box-1.png' "/>
                                        <span class="link-text">{{item? item.name : '小米9'}}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="side-item">
                        <a class="item-main" href="javascrip:;">出行 穿戴</a>
                        <div class="item-branch">
                            <ul class="branch-list" v-for="(item,index) of branchData" :key="index">
                                <li class="branch-item" v-for="(item,index) of item" :key="index">
                                    <a class="branch-item-link" :href="item ? '/#/product/' + item.id : ''">
                                        <img class="link-img" v-lazy="item ? item.imgUrl : '/imgs/item-box-1.png' "/>
                                        <span class="link-text">{{item? item.name : '小米9'}}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="side-item">
                        <a class="item-main" href="javascrip:;">智能 路由器</a>
                        <div class="item-branch">
                            <ul class="branch-list" v-for="(item,index) of branchData" :key="index">
                                <li class="branch-item" v-for="(item,index) of item" :key="index">
                                    <a class="branch-item-link" :href="item ? '/#/product/' + item.id : ''">
                                        <img class="link-img" v-lazy="item ? item.imgUrl : '/imgs/item-box-1.png' "/>
                                        <span class="link-text">{{item? item.name : '小米9'}}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="side-item">
                        <a class="item-main" href="javascrip:;">电源 配件</a>
                        <div class="item-branch">
                            <ul class="branch-list" v-for="(item,index) of branchData" :key="index">
                                <li class="branch-item" v-for="(item,index) of item" :key="index">
                                    <a class="branch-item-link" :href="item ? '/#/product/' + item.id : ''">
                                        <img class="link-img" v-lazy="item ? item.imgUrl : '/imgs/item-box-1.png' "/>
                                        <span class="link-text">{{item? item.name : '小米9'}}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="side-item">
                        <a class="item-main" href="javascrip:;">生活 箱包</a>
                        <div class="item-branch">
                            <ul class="branch-list" v-for="(item,index) of branchData" :key="index">
                                <li class="branch-item" v-for="(item,index) of item" :key="index">
                                    <a class="branch-item-link" :href="item ? '/#/product/' + item.id : ''">
                                        <img class="link-img" v-lazy="item ? item.imgUrl : '/imgs/item-box-1.png' "/>
                                        <span class="link-text">{{item? item.name : '小米9'}}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <swiper ref="mySwiper" :options="swiperOptions">
                    <swiper-slide v-for="(item,index) of swiperImgs" :key="index">
                        <a :href="'/#/product/' + item.id">
                            <img :src="item.imgUrl">
                        </a>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
            </div>
            <div class="ads-box">
                <ul class="ads-list">
                    <li class="ads-item" v-for="(item,index) of adsList" :key="index">
                        <a class="ads-item-link" :href="'/#/product/' + item.id">
                            <img v-lazy="item.imgUrl"/>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="ads-banner">
                <a class="ads-banner-link" :href="'/#/product/30'">
                    <img v-lazy="'/imgs/banner-1.png'"/>
                </a>
            </div>
        </div>
        <div class="product-box">
            <div class="container">
                <h2 class="product-box-title">手机</h2>
                <div class="product-box-content">
                    <div class="side-billboards">
                        <a class="side-billboards-link" href="/#/product/35">
                            <img v-lazy="'/imgs/mix-alpha.jpg'"/>
                        </a>
                    </div>
                    <div class="list-box">
                        <ul class="list-box-list" v-for="(item,index) of proList" :key="index">
                            <li class="list-box-item" v-for="(item,index) of item" :key="index">
                                <span class="new-pro" v-if="item.id % 2 == 0">新品</span>
                                <span class="hot-pro" v-else>热销产品</span>
                                <a :href="'/#/detail/' + item.id" class="pro-img-link">
                                    <div class="list-box-img">
                                        <img v-lazy="item.mainImage"/>
                                    </div>
                                </a>
                                <div class="list-style-info">
                                    <h3 class="info-name info-item">{{item.name}}</h3>
                                    <p class="info-subtitle info-item">{{item.subtitle}}</p>
                                    <p class="info-price info-item">
                                        {{item.price | currency}}
                                        <span class="iconfont icon-gouwuche add-cart-icon" title="添加购物车" @click="addShopCart(item.id)"></span>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <my-service-bar></my-service-bar>
        <my-modal title="提示" sureText="确认" btnType="1" :isShowModal='isShowModal' @fork="isShowModal = false" @sureBtn="sureBtn">
            <template v-slot:body>
                <p class="modal-content">是否添加商品到购物车！</p>
            </template>
        </my-modal>
    </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import ServiceBar from '../components/common/ServiceBar'
import Modal from '../components/common/Modal'
export default {
    name: "index",
    components: {
        Swiper,
        SwiperSlide,
        'my-service-bar': ServiceBar,
        'my-modal': Modal
    },
    directives: {
        swiper: directive
    },
    data () {
        return {
            swiperImgs: [
                {
                    id:'42',
                    imgUrl: '/imgs/slider/slide-1.jpg'
                },
                {
                    id:'45',
                    imgUrl: '/imgs/slider/slide-2.jpg'
                },
                {
                    id:'46',
                    imgUrl: '/imgs/slider/slide-3.jpg'
                },
                {
                    id:'',
                    imgUrl: '/imgs/slider/slide-4.jpg'
                },
                {
                    id:'',
                    imgUrl: '/imgs/slider/slide-5.jpg'
                },
            ],
            swiperOptions: {
                autoplay:true,
                loop:true,
                effect:'cube',
                cubeEffect: {
                    shadowOffset: 100,
                    shadowScale: 0.6
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable:true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            },
            branchData: [
                [
                    {
                        id:30,
                        imgUrl:'/imgs/item-box-1.png',
                        name:'小米CC9',
                    },{
                        id:31,
                        imgUrl:'/imgs/item-box-2.png',
                        name:'小米8青春版',
                    },{
                        id:32,
                        imgUrl:'/imgs/item-box-3.jpg',
                        name:'Redmi K20 Pro',
                    },{
                        id:33,
                        imgUrl:'/imgs/item-box-4.jpg',
                        name:'移动4G专区',
                    }
                ],
                [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]
            ],
            adsList:[
                {
                    id:33,
                    imgUrl:'/imgs/ads/ads-1.png'
                },
                {
                    id:48,
                    imgUrl:'/imgs/ads/ads-2.jpg'
                },
                {
                    id:45,
                    imgUrl:'/imgs/ads/ads-3.png'
                },
                {
                    id:47,
                    imgUrl:'/imgs/ads/ads-4.jpg'
                }
            ],
            proList: [],
            isShowModal: false,
            pageY: '',
            bodyOverDo: false,
            proId: ''
        }
    },
    filters: {
        currency (val) {
            let toNum = Number(val);
            if(!isNaN(toNum)){
                if(!val) return '¥' + '0.00' + '元';
                return '¥ ' + toNum.toFixed(2) + '元';
            }else{
                return val;
            }
        }
    },
    methods: {
        getProList () {
            this.axios.get('/products',{
                params: {
                    categoryId: '100012',
                    pageSize: 14
                }
            }).then(res => {
                let resdo = res.list.slice(6,14);
                this.proList = [resdo.slice(0,4),resdo.slice(4,8)];
            })
        },
        addShopCart (id) {
            this.isShowModal = true;
            this.proId = id;
        },
        sureBtn () {
            this.axios.post('/carts',{
                productId: this.proId,
                selected: true
            }).then((res={cartTotalQuantity:0}) => {
                this.$store.dispatch('saveCartProduct',res.cartTotalQuantity);
                this.$message.success('成功添加商品至购物车');
            }).catch(err => {
                this.$message.error(err.message);
            })
            this.isShowModal = false;
        }
    },
    created () {
        this.getProList();
    }
}
</script>

<style scoped lang="less">
@import '../common/less/mixin.less';
@import '../common/less/config.less';
.index{
    position: relative;
    width: 100%;
    .container{
        width: @min-width;
        margin: 0 auto;
        .swiper-box{
            position: relative;
            width: 100%;
            overflow: hidden;
            .side-menu{
                position: absolute;
                z-index: 10;
                left: 0;
                top: 0;
                width: 234px;
                height: 100%;
                background-color: #55585a7a;
                padding: 26px 0;
                .side-item{
                    height: 50px;
                    &:hover{
                        background-color: @colorA;
                        .item-branch{
                            display: block;
                            height: 100%;
                            box-shadow: 0 -2px 12px rgba(32, 8, 8, 0.18) inset;
                        }
                    }
                    .item-main{
                        position: relative;
                        display: block;
                        width: 100%;
                        height: 100%;
                        padding-left: 30px;
                        color: #fff;
                        .flex(@x: flex-start);
                        &:after{
                            content: ' ';
                            display: block;
                            width: 10px;
                            height: 15px;
                            .wrap1(@posWay: absolute, @transX: 0);
                            right: 30px;
                            background: url(../../public/imgs/icon-arrow.png) no-repeat center;
                            background-size: contain;
                        }
                    }
                    .item-branch{
                        position: absolute;
                        width: @min-width - 234px;
                        left: 100%;
                        top: 0;
                        background-color: #fff;
                        overflow: hidden;
                        display: none;
                        .branch-list{
                            width: 100%;
                            .flex(@x: space-between);
                            padding: 0 23px;
                            .branch-item{
                                height: 75px;
                                width: 25%;
                                .branch-item-link{
                                    color: @colorB;
                                    display: block;
                                    width: 100%;
                                    height: 100%;
                                    padding-left: 30px;
                                    .flex(@x: flex-start);
                                    .link-img{
                                        width: 42px;
                                        height: 35px;
                                        margin-right: 15px;
                                        transition: 0.3s ease;
                                        &:hover{
                                            transform: scale(1.1);
                                        }
                                    }
                                    .link-text{
                                        font-size: 14px;
                                        &:hover{
                                            color: @colorA;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .swiper-container{
                position: realtive;
                height: 451px;
                .swiper-wrapper{
                    .swiper-slide{
                        a{
                            display: inline-block;
                            width: 100%;
                            height: 100%;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                }
                .swiper-button-prev{
                    left: 274px;
                }
            }
        }
        .ads-box{
            width: 100%;
            margin: 14px 0 31px;
            .ads-list{
                .flex(@x: space-between);
                overflow: hidden;
                .ads-item{
                    width: 296px;
                    height: 167px;
                    .ads-item-link{
                        display: block;
                        width: 100%;
                        height: 100%;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
        .ads-banner{
            width: 100%;
            height: 130px;
            overflow: hidden;
            margin-bottom: 50px;
            .ads-banner-link{
                display: block;
                width: 100%;
                height: 100%;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .product-box{
        padding: 30px 0 50px;
        background-color: @colorJ;
        width: 100%;
        .container{
            width: @min-width;
            margin: 0 auto;
            .product-box-title{
                margin-bottom: 20px;
                color: @colorB;
            }
            .product-box-content{
                .flex();
                height: 619px;
                .side-billboards{
                    margin-right: 16px;
                    display: inline-block;
                    width: 224px;
                    min-width: 224px;
                    height: 100%;
                    .side-billboards-link{
                        display: block;
                        width: 100%;
                        height: 100%;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .list-box{
                    width: 1002px;
                    height: 100%;
                    .list-box-list:nth-child(2){
                        align-items: flex-end;
                    }
                    .list-box-list{
                        height: 50%;
                        .flex(@x: space-between,@y: flex-start);
                        .list-box-item{
                            width: 24%;
                            height: 98%;
                            background-color: #fff;
                            transition: 0.2s linear;
                            &:hover{
                                box-shadow: 0 15px 30px rgba(0,0,0,.1);
                                transform: translate3d(0,-2px,0);
                            }
                            .pro-img-link{
                                position: relative;
                                display: block;
                                width: 100%;
                                .list-box-img{
                                    width: 80%;
                                    height: 180px;
                                    margin: 0 auto;
                                    transition: 0.2s linear;
                                    &:hover{
                                        transform: scale(1.05);
                                    }
                                    img{
                                        width: 100%;
                                        height: 100%;
                                    }
                                }
                            }
                            .new-pro,.hot-pro{
                                .wrap1(@top: 8px, @transY: 0);
                                left: 50%;
                                display: block;
                                width: 60px;
                                height: 20px;
                                text-align: center;
                                line-height: 20px;
                                color: #fff;
                                font-size: @fontK;
                                z-index: 20;
                            }
                            .new-pro{
                                background-color: #7ECF68;
                            }
                            .hot-pro{
                                background-color: #E82626;
                            }
                            .list-style-info{
                                position: relative;
                                .info-item{
                                    text-align: center;
                                }
                                .info-name{
                                    font-size: @fontJ;
                                    color: @colorB;
                                    line-height: @fontJ;
                                    font-weight: bold;
                                }
                                .info-subtitle{
                                    color: @colorD;
                                    margin: 6px auto 13px;
                                    font-size: 12px;
                                }
                                .info-price{
                                    color: #F20A0A;
                                    font-size: @fontJ;
                                    font-weight: bold;
                                    .add-cart-icon{
                                        width: 20px;
                                        height: 20px;
                                        margin-left: 7px;
                                        cursor: pointer;
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
    }
}
</style>
