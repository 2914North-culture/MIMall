<template>
    <div class="order-list">
        <no-data v-if="!isLoading && !list.length"></no-data>
        <loading v-if="isLoading"></loading>
        <div class="order" v-for="(order,index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{order.createTime}}
                <span>|</span>
                {{order.receiverName}}
                <span>|</span>
                订单号：{{order.orderNo}}
                <span>|</span>
                {{order.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{order.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list" v-for="(item,i) in order.orderItemVoList" :key="i">
                  <div class="good-img">
                    <a :href="'/#/detail/' + item.productId">
                        <img v-lazy="item.productImage" alt="产品图"/>
                    </a>
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{item.productName}}</div>
                    <div class="p-money">{{item.totalPrice + 'X' + item.quantity}}元</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order.status == 20">
                <a href="javascript:;">{{order.statusDesc}}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}}</a>
              </div>
            </div>
        </div>
        <el-pagination
            class="pagination"
            background
            layout="prev, pager, next"
            :pageSize="pageSize"
            :total="total"
            @current-change="handleChange"
        >
        </el-pagination>
    </div>
</template>

<script>
import NoData from '../components/common/NoData';
import Loading from '../components/common/Loading';
import { Pagination } from 'element-ui';
export default {
    name: "order-list",
    components: {
        NoData,
        Loading,
        [Pagination.name]: Pagination
    },
    data () {
        return {
            isLoading: true,
            list: {},
            pageSize: 10,
            pageNum: 1,
            total: 0
        }
    },
    methods: {
        getOrderList () {
            this.axios.get('/orders',{
                params: {
                    pageSize: this.pageSize,
                    pageNum: this.pageNum
                }
            }).then(res => {
                this.list = res.list;
                this.total = res.total;
                this.isLoading = false;
            }).catch(err => {
                this.isLoading = false;
            })
        },
        goPay (orderId) {
            this.$router.push({
                path: '/order/pay',
                query: {
                    orderId
                }
            })
        },
        handleChange (pageNum) {
            this.pageNum = pageNum;
            this.getOrderList();
        }
    },
    mounted () {
        this.getOrderList();
    }
}
</script>

<style lang="less">
@import '../common/less/config.less';
.order-list{
    width: 100%;
    .pagination{
        text-align: right;
        padding: 0 52px;
        .el-pager li:not(.disabled).active{
            background-color: #FF6600;
            cursor: pointer;
        }
    }
    .order{
        border: solid 1px @colorF;
        background-color:@colorG;
        margin-bottom:31px;
        &:last-child{
            margin-bottom:0;
        }
        .order-title{
            height: 74px;
            line-height: 74px;
            background-color:@colorK;
            padding:0 43px;
            font-size:16px;
            color:@colorC;
            display: flex;
            justify-content: space-between;
            .item-info{
                span{
                    margin:0 9px;
                }
            }
            .money{
                font-size:26px;
                color:@colorA;
            }
        }
        .order-content{
            padding:18px 43px 0;
            .good-box{
                width:88%;
                .good-list{
                    display: flex;
                    align-items: center;
                    .good-img{
                        width:112px;
                        margin-right: 20px;
                        img{
                            width:66%;
                        }
                    }
                    .good-name{
                        font-size:@fontJ;
                        color:@colorB;
                        display: flex;
                        .p-name{
                            margin-right:28px;
                        }
                    }
                }
            }
            .good-state{
                padding: 28px 0 28px 15px;
                font-size: 20px;
                color:@colorA;
                a{
                    color:@colorA;
                    font-size: @fontJ;
                }
            }
        }
    }
}
</style>
