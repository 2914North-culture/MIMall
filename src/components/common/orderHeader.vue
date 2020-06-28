<template>
    <div class="order-header">
        <div class="container">
            <mil-logo></mil-logo>
            <h2 class="order-text">
                {{orderTitle}}
                <span class="order-desc">{{orderDesc}}</span>
            </h2>
        </div>
    </div>
</template>

<script>
import MilLogo from './MilLogo';
import ServiceBar from '../../components/common/ServiceBar';
export default {
    name: "order-header",
    components: {
        MilLogo,
        ServiceBar
    },
    props: {
        orderTitle: String,
        orderDesc: String
    },
    data () {
        return {
            
        }
    }
}
</script>

<style scoped lang="less">
@import '../../common/less/config.less';
.order-header{
    border-bottom: solid 2px @colorA;
    .container{
        width: @min-width;
        margin: 0 auto;
        padding: 30px 0;
        display: flex;
        align-items: center;
        .order-text{
            margin-left: 55px;
            font-size: @fontC;
            color: @colorB;
            .order-desc{
                font-size: 14px;
                color: #999999;
                margin-left: 17px;
                font-weight: 200;
            }
        }
    }
}
</style>
