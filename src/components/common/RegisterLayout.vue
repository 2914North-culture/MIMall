<template>
    <div class="register-layout">
        <user-layout layoutType="register" :headerText="['账号注册','扫码注册']" @registerTo="registerTo"></user-layout>
    </div>
</template>

<script>
import UserLayout from './UserLayout';
export default {
    name: "register-layout",
    components: {
        UserLayout
    },
    data () {
        return {
            
        }
    },
    methods: {
        registerTo (username,password,email) {
            this.axios.post('/user/register',{
                username,
                password,
                email
            }).then(res => {
                this.$router.push('/index');
                this.$message.success(`尊敬的${username},您已成功注册Mil账号!`);
            })
        }
    }
}
</script>

<style scoped lang="less">

</style>
