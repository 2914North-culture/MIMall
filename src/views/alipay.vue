<template>
    <div class="ali-pay">
        <loading></loading>
        <div class="form" v-html="content"></div>
    </div>
</template>

<script>
import Loading from '../components/common/Loading';
export default {
    name: "ali-pay",
    components: {
        Loading
    },
    data () {
        return {
            content: '',

        }
    },
    methods: {
        paySubmit () {
            this.axios.post('/pay',{
                orderId: this.$route.query.orderId,  // 订单号
                orderName: 'Vue小米商城高仿项目（2914）',  //扫码支付时订单名称
                amount: 0.01,  //单位元
                payType: 1  //1支付宝，2微信
            }).then(res => {
                this.content = res.content;
                setTimeout(() => {
                    document.forms[0].submit();
                },100);
            })
        }
    },
    mounted () {
        this.paySubmit();
    }
}
</script>

<style scoped lang="less">

</style>
