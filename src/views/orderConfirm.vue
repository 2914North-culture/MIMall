<template>
    <div class="order-confirm">
        <div class="wrap">
            <div class="container">
                <div class="shipping-address">
                    <p class="address-title">收货地址</p>
                    <div class="addr-info">
                        <ul class="shipping-info">
                            <li class="shipping-address-item" v-for="(item,index) of list" :key="index" :class="{'checkStyle': index == checkedIndex}" @click="checkedIndex = index">
                                <div class="name-phone">
                                    <span class="name">{{item.receiverName}}</span>
                                    <span class="phone">{{item.receiverMobile}}</span>
                                </div>
                                <p class="address">{{`${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`}}</p>
                                <p class="zip-code">{{item.receiverZip}}</p>
                                <div class="operation-address">
                                    <span class="iconfont icon-shanchu el-address oper-item" title="删除地址" @click="delAddress(item)"></span>
                                    <span class="iconfont icon-xiugai modify-address oper-item" title="修改地址" @click="modifyAddress(item)"></span>
                                </div>
                            </li>
                            <li class="address-list" @click="openAddressModal">
                                <div class="add-icon"></div>
                                <div class="add-text">添加新地址</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="products">
                    <h2 class="products-title">商品</h2>
                    <ul class="products-list">
                        <li class="products-item" v-for="(item,index) of cartList" :key="index">
                            <div class="good-name">
                            <img v-lazy="item.productMainImage" alt="">
                            <span>{{`${item.productName} ${item.productSubtitle}`}}</span>
                            <!-- <span>{{productName}}</span> -->
                            </div>
                            <div class="good-price">{{item.productPrice}}元 x {{item.quantity}}</div>
                            <div class="good-total">{{item.productTotalPrice}}元</div>
                        </li>
                    </ul>
                </div>
                <div class="distribution end-info">
                    <h2 class="end-info-title">配送方式</h2>
                    <ul>
                        <li>包邮</li>
                    </ul>
                </div>
                <div class="invoice end-info">
                    <h2 class="end-info-title">发票</h2>
                    <ul>
                        <li>电子发票</li>
                        <li>个人</li>
                    </ul>
                </div>
                <div class="details">
                    <ul class="details-list">
                        <li class="details-item">
                            <span class="item-key">商品件数：</span>
                            <span class="item-val">{{productCount}}件</span>
                        </li>
                        <li>
                            <span class="item-key">商品总价：</span>
                            <span class="item-val">{{cartTotalPrice}}元</span>
                        </li>
                        <li>
                            <span class="item-key">优惠活动：</span>
                            <span class="item-val">无</span>
                        </li>
                        <li>
                            <span class="item-key">运费：</span>
                            <span class="item-val">0元</span>
                        </li>
                        <li class="all-price">
                            <span class="item-key">应付总额：</span>
                            <span class="item-val">{{cartTotalPrice}}元</span>
                        </li>
                    </ul>
                </div>
                <div class="btn-group">
                    <a href="/#/cart" class="back-to-cart group-item">返回购物车</a>
                    <span class="go-to-account group-item" @click="orderPay">去结算</span>
                </div>
            </div>
        </div>
        <!-- 模态框 -->
        <modal title="删除确认" btnType="1" sureText="删除" :isShowModal="showDelModal" @fork="showDelModal=false" @sureBtn="submitAddress">
            <template v-slot:body>
                <p>您确认要删除该收货地址吗？</p>
            </template>
        </modal>
        <modal title="填写地址" btnType="1" sureText="确认" :isShowModal="showEditModal" @fork="showEditModal=false" @sureBtn="submitAddress">
            <template v-slot:body>
                <div class="edit-wrap">
                    <div class="item">
                        <input type="text" class="input" placeholder="姓名" v-model="checkedItem.receiverName">
                        <input type="text" class="input" placeholder="手机号" v-model="checkedItem.receiverMobile">
                    </div>
                    <div class="item">
                        <select name="province" v-model="checkedItem.receiverProvince">
                            <option value="四川">四川</option>
                            <option value="甘肃">甘肃</option>
                            <option value="云南">云南</option>
                        </select>
                        <select name="city" v-model="checkedItem.receiverCity">
                            <option value="成都">成都</option>
                            <option value="重庆">重庆</option>
                            <option value="德阳">德阳</option>
                            <option value="厦门">厦门</option>
                        </select>
                        <select name="district" v-model="checkedItem.receiverDistrict">
                            <option value="昌平区">高新区</option>
                            <option value="海淀区">海淀区</option>
                            <option value="东城区">东城区</option>
                            <option value="西城区">西城区</option>
                            <option value="顺义区">顺义区</option>
                            <option value="房山区">房山区</option>
                        </select>
                    </div>
                    <div class="item">
                        <textarea name="street" v-model="checkedItem.receiverAddress"></textarea>
                    </div>
                    <div class="item">
                        <input type="text" class="input" placeholder="邮编" v-model="checkedItem.receiverZip">
                    </div>
                </div>
            </template>
        </modal>
    </div>
