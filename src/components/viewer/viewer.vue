<template>
    <Transition name="view">
        <div class="viewer" v-if="isView">
            <div class="bg"></div>
            <div class="viewer-photo">
                <img
                    class="photo-img"
                    src="../../../../state/0.jpg"
                    alt="photo"
                />
            </div>
            <div class="switch sw-left">
                <span class="iconfont icon-xiangzuo1"></span>
            </div>
            <div class="switch sw-right">
                <span class="iconfont icon-xiangyou1"></span>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { photo } from "../../../mock/index.js";
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
    photos: {
        default: [],
        type: Array,
    },
    curImgIndex: {
        type: Number,
        default: 1,
    },
    isView: {
        default: false,
        type: Boolean,
    },
});

const photoPath = computed(() => {
    return `../../../../state/${props.photo.imgurl}.jpg`;
});
</script>

<style scoped lang="scss">
.view {
    &-enter {
        &-from {
            opacity: 0;
        }
        &-active {
            transition: $tr ease-in;
        }
        &-to {
            opacity: 1;
        }
    }
    &-leave {
        &-from {
            opacity: 1;
        }
        &-active {
            transition: $tr ease-in;
        }
        &-to {
            opacity: 0;
        }
    }
}

.viewer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid red;
    padding-right: 350px;
    box-sizing: border-box;
    .bg {
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(20px);
        height: 100%;
        width: 100%;
    }
    .viewer-photo {
        position: absolute;
        padding: 82px 454px 0px 96px;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        display: flex;
        justify-content: center;
        img {
            max-width: 100%;
        }
    }
    .switch {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background-color: $gray-3;
        color: $gray-10;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.5;
        transition: $tr;
        cursor: pointer;
        .iconfont {
            font-size: 36px;
        }
        &:hover {
            opacity: 1;
        }
    }
    .sw-left {
        left: 20px;
    }
    .sw-right {
        right: 380px;
    }
}
</style>
