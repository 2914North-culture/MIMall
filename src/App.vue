<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: "App",
  data () {
    return {
      res: {}
    }
  },
  watch: {
    '$route': function(to,from){
      if(to != from){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        window.pageYOffset = 0;
      }
    }
  },
  methods: {
    getUser () {
      this.axios.get('/user').then((res={}) => {
        this.$store.dispatch('saveUsername',res.username);
      })
    },
    getCartCount () {
      this.axios.get('/carts/products/sum').then((res=0) => {
        this.$store.dispatch('saveCartProduct',res);
      })
    }
  },
  created () {
    this.$nextTick(() => {
      if(this.$cookie.get('userId')){
        this.getUser();
        this.getCartCount();
      }
    })
  }
}
</script>

<style lang="less">
@import './common/less/reset.less';
@import './common/less/config.less';
</style>
