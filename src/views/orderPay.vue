<template>
    <div class="order-pay">
        <div class="wrap">
            <div class="container">
                <div class="order-wrap">
                    <div class="pay-success-mark"></div>
                    <div class="order-info">
                        <h2 class="order-info-title">订单提交成功！去付款咯～</h2>
                        <p>
                            请在
                            <span class="time-out">30分</span>
                            内完成支付, 超时后将取消订单
                        </p>
                        <p class="rec-info">收货信息：{{goodsInfo}}</p>
                    </div>
                    <div class="order-total">
                        <p class="pay-all">
                            应付总额：
                            <span class="pay-all-num">{{payMent}}</span>
                            元
                        </p>
                        <p class="order-details">
                            订单详情
                            <span class="iconfont icon-jiantou arrow-icon" :class="{'arrow-show': isRotate}" @click="isRotate = !isRotate"></span>
                        </p>
                    </div>
                </div>
                <div class="order-detail" :class="{'arrow-show': isRotate}">
                    <ul class="detail-list">
                        <li class="detail-item">
                            <span class="item-name">订单号：</span>
                            <span class="item-info">{{orderId}}</span>
                        </li>
                        <li class="detail-item">
                            <span class="item-name">收货信息：</span>
                            <span class="item-info">{{goodsInfo}}</span>
                        </li>
                        <li class="detail-item">
                            <span class="item-name">商品名称：</span>
                            <ul class="item-info info-list">
                                <li class="info-item" v-for="(item,index) of orderDetail" :key="index">
                                    <img class="info-img" :src="item.productImage" alt="商品图片"/>
                                    <span class="info-desc">{{item.productName}}</span>
                                </li>
                            </ul>
                        </li>
                        <li class="detail-item">
                            <span class="item-name">发票信息：</span>
                            <span class="item-info">电子发票 个人</span>
                        </li>
                    </ul>
                </div>
                <div class="item-pay">
                    <h3 class="pay-way-title">选择以下支付方式付款</h3>
                    <div class="pay-platform">
                        <p class="choose-platform-title">支付平台</p>
                        <ul class="platform-list">
                            <li class="platform-item ali" :class="{'check-pay': payType == '1'}" @click="paySubmit('1')"></li>
                            <li class="platform-item wechat" :class="{'check-pay': payType == '2'}" @click="paySubmit('2')"></li>
                        </ul>
                    </div>
                </div>
                <scan-pay-code v-if="showWeChatPay" :img="payImg" @close="closePayModal"></scan-pay-code>
                <modal title="支付确认" btnType="3" sureText="查看订单" cancelText="未支付" :isShowModal="isShowModal" @cancelBtn="isShowModal = false" @fork="isShowModal = false" @sureBtn="goOrderList"></modal>
            </div>
        </div>
    </div>
</template>

<script>
import ScanPayCode from '../components/common/ScanPayCode';
import Modal from '../components/common/Modal';
import QRCode from 'qrcode';
export default {
    name: "order-pay",
    components: {
        ScanPayCode,
        Modal
    },
    data () {
        return {
            orderId: this.$route.query.orderId,
            ordersData: {},
            payMent: 0, // 应付总金额
            goodsInfo: '', // 收货信息
            orderDetail: [], // 订单详情,
            isRotate: false, // 详情按钮状态
            payType: '', // 支付方式
            payImg: '',
            showWeChatPay: false,
            timer: '', // 定时器
            isShowModal: false, // 是否显示支付状态询问框
        }
    },
    methods: {
        getOrderList () {
            this.axios.get(`/orders/${this.orderId}`).then(res => {
                // console.log(res);
                this.ordersData = res;
                this.payMent = res.payment;
                this.orderDetail = res.orderItemVoList;
                let item = res.shippingVo;
                this.goodsInfo = `${item.receiverName} ${res.orderNo} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`
            })
        },
        paySubmit (type) {
            this.payType = type;
            if(type == '1'){
                window.open(`/#/order/alipay?orderId=${this.$route.query.orderId}`,'_blank');
            }else{
                this.axios.post('/pay',{
                    orderId: this.$route.query.orderId,  // 订单号
                    orderName: 'Vue小米商城高仿项目（2914）',  //扫码支付时订单名称
                    amount: 0.01,  //单位元
                    payType: 2  //1支付宝，2微信
                }).then(res => {
                    // this.content = res.content;
                    QRCode.toDataURL(res.content)
                    .then(url => {
                        this.showWeChatPay = true;
                        this.payImg = url;
                        this.loopOrderState();
                    })
                    .catch(err => {
                        this.$message.error('二维码生成失败，请稍后重试');
                    })
                })
            }
        },
        closePayModal () {
            this.showWeChatPay = false;
            this.isShowModal = true;
            clearInterval(this.timer);
        },
        // 状态轮询
        loopOrderState () {
            this.timer = setInterval(() => {
                this.axios.get(`/orders/${this.orderId}`).then(res => {
                    if(res.status == 20){
                        clearInterval(this.timer);
                        this.goOrderList();
                    }
                })
            },1000)
        },
        goOrderList () {
            this.$router.push('/order/list');
        }
    },
    mounted () {
        this.getOrderList();
    }
}
</script>

