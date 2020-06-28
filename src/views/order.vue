<template>
    <div class="order">
        <order-header :orderTitle="orderTitle" :orderDesc="orderDesc"></order-header>
        <router-view/>
        <service-bar></service-bar>
        <my-nav-footer></my-nav-footer>
    </div>
</template>

<script>
import OrderHeader from '../components/common/OrderHeader';
import ServiceBar from '../components/common/ServiceBar';
import NavFooter from '../components/common/NavFooter';
export default {
    name: "order",
    components: {
        OrderHeader,
        ServiceBar,
        'my-nav-footer': NavFooter
    },
    data () {
        return {
            orderTitle: '',
            orderDesc: ' '
        }
    },
    mounted () {
        let path = this.$route.path;
        if(path == '/order/list'){
            this.orderTitle = '订单列表';
            this.orderDesc = '请谨防钓鱼链接或诈骗电话，了解更多';
        }else if(path == '/order/confirm'){
            this.orderTitle = '订单确认';
            this.orderDesc = '请认真填写收货地址';
        }else if(path == '/path/pay'){
            this.orderTitle = '订单支付';
            this.orderDesc = '请谨防钓鱼链接或诈骗电话，了解更多';
        }else{
            this.orderTitle = '订单支付';
            this.orderDesc = '请谨防钓鱼链接或诈骗电话，了解更多';
        }
    },
    watch: {
        '$route.path': function(to,from){
            if(to == '/order/list'){
                this.orderTitle = '订单列表';
                this.orderDesc = '请谨防钓鱼链接或诈骗电话，了解更多';
            }else if(to == '/order/confirm'){
                this.orderTitle = '订单确认';
                this.orderDesc = '请认真填写收货地址';
            }else if(to == '/order/pay'){
                this.orderTitle = '订单支付';
                this.orderDesc = '请谨防钓鱼链接或诈骗电话，了解更多';
            }else{
                this.orderTitle = '订单支付';
                this.orderDesc = '请谨防钓鱼链接或诈骗电话，了解更多';
            }
        }
    }
}
</script>

<style scoped lang="less">
@import '../common/less/config.less';
.order{
    width: 100%;
    min-width: @min-width;
}
</style>
