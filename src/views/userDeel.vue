<template>
    <div class="login">
        <div class="container">
            <div class="login-header">
                <mil-logo></mil-logo>
                <div class="header-text">
                    <p class="text-main">小米商城</p>
                    <p class="text-desc">让每个人都能享受科技的乐趣</p>
                </div>
            </div>
        </div>
        <div class="login-body">
            <div class="container">
                <!-- <login-layout></login-layout> -->
                <router-view></router-view>
                <!-- <div class="form-over"></div>
                <div class="form-layout">
                    <div class="layout-header">
                        <span class="layout-header-account layout-header-item">账号登录</span>
                        <span class="layout-header-scan layout-header-item">扫码登录</span>
                    </div>
                    <div class="layout-body">
                        <input type="text" placeholder="邮箱/手机号码/小米ID" class="input-item account-input"/>
                        <input type="password" placeholder="密码" class="input-item scan-input"/>
                        <input type="button" value="登录" class="login-input"/>
                        <div class="add-info">
                            <a href="javascript:;" class="other-login-way">手机短信登录/注册</a>
                            <div class="other-accident">
                                <a href="/#/register">立即注册</a>
                                <span class="divide">|</span>
                                <a href="javascript:;">忘记密码？</a>
                            </div>
                        </div>
                    </div>
                    <div class="layout-footer">
                        <fieldset class="other-type-way">
                            <legend class="way-text">其他方式登录</legend>
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
                </div> -->
            </div>
        </div>
        <div class="login-footer">
            <div class="footer-select">
                <ul class="select-list">
                    <li class="select-item">简体</li>|
                    <li class="select-item">繁体</li>|
                    <li class="select-item">English</li>|
                    <li class="select-item">常见问题</li>|
                    <li class="select-item">隐私政策</li>
                </ul>
            </div>
            <div class="footer-intro">
                mil-nokia版权所有-
                <span class="school-logo"></span>
                四川科技职业学院-四川省眉山市仁寿县视高bai经济开发区花海大道大学路1号
            </div>
        </div>
    </div>
</template>

<script>
import MilLogo from '../components/common/MilLogo';
import LoginLayout from '../components/common/LoginLayout';
export default {
    name: "login",
    components: {
        MilLogo,
        LoginLayout
    },
    data () {
        return {
            
        }
    }
}
</script>

<style scoped lang="less">
@import '../common/less/config.less';
.login{
    width: 100%;
    .container{
        width: @min-width;
        padding: 20px 0;
        margin: 0 auto;
        .login-header{
            width: 100%;
            display: flex;
            .header-text{
                display: flex;
                flex-wrap: wrap;
                align-content: center;
                p{
                    width: 75%;
                    display: block;
                    text-align: center;
                }
                .text-main{
                    font-size: 30px;
                    margin-bottom: 5px;
                }
                .text-desc{
                    font-size: 9px;
                    color: @colorC;
                }
            }
        }
    }
    .login-body{
        width: 100%;
        height: 588px;
        background: url(/imgs/login-banner.jpg) no-repeat center;
        .container{
            position: relative;
            margin: 0 auto;
            width: @min-width;
            height: 100%;
            // .form-layout{
            //     position: absolute;
            //     z-index: 28;
            //     right: 0;
            //     top: -28px;
            //     width: 410px;
            //     height: 556px;
            //     border: solid 1px #333;
            //     background-color: #fff;
            //     .layout-header{
            //         padding: 27px 0 24px;
            //         text-align: center;
            //         font-size: @fontE;
            //         .layout-header-item{
            //             padding: 2px 33px;
            //         }
            //         .layout-header-account{
            //             border-right: solid 1px #333;
            //         }
            //     }
            //     .layout-body{
            //         display: flex;
            //         flex-wrap: wrap;
            //         justify-content: center;
            //         font-size: 14px;
            //         padding: 0 30px;
            //         .input-item{
            //             width: 100%;
            //             padding: 13px 15px;
            //             border: 1px solid #e0e0e0;
            //             margin-bottom: 14px;
            //             outline: none;
            //             &::placeholder{
            //                 color: #9698a8;
            //             }
            //         }
            //         .login-input{
            //             width: 100%;
            //             background-color: #ff6700;
            //             color: #fff;
            //             height: 50px;
            //             outline: none;
            //             border: none;
            //             cursor: pointer;
            //             margin-bottom: 14px;
            //         }
            //         .add-info{
            //             width: 100%;
            //             display: flex;
            //             justify-content: space-between;
            //             align-items: center;
            //             a{
            //                 text-decoration: none;
            //                 color: #999999;
            //             }
            //             .other-login-way{
            //                 color: @colorA;
            //             }
            //             .other-accident{
            //                 display: flex;
            //                 align-items: center;
            //                 a{
            //                     padding: 0 4px;
            //                 }
            //                 .divide{
            //                     line-height: 17px;
            //                 }
            //             }
            //         }
            //     }
            //     .layout-footer{
            //         padding: 143px 30px 0;
            //         .other-type-way{
            //             border: none;
            //             border-top: solid 1px #e0e0e0;
            //             .way-text{
            //                 text-align: center;
            //                 color: #bbb;
            //             }
            //         }
            //         .way-icons{
            //             display: flex;
            //             justify-content: space-around;
            //             align-content: center;
            //             padding: 0 66px;
            //             .way-icon{
            //                 font-size: 30px;
            //                 cursor: pointer;
            //                 filter: grayscale(100%);
            //                 &:hover{
            //                     filter: none;
            //                 }
            //             }
            //         }
            //     }
            // }
            // .form-over{
            //     position: absolute;
            //     z-index: 20;
            //     right: 20px;
            //     top: -48px;
            //     width: 410px;
            //     height: 556px;
            //     border: double 1px #333;
            //     background-color: #fff;
            //     opacity: 0.5;
            // }
        }
    }
    .login-footer{
        width: 100%;
        color: #757575;
        padding: 100px 0 20px;
        .footer-select{
            .select-list{
                display: flex;
                justify-content: center;
                .select-item{
                    padding: 0 10px;
                    cursor: pointer;
                    &:hover{
                        color: #333;
                    }
                }
            }
        }
        .footer-intro{
            padding: 10px 0;
            display: flex;
            justify-content: center;
            align-content: center;
            .school-logo{
                display: inline-block;
                width: 20px;
                height: 20px;
                background: url(/imgs/school-logo.jpg) no-repeat center;
                background-size: contain;
                margin: 0 5px;
            }
        }
    }
}
</style>
