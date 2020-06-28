<template>
    <div class="cart">
        <my-order-header orderTitle="我的购物车" orderDesc="温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算"></my-order-header>
        <div class="wrap">
            <div class="container">
                <ul class="cart-nav-bar">
                    <li class="col-1 all-choose">
                        <span class="is-check" :class="{'all-checked': isAllChecked}" @click="allChecked"></span>
                        全选
                    </li>
                    <li class="col-3">商品名称</li>
                    <li class="col-1">单价</li>
                    <li class="col-2">数量</li>
                    <li class="col-1">小计</li>
                    <li class="col-1">操作</li>
                </ul>
                <ul class="cart-product-list" v-for="(item,index) of cartData" :key="index">
                    <li class="cart-product-item">
                        <div class="col-1 item-todo">
                            <div class="check-box" :class="{'checked-todo': item.productSelected}" @click="updataCart(item)"></div>
                        </div>
                        <div class="product-name col-3 item-todo">
                            <a class="product-img" href="javascript:;">
                                <img v-lazy="item.productMainImage">
                            </a>
                            <p class="product-desc">{{`${item.productName}，${item.productSubtitle}`}}</p>
                            <!-- <p class="product-desc">{{productName}}</p> -->
                        </div>
                        <span class="univalence col-1 item-todo">{{item.productPrice}}元</span>
                        <div class="nums col-2 item-todo">
                            <div class="nums-box">
                                <div class="subtract operation-nums" data-type="-" @click="updataCart(item,$event)">-</div>
                                <div class="current-nums">{{item.quantity}}</div>
                                <div class="append operation-nums" data-type="+" @click="updataCart(item,$event)">+</div>
                            </div>
                        </div>
                        <span class="subtotal col-1 item-todo">{{item.productTotalPrice}}元</span>
                        <div class="delete col-1 item-todo">
                            <div class="delete-icon" title="删除" @click="deleteProduct(item)">×</div>
                        </div>
                    </li>
                </ul>
                <div class="order-wrap">
                    <div class="cart-tip">
                        <a href="/#/index" class="continue-shopping">继续购物</a>
                        <p>
                            共<span class="state-num">{{allProductNums}}</span>件商品，已选择<span class="state-num">{{selectedProduct}}</span>件
                        </p>
                    </div>
                    <div class="cart-total">
                        <div>
                            合计：<span class="state-num">{{combinedPrice}}</span>元
                        </div>
                        <span class="to-pay" @click="goPay">去结算</span>
                    </div>
                </div>
            </div>
        </div>
        <service-bar></service-bar>
        <my-nav-footer></my-nav-footer>
    </div>
</template>

<script>
import OrderHeader from '../components/common/OrderHeader';
import ServiceBar from '../components/common/ServiceBar';
import NavFooter from '../components/common/NavFooter';
// import Session from '../storage/index.js';
export default {
    name: "cart",
    components: {
        'my-order-header': OrderHeader,
        ServiceBar,
        'my-nav-footer': NavFooter
    },
    data () {
        return {
            cartData: [], //购物车数据
            allProductNums: '', // 购物车内共有几件商品
            isAllChecked: false, // 是否全选
            selectedProduct: 0, // 已选择的商品
            combinedPrice: 0, // 合计价格
            productName: '', // 商品名称

        }
    },
    methods: {
        // 第一次获取购物车列表数据
        getCartList () {
            this.axios.get('/carts').then(res => {
                this.renderData(res);
            })
        },
        // 更新购物车列表数据
        updataCart (item,event) {
            let quantity = item.quantity;
            let selected = item.productSelected;
            let eventType = event ? event.target.dataset.type : '';
            if(eventType == '-'){
                if(quantity == 1){
                    this.$message.warning('商品至少保留一件');
                    return;
                }
                --quantity;
            }else if(eventType == '+'){
                if(quantity > item.productStock){
                    this.$message.warning('购买数量不能超过库存数量');
                    return;
                }
                ++quantity;
            }else{
                selected = !item.productSelected;
            }
            this.axios.put(`/carts/${item.productId}`,{
                quantity,
                selected
            }).then(res => {
                this.renderData(res);
            })
        },
        // 购物车商品是否全选
        allChecked () {
            let url = this.isAllChecked ? '/carts/unSelectAll' : '/carts/selectAll';
            this.axios.put(url).then(res => {
                this.renderData(res);
            })
        },
        deleteProduct (item) {
            this.axios.delete(`/carts/${item.productId}`).then(res => {
                this.renderData(res);
                this.$message.success('商品删除成功！');
            })
        },
        // 公共赋值
        renderData (res) {
            this.cartData = res.cartProductVoList;
            this.allProductNums = res.cartProductVoList.length;
            this.isAllChecked = res.selectedAll;
            this.selectedProduct = this.cartData.filter(item => item.productSelected).length;
            this.combinedPrice = res.cartTotalPrice;
            // console.log(res);
        },
        goPay () {
            let isCheck = this.cartData.every(item => !item.productSelected);
            if(isCheck){
                this.$message.warning('请选择一款商品进行交易！');
            }else{
                this.$router.push('/order/confirm');
            }
        }
    },
    mounted () {
        this.getCartList();
        console.log(1);
        // this.productName = Session._getItem('unitPro');
    }
}
</script>

