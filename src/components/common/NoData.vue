<template>
    <div class="no-data">
        <div class="wrap">
            <div class="container">
                <div class="pagination">
                    <div class="pagination-switch">
                        <button class="iconfont icon-jiantou-copy-copy prev"></button>
                        <ul class="order-page-list">
                            <li class="order-page-item">1</li>
                        </ul>
                        <button class="iconfont icon-jiantou-copy-copy next"></button>
                    </div>
                </div>
                <div class="no-data">
                    <img class="no-data-img" src="/imgs/icon-no-data.png" alt="没有订单记录"/>
                    <p>当前暂无提交的订单记录</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'no-data',
    data () {
        return {

        }
    }
    
}
</script>

<style scoped lang="less">
@import '../../common/less/config.less';
.no-data{
    .wrap{
        padding: 33px 0 110px;
        background-color: @colorJ;
        .container{
            width: @min-width;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            .pagination{
                width: 100%;
                padding: 2px 5px;
                display: flex;
                justify-content: flex-end;
                .pagination-switch{
                    display: flex;
                    .prev,.next{
                        color: #C0C4CC;
                        margin: 0 5px;
                        outline: none;
                        border: none;
                        background-color: transparent;
                        font-size: 12px;
                    }
                    .prev{
                        transform: rotate(90deg);
                    }
                    .next{
                        transform: rotate(-90deg);
                    }
                    .order-page-list{
                        width: 30px;
                        height: 30px;
                        border-radius: 2px;
                        text-align: center;
                        line-height: 30px;
                        margin: 0 5px;
                        padding: 0 4px;
                        background-color: @colorA;
                        color: @colorG;
                    }
                }
            }
            .no-data{
                margin: 52px 0;
                font-size: @fontG;
                color: @colorD;
                .no-data-img{
                    width: 240px;
                    height: 180px;
                    margin-bottom: 30px;
                }
            }
        }
    }
}
</style>