</template>

<script>
import Modal from '../components/common/Modal';
export default {
    name: "order-confirm",
    components: {
        Modal
    },
    data () {
        return {
            list: [], // 收货地址列表
            cartList: [], // 购物车中需要结算的商品列表
            cartTotalPrice: 0, //商品总金额
            productCount: 0, // 每种商品结算时的数量
            checkedItem: {}, // 选中的商品对象
            userAction: '', // 用户行为 0 - 新增 1 - 编辑 2 - 删除
            showDelModal: false, // (删除)模态框显示隐藏
            showEditModal: false, // (修改 | 添加)模态框显示隐藏
            checkedIndex: 0,
            productName: ''
        }
    },
    // watch: {
    //     '$route.path': function(to,from){
    //         if(to == '/order/list'){
    //             console.log(1);
    //             this.productName = this.$store.state.unitPro;
    //         }
    //     }
    // },
    methods: {
        // 获取地址列表
        getAddressList () {
            this.axios.get('/shippings').then(res => {
                this.list = res.list;
            })
        },
        // 获取购物车列表
        getCartList () {
            this.axios.get('/carts').then(res => {
                let list = res.cartProductVoList; // 获取的是购物车中所有商品的列表
                this.cartTotalPrice = res.cartTotalPrice, // 商品总金额
                this.cartList = list.filter(item => item.productSelected); // 获取的是购物车中勾选了的商品
                this.cartList.map(item => {
                    this.productCount += item.quantity;
                })
            })
        },
        // 地址删除
        delAddress (item) {
            this.checkedItem = item;
            this.userAction = 2;
            this.showDelModal = true;
        },
        // 地址修改
        modifyAddress (item) {
            this.checkedItem = item;
            this.userAction = 1;
            this.showEditModal = true;
        },
        // 打开地址模态框
        openAddressModal () {
            this.checkedItem = {},
            this.userAction = 0;
            this.showEditModal = true;
        },
        submitAddress () {
            let {checkedItem,userAction} = this;
            let method,url;
            if(userAction == 0){
                method = 'post',url = '/shippings';
            }else if(userAction == 1){
                method = 'put',url = `/shippings/${checkedItem.id}`;
            }else {
                method = 'delete',url = `/shippings/${checkedItem.id}`;
            }
            if(userAction == 0 || userAction == 1){
                let {receiverName, receiverMobile, receiverProvince, receiverCity, receiverDistrict, receiverAddress, receiverZip} = checkedItem;
                let errMsg='';
                if(!receiverName){
                    errMsg = '请输入收货人名称';
                }else if(!receiverMobile || !/\d{11}/.test(receiverMobile)){
                    errMsg = '请输入正确格式的手机号';
                }else if(!receiverProvince){
                    errMsg = '请选择省份';
                }else if(!receiverCity){
                    errMsg = '请选择对应的城市';
                }else if(!receiverAddress || !receiverDistrict){
                    errMsg = '请输入收货地址';
                }else if(!/\d{6}/.test(receiverZip)){
                    errMsg = '请输入六位邮编';
                }
                if(errMsg){
                    this.$message.error(errMsg);
                    return;
                }
                var params = {
                    receiverName,
                    receiverMobile,
                    receiverProvince,
                    receiverCity,
                    receiverDistrict,
                    receiverAddress,
                    receiverZip
                }
            }
            this.axios[method](url,params).then(res => {
                this.closeModal();
                this.getAddressList(); // 重新拉取一次
                this.$message.success('操作成功');
            })
        },
        closeModal () {
            this.checkedItem = {};
            this.userAction = '';
            this.showDelModal = false;
            this.showEditModal = false;
        },
        orderPay () {
            let indexDo = this.list[this.checkedIndex];
            if(!indexDo){
                this.$message.warning('请选择一个收货地址');
                return;
            }
            this.axios.post('/orders',{
                shippingId: indexDo.id
            }).then(res => {
                this.$router.push({
                    path: '/order/pay',
                    query: {
                        orderId: res.orderNo
                    }
                })
            })
        }
    },
    mounted () {
        this.getAddressList();
        this.getCartList();
    }
}
</script>

