<template>
    <div class="product">
        <product-params buyText="立刻购买"></product-params>
        <div class="bg-banner">
            <ul class="product-trait-list">
                <li class="product-trait-item">全球首款双频 GP</li>|
                <li class="product-trait-item">骁龙845</li>|
                <li class="product-trait-item">AI 变焦双摄</li>|
                <li class="product-trait-item">红外人脸识别</li>
            </ul>
            <p class="product-price">
                ¥<span class="price-num">2999</span>
            </p>
        </div>
        <div class="bg-banner-two"></div>
        <div class="bg-banner-three"></div>
        <div class="item-swiper">
            <swiper :options="swiperOption">
                <swiper-slide><img src="/imgs/product/gallery-2.png" alt=""></swiper-slide>
                <swiper-slide><img src="/imgs/product/gallery-3.png" alt=""></swiper-slide>
                <swiper-slide><img src="/imgs/product/gallery-4.png" alt=""></swiper-slide>
                <swiper-slide><img src="/imgs/product/gallery-5.jpg" alt=""></swiper-slide>
                <swiper-slide><img src="/imgs/product/gallery-6.jpg" alt=""></swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
            <p class="desc">小米8 AI变焦双摄拍摄</p>
      </div>
      <div class="video-convey">
          <h1 class="convey-title">
              60帧超慢动作摄影<br/>
              慢慢回味每一瞬间的精彩
          </h1>
          <p class="convey-desc">
              后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br/>
              更能AI 精准分析视频内容，15个场景智能匹配背景音效。
          </p>
          <div class="video-bg" @click="upVideoDo"></div>
          <div ref="overLayout" class="over-layout" v-show="isPlayVideo"></div>
          <div class="video-box" :class="{'up-video': isPlayVideo,'off-video': offDo}">
              <span class="close-icon" @click="offVideoDo">×</span>
              <video ref="videoDo" src="/imgs/product/video.mp4" muted autoplay controls="controls"></video>
          </div>
      </div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import ProductParams from '../components/common/ProductParams';
export default {
    name: 'product',
    components: {
        ProductParams,
        Swiper,
        SwiperSlide
    },
    directives: {
        swiper: directive
    },
    data () {
        return {
            swiperOption:{
                autoplay: true,
                loop: true,
                slidesPerView:3,
                spaceBetween: 30,
                freeMode: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable :true,
                }
            },
            isPlayVideo: false,
            offDo: false
        }
    },
    methods: {
        upVideoDo () {
            this.offDo = false;
            this.isPlayVideo = true;
            this.$refs.videoDo.play();
            
        },
        offVideoDo () {
            this.isPlayVideo = false;
            this.offDo = true;
            this.$refs.videoDo.currentTime = 0;
            this.$refs.videoDo.pause();
            // this.$refs.videoDo.volume = 0;
        }
    }
}
</script>

<style scoped lang="less">
@import '../common/less/config.less';
@keyframes playVideo {
    from {
        top: -100%;
        opacity: 0;
    }
    to {
        top: 50%;
        opacity: 1;
    }
}
@keyframes offVideo {
    from {
        top: 50%;
        opacity: 1;
    }
    to {
        top: -100%;
        opacity: 0;
    }
}
.product{
    width: 100%;
    min-width: @min-width;
    .bg-banner{
        width: 100%;
        height: 718px;
        background: url(/imgs/product/product-bg-1.png) no-repeat center;
        background-size: cover;
        // background-attachment: fixed;
        padding-top: 55px;
        .product-trait-list{
            display: flex;
            justify-content: center;
            margin: 21px 0 40px;
            .product-trait-item{
                padding: 0 15px;
            }
        }
        .product-price{
            font-size: 30px;
            color: @colorB;
            text-align: center;
            .price-num{
                margin-left: 7px;
            }
        }
    }
    .bg-banner-two{
        width: 100%;
        height: 480px;
        background: url(/imgs/product/product-bg-2.png) no-repeat center;
        background-size: 1226px 397px;
    }
    .bg-banner-three{
        width: 100%;
        height: 638px;
        background: url(/imgs/product/product-bg-3.png) no-repeat center;
        background-size: cover;
    }
    .item-swiper{
        margin:36px auto 30px;
        img{
          width:100%;
        }
        .desc{
          font-size:18px;
          color:#333333;
          text-align:center;
          padding-top: 28px;
        }
    }
    .video-convey{
        width: 100%;
        height: 1044px;
        background-color: #070707;
        .convey-title,.convey-desc{
            color: #fff;
            text-align: center;
        }
        .convey-title{
            padding-top: 82px;
            font-size: 60px;
        }
        .convey-desc{
            font-size: 24px;
            margin-bottom: 58px;
            line-height: 30px;
        }
        .video-bg{
            background: url(/imgs/product/gallery-1.png) no-repeat center;
            background-size: contain;
            width: 1226px;
            height: 540px;
            margin: 0 auto;
            cursor: pointer;
        }
        .over-layout{
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: @colorC;
            opacity: 0.4;
        }
        .video-box{
            position: fixed;
            top: -100%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 1000px;
            height: 536px;
            box-shadow: 7px 7px 9px rgba(0,0,0,.4);
            opacity: 0;
            &.up-video{
                top: 50%;
                opacity: 1;
                animation: playVideo 0.7s;
            }
            &.off-video{
                opacity: 0;
                top: -100%;
                animation: offVideo 0.7s;
            }
            .close-icon{
                position: absolute;
                z-index: 28;
                top: 10px;
                right: 20px;
                color: #fff;
                font-size: 28px;
                cursor: pointer;
            }
            video{
                width: 100%;
                height: 100%;
                outline: none;
                object-fit: cover;
                
            }
        }
    }
}
</style>
