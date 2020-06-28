<template>
    <div class="login-layout">
        <user-layout @loginTo="loginTo"></user-layout>
    </div>
</template>

<script>
import UserLayout from './UserLayout';
import {mapActions} from 'vuex';
export default {
    name: "login-layout",
    components: {
        UserLayout
    },
    data () {
        return {
            
        }
    },
    methods: {
        loginTo (username,password) {
            this.axios.post('/user/login',{
                username,
                password
            }).then(res => {
                this.$cookie.set('userId',res.id,{expires: 'Session'});
                this.$store.dispatch('saveUsername',res.username);
                this.saveUsername(res.username);
                // this.$router.push('/index');
                this.$router.push({
                    name: 'index',
                    params: {
                        from: 'login'
                    }
                })
            })
        },
        ...mapActions(['saveUsername'])
    }
}
</script>

<style scoped lang="less">

</style>