<style scoped lang="less">
@import '../common/less/config.less';
.order-confirm{
    .wrap{
        padding: 30px 0 84px;
        background-color: @colorJ;
        .container{
            width: @min-width;
            margin: 0 auto;
            padding: 40px 11px 40px 31px;
            background-color: #fff;
            .shipping-address{
                padding-top: 38px;
                .address-title{
                    margin-bottom: 21px;
                    font-size: 20px;
                    font-weight: 200;
                }
                .addr-info{
                    .shipping-info{
                        display: flex;
                        flex-wrap: wrap;
                        li{
                            margin-top: 25px;
                        }
                        .shipping-address-item{
                            position: relative;
                            padding: 15px 24px;
                            border: solid 1px #e5e5e5;
                            width: 271px;
                            height: 180px;
                            font-size:14px;
                            background-color: #fff;
                            margin-right: 25px;
                            &.checkStyle{
                                border: solid 1px @colorA;
                            }
                            .name-phone{
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                margin: 12px 0 24px;
                                font-size: @fontI;
                                .name{
                                    font-size: @colorG;
                                }
                            }
                            .address{
                                margin-bottom: 33px;
                                font-size: 13px;
                            }
                            .zip-code{
                                text-align: right;
                            }
                            .operation-address{
                                margin-top: 20px;
                                display: flex;
                                justify-content: space-between;
                                cursor: pointer;
                                .el-address{
                                    &:hover{
                                        color: #757575;
                                    }
                                }
                                .modify-address{
                                    &:hover{
                                        color: #f25807;
                                    }
                                }
                            }
                        }
                    }
                    .address-list{
                        padding: 15px 24px;
                        border: solid 1px #e5e5e5;
                        width: 271px;
                        height: 180px;
                        font-size:14px;
                        text-align: center;
                        cursor: pointer;
                        .add-icon{
                            width: 30px;
                            height: 30px;
                            background: url(/imgs/icon-add.png) #e0e0e0 no-repeat center;
                            background-size: 14px;
                            border-radius: 50%;
                            margin: 45px auto 10px;
                        }
                        .add-text{
                            color: #999999;

                        }
                    }
                }
            }
            .products{
                margin-top: 34px;
                padding-bottom: 12px;
                .products-title{
                    font-size: 18px;
                    padding-bottom: 5px;
                }
                .products-list{
                    border-top: solid 1px #e5e5e5;
                    border-bottom: solid 1px #e5e5e5;
                    padding: 6px 0;
                    .products-item{
                        display:flex;
                        align-items: center;
                        height:40px;
                        line-height:40px;
                        margin-top:10px;
                        font-size:16px;
                        color:#333333;
                        .good-name{
                            flex: 6;
                            display: flex;
                            align-items: center;
                            img{
                                width:30px;
                                height:30px;
                                vertical-align:middle;
                                margin-right: 10px;
                            }
                        }
                        .good-price{
                            flex:3;
                        }
                        .good-total{
                            flex: 1;
                            padding-right:44px;
                            color:#FF6600;
                        }
                    }
                }
            }
            .end-info{
                display: flex;
                align-items: center;
                margin-top: 31px;
                .end-info-title{
                    margin-right: 71px;
                }
                ul{
                    display: flex;
                    li{
                        margin-right: 23px;
                        color: @colorA;
                    }
                }
            }
            .details{
                padding: 50px 44px 33px 0;
                display: flex;
                justify-content: flex-end;
                li{
                    margin-bottom: 12px;
                    .item-key{
                        display: inline-block;
                        width: 80px;
                        text-align-last: justify;
                    }
                    .item-val{
                        display: inline-block;
                        width: 100px;
                        text-align: right;
                        color: @colorA;
                    }
                }
                .all-price{
                    .item-val{
                        font-size: @fontD;
                    }
                }
            }
            .btn-group{
                margin-top: 37px;
                display: flex;
                justify-content: flex-end;
                .group-item{
                    text-decoration: none;
                    color: #fff;
                    background-color: @colorA;
                    width: 202px;
                    height: 50px;
                    text-align: center;
                    line-height: 50px;
                    cursor: pointer;
                    transition: .4s;
                }
                .back-to-cart{
                    margin-right: 20px;
                    background-color: #b0b0b0;
                    &:hover{
                        background-color: #757575;
                    }
                }
                .go-to-account:hover{
                    background-color: #f25807;
                }
            }
        }
    }
    .edit-wrap{
      font-size:14px;
      .item{
        margin-bottom:15px;
        .input{
          display:inline-block;
          width:283px;
          height:40px;
          line-height:40px;
          padding-left:15px;
          border:1px solid #E5E5E5;
          &+.input{
            margin-left:14px;
          }
        }
        select{
          height:40px;
          line-height:40px;
          border:1px solid #E5E5E5;
          margin-right:15px;
        }
        textarea{
          height:62px;
          width:100%;
          padding:13px 15px;
          box-sizing:border-box;
          border:1px solid #E5E5E5;
        }
      }
    }
}
</style>