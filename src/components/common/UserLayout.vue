<template>
    <div class="user-layout">
        <div class="form-over"></div>
        <div class="form-layout">
            <div class="layout-header">
                <span class="layout-header-account layout-header-item">{{headerText[0]}}</span>
                <span class="layout-header-scan layout-header-item">{{headerText[1]}}</span>
            </div>
            <div class="layout-body">
                <input type="text" placeholder="用户名" v-model="username" class="input-item account-input"/>
                <input type="password" placeholder="密码" v-model="password" class="input-item scan-input"/>
                <input type="password" placeholder="电子邮箱" v-model="email" class="input-item scan-input" v-if="layoutType == 'register'"/>
                <input type="button" value="登录" class="user-input" v-if="layoutType == 'login'" @click="$emit('loginTo',username,password)"/>
                <input type="button" value="注册" class="user-input" v-if="layoutType == 'register'" @click="$emit('registerTo',username,password,email)"/>
                <div class="add-info">
                    <a href="javascript:;" class="other-user-way">手机短信登录/注册</a>
                    <div class="other-accident">
                        <a href="/#/userdeel/register" v-if="layoutType == 'login'">立即注册</a>
                        <a href="/#/userdeel/login" v-if="layoutType == 'register'">立即登录</a>
                        <span class="divide"  v-if="layoutType == 'login'">|</span>
                        <a href="javascript:;" v-if="layoutType == 'login'">忘记密码？</a>
                    </div>
                </div>
            </div>
            <div class="layout-footer">
                <fieldset class="other-type-way">
                    <legend class="way-text" v-if="layoutType == 'login'">其他方式登录</legend>
                    <legend class="way-text" v-if="layoutType == 'register'">其他方式注册</legend>
                </fieldset>
                <div class="way-icons">
                    <svg class="icon way-icon" aria-hidden="true">
                        <use xlink:href="#icon-QQ1"></use>
                    </svg>
                    <svg class="icon way-icon" aria-hidden="true">
                        <use xlink:href="#icon-weixin"></use>
                    </svg>
                    <svg class="icon way-icon" aria-hidden="true">
                        <use xlink:href="#icon-zhifubao"></use>
                    </svg>
                    <svg class="icon way-icon" aria-hidden="true">
                        <use xlink:href="#icon-weibo1"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'user-layout',
    props: {
        // 面板用于登录（user）/注册 (register)
        layoutType: {
            type: String,
            default: 'login'
        },
        headerText: {
            type: Array,
            default: () => ['账号登录','扫码登录']
        }
    },
    data () {
        return {
            username: '',
            password: '',
            email: ''
        }
    }
}
</script>

<style scoped lang="less">
@import '../../common/less/config.less';
.user-layout{
    position: absolute;
    right: 0;
    top: -28px;
    .form-layout{
        position: relative;
        z-index: 28;
        width: 410px;
        height: 556px;
        border: solid 1px #333;
        background-color: #fff;
        .layout-header{
            padding: 27px 0 24px;
            text-align: center;
            font-size: @fontE;
            .layout-header-item{
                padding: 2px 33px;
            }
            .layout-header-account{
                border-right: solid 1px #333;
            }
        }
        .layout-body{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            font-size: 14px;
            padding: 0 30px;
            .input-item{
                width: 100%;
                padding: 13px 15px;
                border: 1px solid #e0e0e0;
                margin-bottom: 14px;
                outline: none;
                &::placeholder{
                    color: #9698a8;
                }
            }
            .user-input{
                width: 100%;
                background-color: #ff6700;
                color: #fff;
                height: 50px;
                outline: none;
                border: none;
                cursor: pointer;
                margin-bottom: 14px;
                &:hover{
                    background-color: #f25807;
                }
            }
            .add-info{
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                a{
                    text-decoration: none;
                    color: #999999;
                }
                .other-user-way{
                    color: @colorA;
                }
                .other-accident{
                    display: flex;
                    align-items: center;
                    a{
                        padding: 0 4px;
                    }
                    .divide{
                        line-height: 17px;
                    }
                }
            }
        }
        .layout-footer{
            padding: 143px 30px 0;
            .other-type-way{
                border: none;
                border-top: solid 1px #e0e0e0;
                .way-text{
                    text-align: center;
                    color: #bbb;
                }
            }
            .way-icons{
                display: flex;
                justify-content: space-around;
                align-content: center;
                padding: 0 66px;
                .way-icon{
                    font-size: 30px;
                    cursor: pointer;
                    filter: grayscale(100%);
                    &:hover{
                        filter: none;
                    }
                }
            }
        }
    }
    .form-over{
        position: absolute;
        z-index: 20;
        right: 20px;
        top: -28px;
        width: 410px;
        height: 556px;
        border: double 1px #333;
        background-color: #fff;
        opacity: 0.5;
    }
}
</style>