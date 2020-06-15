<template>
    <div class="order">
        <my-order-header></my-order-header>
        <router-view/>
        <my-nav-footer></my-nav-footer>
    </div>
</template>

<script>
import OrderHeader from '../components/common/orderHeader';
import NavFooter from '../components/common/navFooter';
export default {
    name: "order",
    components: {
        'my-order-header': OrderHeader,
        'my-nav-footer': NavFooter
    },
    data () {
        return {
            
        }
    }
}
</script>

<style scoped lang="less">

</style>
