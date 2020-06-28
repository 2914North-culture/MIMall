<template>
    <div class="service-bar">
        <div class="container">
            <ul class="service-list">
                <li class="service-item">
                    <span class="service-setting service-icon"></span>
                    <span>预约维修服务</span>
                </li>
                <li class="service-item">
                    <span class="service-serven-day service-icon"></span>
                    <span>7天无理由退货</span>
                </li>
                <li class="service-item">
                    <span class="service-fifteen-day service-icon"></span>
                    <span>15天免费换货</span>
                </li>
                <li class="service-item">
                    <span class="service-post service-icon"></span>
                    <span>满150元包邮</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "service-bar",
    data () {
        return {
            
        }
    }
}
</script>

<style scoped lang="less">
@import '../../common/less/config.less';
.service-bar{
    width: 100%;
    background-color: #fff;
    .container{
        padding: 33px 0;
        width: @min-width;
        margin: 0 auto;
        .service-list{
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .service-item{
                width: 25%;
                display: flex;
                align-items: center;
                justify-content: center;
                border-right: solid 1px #e5e5e5;
                &:last-child{
                    border: none;
                }
                .service-icon{
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    margin-right: 8px;
                }
                .service-setting{
                    background: url(/imgs/icon-setting.png) no-repeat center;
                    background-size: contain;
                }
                .service-serven-day{
                    background: url(/imgs/icon-7day.png) no-repeat center;
                    background-size: contain;
                }
                .service-fifteen-day{
                    background: url(/imgs/icon-15day.png) no-repeat center;
                    background-size: contain;
                }
                .service-post{
                    background: url(/imgs/icon-post.png) no-repeat center;
                    background-size: contain;
                }
            }
        }
    }
}
</style>
