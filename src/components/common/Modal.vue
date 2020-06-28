<template>
    <transition name="slide">
        <div class="modal" v-show="isShowModal">
            <div class="mask"></div>
            <div class="modal-box">
                <div class="box-header">
                    <span class="header-text">{{title}}</span>
                    <span class="header-icon" title="取消" @click="$emit('fork')">×</span>
                </div>
                <div class="box-body">
                    <slot name="body"></slot>
                </div>
                <div class="box-footer">
                    <a href="javascript:;" v-if="btnType == 1" class="sure-btn btn" @click="$emit('sureBtn')">{{sureText}}</a>
                    <a href="javascript:;" v-else-if="btnType == 2" class="cancel-btn btn" @click="$emit('cancelBtn')">{{cancelText}}</a>
                    <div class="btn-all" v-else>
                        <a href="javascript:;" class="sure-btn btn" @click="$emit('sureBtn')">{{sureText}}</a>
                        <a href="javascript:;" class="cancel-btn btn" @click="$emit('cancelBtn')">{{cancelText}}</a>
                    </div>
                </div>
            </div>
        </div>`
    </transition>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        // 弹框类型 小（small） 中 （middle） 大 （large） 表单 （form）
        modalType: {
            type: String,
            default: 'form'
        },
        // 弹框标题
        title: {
            type: String,
            default: '标题'
        },
        // 按钮类型 1 （确定） 2 （取消） 3 （确定，取消）
        btnType: {
            type: String,
            default: '3'
        },
        sureText: {
            type: String,
            default: '确定'
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        isShowModal: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {

        }
    }
}
</script>

<style scoped lang="less">
@import '../../common/less/modal.less';
</style>