<style scoped lang="less">
@import '../common/less/config.less';
.order-pay{
    .wrap{
        background-color: @colorJ;
        .container{
            width: @min-width;
            margin: 0 auto;
            padding: 30px 0 61px;
            .order-wrap{
                padding:62px 50px;
                display: flex;
                background-color: @colorG;
                .pay-success-mark{
                    width: 90px;
                    height: 90px;
                    background: url(/imgs/icon-gou.png) #80c58a no-repeat center;
                    background-size: 50px;
                    border-radius: 50%;
                    margin-right: 40px;
                }
                .order-info{
                    margin-right: 248px;
                    font-size: 14px;
                    .time-out{
                        color: @colorA;
                    }
                    .order-info-title{
                        margin-bottom: 20px;
                    }
                    .rec-info{
                        margin-top: 10px;  
                    }
                }
                .order-total{
                    .pay-all{
                        margin-bottom: 30px;
                        .pay-all-num{
                            font-size: 28px;
                            color: @colorA;
                        }
                    }
                    .order-details{
                        .arrow-icon{
                            display: inline-block;
                            transform: rotate(90deg);
                            margin-left: 18px;
                            cursor: pointer;
                            transition: .3s;
                            &.arrow-show{
                                transform: rotate(-90deg);
                            }
                        }
                    }
                }
            }
            .order-detail{
                padding:28px 50px;
                background-color: @colorG;
                height: 0;
                overflow: hidden;
                // transition: .3s;
                &.arrow-show{
                    height: auto;
                }
                .detail-list{
                    border-top: solid 1px #d7d7d7;
                    padding : 38px 128px;
                    .detail-item{
                        margin-bottom: 16px;
                        display: flex;
                        align-items: center;
                        .item-name{
                            font-size: 13px;
                            margin-right: 10px;
                        }
                        .item-info{
                            font-size: 13px;
                            &.info-list{
                                display: flex;
                                flex-wrap: wrap;
                                .info-item{
                                    margin: 10px 10px 0 0;
                                    display: flex;
                                    align-items: center;
                                    .info-img{
                                        width: 28px;
                                        margin-right: 5px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .item-pay{
                padding: 26px 50px 72px;
                background-color: @colorG;
                .pay-way-title{
                    margin-bottom: 26px;
                    padding-bottom: 24px;
                    font-size: @fontG;
                    color: @colorB;
                    border-bottom: solid 1px #d7d7d7;
                    font-weight: 500;
                }
                .pay-platform{
                    .choose-platform-title{
                        font-size: @fontH;
                        color: @colorB;
                        margin-bottom: 20px;
                    }
                    .platform-list{
                        display: flex;
                        .platform-item{
                            width: 188px;
                            height: 64px;
                            cursor: pointer;
                            border: solid 1px #d7d7d7;
                            margin-right: 20px;
                            &.ali{
                                background: url(/imgs/pay/icon-ali.png) no-repeat center;
                                background-size: 103px 38px;
                            }
                            &.wechat{
                                background: url(/imgs/pay/icon-wechat.png) no-repeat center;
                                background-size: 103px 38px;
                            }
                            &.check-pay{
                                border-color: @colorA;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
