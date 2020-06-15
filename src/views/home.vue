<template>
    <div class="home">
      <my-nav-header></my-nav-header>
      <router-view/>
      <my-nav-footer></my-nav-footer>
    </div>
</template>

<script>
import NavHeader from '../components/common/navHeader';
import NavFooter from '../components/common/navFooter';
export default {
    name: "home",
    components: {
      'my-nav-header': NavHeader,
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
