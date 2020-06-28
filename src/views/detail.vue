<template>
    <div class="detail">
        <product-params :paramsMain="detailData.name"></product-params>
        <div class="wrap">
            <div class="container">
                <div class="product-banner">
                    <swiper ref="mySwiper" :options="swiperOptions">
                        <swiper-slide v-for="(item,index) of proBannerImgs" :key="index">
                            <img :src="item" alt="产品展览图"/>
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                        <div class="swiper-button-prev" slot="button-prev"></div>
                        <div class="swiper-button-next" slot="button-next"></div>
                    </swiper>
                </div>
                <div class="product-info">
                    <h2>{{detailData.name}}</h2>
                    <p class="pro-trait">
                        {{detailData.subtitle}} / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器<br/>
                        红外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏
                    </p>
                    <div class="proprietary">小米自营</div>
                    <div class="price">
                        <span class="now-price">{{detailData.price | currency}}</span>
                        <span class="old-price">1999元</span>
                    </div>
                    <div class="user-address">
                        <div class="address-bar">
                            <span class="iconfont icon-weibiaoti- address-icon"></span>
                            <p class="address-desc">
                                <span>北京</span>
                                <span>北京市</span>
                                <span>海定区</span>
                                <span>清河街道</span>
                            </p>
                            <span class="address-alter">修改</span>
                        </div>
                        <p class="pro-state">有现货</p>
                    </div>
                    <div class="choose">
                        <div class="choose-version choose-item">
                            <p class="version-title title-item">选择版本</p>
                            <ul class="label-list" @click="checkVersion">
                                <li ref="version-item" v-for="(item,index) of versionItems" :key="index" class="version-item label-item" :class="{'active-choose': index == 0}">{{item}}</li>
                            </ul>
                        </div>
                        <div class="choose-color choose-item">
                            <p class="color-title title-item">选择颜色</p>
                            <ul class="label-list" @click="checkColor">
                                <li ref="color-item" v-for="(item,index) of colorItems" :key="index" class="color-item label-item" :class="{'active-choose': index == 0}">{{item}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="settlement">
                        <div class="settlement-bar">
                            <div class="unit">
                                <span ref="unit-pro" class="unit-pro">{{chooseVersion}} {{chooseColor}}</span>
                                <span class="unit-price">¥ 999 元</span>
                            </div>
                            <p class="total">
                                总计:
                                <span class="total-num">¥ 999.00</span>
                                元
                            </p>
                        </div>
                        <a href="javascript:;" class="add-cart" @click="addCart">加入购物车</a>
                    </div>
                </div>
            </div>
            <div class="price-account">
                <div class="container">
                    <h2 class="account-title">价格说明</h2>
                    <div class="account-text"></div>
                </div>
            </div>
        </div>
        <service-bar></service-bar>
    </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import ProductParams from '../components/common/ProductParams';
import ServiceBar from '../components/common/ServiceBar';
// import Session from '../storage/index.js';
export default {
    name: "detail",
    components: {
        ProductParams,
        ServiceBar,
        Swiper,
        SwiperSlide
    },
    directives: {
        swiper: directive
    },
    data () {
        return {
            proId: this.$route.params.id,
            detailData: {},
            proBannerImgs: [
                '/imgs/detail/phone-1.jpg',
                '/imgs/detail/phone-2.jpg',
                '/imgs/detail/phone-3.jpg',
                '/imgs/detail/phone-4.jpg'
            ],
            swiperOptions: {
                autoplay: true,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            },
            versionItems: [
                '6GB+64GB 全网通',
                '6GB+128GB 全网通'
            ],
            colorItems: [
                '天际蓝',
                '松晨绿',
                '冰雾白'
            ],
            chooseVersion: '6GB+64GB 全网通',
            chooseColor: '天际蓝'
        }
    },
    methods: {
        _getProductData () {
            this.axios.get(`/products/${this.proId}`).then(res => {
                this.detailData = res;
            }).catch(err => {
                console.log(err);
            })
        },
        checkItem (refVal,event) {
            let node = this.$refs[refVal];
            node.some(item => {
                // if(item.classList.contains('active-choose')){
                    item.classList.remove('active-choose');
                // }
            })
            event.target.classList.add('active-choose');
        },
        checkVersion (event) {
            this.checkItem('version-item',event);
            this.chooseVersion = event.target.innerText;
        },
        checkColor () {
            this.checkItem('color-item',event);
            this.chooseColor = event.target.innerText;
        },
        addCart () {
            this.axios.post('/carts',{
                productId: this.proId,
                selected: true
            }).then((res={cartTotalQuantity:0}) => {
                this.$store.dispatch('saveCartProduct',res.cartTotalQuantity);
                // this.$store.dispatch('saveUnitPro',this.$refs['unit-pro'].innerText);
                // Session._setItem('unitPro',this.$refs['unit-pro'].innerText);
                this.$router.push('/cart');
            }).catch(err => {
                this.$message.error(err.message);
            })
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
    created () {
        this.$nextTick(() => {
            this._getProductData();
        })
    }
}
</script>

<style scoped lang="less">
@import '../common/less/config.less';
.detail{
    width: 100%;
    min-width: @min-width;
    .wrap{
        width: 100%;
        .container{
            width: @min-width;
            margin: 32px auto;
            display: flex;
            flex-wrap: wrap;
            .product-banner{
                width: 642px;
                height: 617px;
                overflow: hidden;
                .swiper-container{
                    width: 100%;
                    height: 100%;
                    .swiper-wrapper{
                        .swiper-slide{
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                }
            }
            .product-info{
                width: 584px;
                height: 817px;
                padding-left: 20px;
                color: #212121;
                .pro-trait{
                    padding-top: 8px;
                    font-size: @fontJ;
                    line-height: 1.5;
                    color: #b0b0b0;
                }
                .proprietary{
                    margin-top: 14px;
                    color: @colorA;
                }
                .price{
                    padding: 16px 0;
                    border-bottom: solid 1px #e0e0e0;
                    font-size: @fontE;
                    color: @colorA;
                    .old-price{
                        margin-left: 10px;
                        text-decoration: line-through;
                        color: #b0b0b0;
                        font-size: @fontI;
                    }
                }
                .user-address{
                    padding: 30px 50px;
                    margin: 20px 0;
                    background-color: #fafafa;
                    border: solid 1px #e0e0e0;
                    font-size: 14px;
                    .address-bar{
                        display: flex;
                        align-items: center;
                        .address-icon{
                            margin-right: 8px;
                            font-size: 20px;
                        }
                        span{
                            margin-right: 14px;
                        }
                    }
                    .pro-state{
                        color: @colorA;
                        padding: 10px 0 0 28px;
                    }
                }
                .choose{
                    .choose-item{
                        margin-bottom: 30px;
                    }
                    .title-item{
                        font-size: 18px;
                    }
                    .label-list{
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        .label-item{
                            &.active-choose{
                                border: solid 1px @colorA;
                                color: @colorA;
                            }
                            border: solid 1px @colorC;
                            width: 276px;
                            height: 42px;
                            text-align: center;
                            line-height: 42px;
                            color: @colorC;
                            margin-top: 10px;
                            cursor: pointer;
                        }
                    }
                }
                .settlement{
                    .settlement-bar{
                        margin: 50px 0 30px;
                        padding: 24px 30px;
                        background-color: #FAFAFA;
                        .unit{
                            font-size: 14px;
                            color: @colorB;
                            display: flex;
                            justify-content: space-between;
                        }
                        .total{
                            margin-top: 18px;
                            font-size: @fontE;
                            color: @colorA;
                            display: flex;
                            align-items: center;
                            .total-num{
                                margin: 0 5px 0 8px;
                                font-size: @fontD;
                            }
                        }
                    }
                    .add-cart{
                        text-decoration: none;
                        display: block;
                        width: 300px;
                        height: 54px;
                        background-color: @colorA;
                        color: #fff;
                        text-align: center;
                        line-height: 54px;
                        transition: .3s;
                        &:hover{
                            background-color: #f25807;
                        }
                    }
                }
            }
        }
    }
    .price-account{
        width: 100%;
        background-color: #f3f3f3;
        padding: 38px 0;
        .container{
            width: @min-width;
            margin: 0 auto;
            .account-text{
                width: 100%;
                height: 189px;
                margin-top: 30px;
                background: url(/imgs/detail/item-price.jpeg) no-repeat center;
                background-size: cover;
            }
        }
    }
}
</style>