<style scoped lang="less">
@import '../common/less/config.less';
.cart{
    .wrap{
        background-color: @colorJ;
        padding: 30px 0 114px;
        .container{
            width: @min-width;
            margin: 0 auto;
            .cart-nav-bar{
                display: flex;
                background-color: @colorG;
                height: 79px;
                color: @colorD;
                li{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    &.all-choose{
                        .is-check{
                            width: 20px;
                            height: 20px;
                            border: solid 1px @colorH;
                            margin-right: 17px;
                            cursor: pointer;
                            &.all-checked{
                                background: url('/imgs/icon-gou.png') @colorA no-repeat center;
                                background-size: 16px 12px;
                            }
                        }
                    }
                }
                .col-1{
                    flex: 1;
                }
                .col-2{
                    flex: 2;
                }
                .col-3{
                    flex: 3;
                }
            }
            .cart-product-list{
                .cart-product-item{
                    border-top: 1px solid #e0e0e0;
                    padding: 15px 0;
                    background-color: #fff;
                    display: flex;
                    align-items: center;
                    color: #757575;
                    .item-todo{
                        text-align: center;
                    }
                    .col-1{
                        flex: 1;
                    }
                    .col-2{
                        flex: 2;
                    }
                    .col-3{
                        flex: 3;
                    }
                    .check-box{
                        width: 20px;
                        height: 20px;
                        border: 1px solid #e0e0e0;
                        margin-left: 33px;
                        cursor: pointer;
                        &.checked-todo{
                            background: url('/imgs/icon-gou.png') @colorA no-repeat center;
                            background-size: 16px 12px;
                        }
                    }
                    .product-name{
                        display: flex;
                        align-items: center;
                        .product-img{
                            margin-right: 40px;
                            img{
                                display: inline-block;
                                width: 80px;
                                height: 80px;
                            }
                        }
                        .product-desc{
                            text-align:left;
                            font-size: 16px;
                            color: #424242;
                        }
                    }
                    .nums{
                        display: flex;
                        justify-content: center;
                        .nums-box{
                            width: 148px;
                            height: 38px;
                            border: solid 1px #e0e0e0;
                            display: flex;
                            .operation-nums{
                                width: 38px;
                                height: 38px;
                                text-align: center;
                                line-height: 38px;
                                cursor: pointer;
                                transition: 0.3s;
                                &:hover{
                                    background-color: #e0e0e0;
                                }
                            }
                            .current-nums{
                                flex: 1;
                                line-height: 38px;
                            }
                        }
                    }
                    .subtotal{
                        color: @colorA;
                    }
                    .delete{
                        display: flex;
                        justify-content: center;
                        .delete-icon{
                            width: 24px;
                            height: 24px;
                            text-align: center;
                            line-height: 24px;
                            border-radius: 50%;
                            font-size: 18px;
                            cursor: pointer;
                            transition: .3s;
                            &:hover{
                                background-color: #e53935;
                                color: #fff;
                            }
                        }
                    }
                }
            }
            .order-wrap{
                margin-top: 20px;
                height: 50px;
                color: @colorC;
                font-size: 14px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .cart-tip{
                    margin-left: 29px;
                    display: flex;
                    color: @colorC;
                    .continue-shopping{
                        text-decoration: none;
                        color: @colorC;
                        margin-right: 37px;
                        &:hover{
                            color: @colorA;
                        }
                    }
                    .state-num{
                        margin: 0 5px;
                        color: @colorA;
                    }
                }
                .cart-total{
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    color: @colorA;
                    .state-num{
                        font-size: 24px;
                    }
                    .to-pay{
                        display: inline-block;
                        width: 202px;
                        height: 50px;
                        background-color: @colorA;
                        color: @colorG;
                        font-size: 18px;
                        text-align: center;
                        line-height: 50px;
                        margin-left: 37px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>
