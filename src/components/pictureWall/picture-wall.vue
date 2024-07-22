<template>
    <div class="photo-card">
        <img class="photo-img" :src="photoPath" alt="photo" />
        <div class="photo-bg"></div>
        <div class="photo-like">
            <span class="iconfont icon-aixin"></span>
            <span class="like-data">{{ props.photo.like }}</span>
        </div>
    </div>
</template>

<script setup>
import { photo } from "../../../mock/index.js";
import { ref, computed, onMounted, onUnmounted } from "vue";

const photoPath = computed(() => {
    return `../../../../state/${props.photo.imgurl}.jpg`;
});

const props = defineProps({
    photo: {
        default: () => {},
    },
});

// console.log(props.photo.imgurl);
</script>

<style scoped lang="scss">
.photo-card {
    position: relative;
    .photo-img {
        // width: 100%;
        max-width: 300px;
        max-height: 500px;
    }
    .photo-bg {
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.2);
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: $tr;
    }
    .photo-like {
        position: absolute;
        left: $padding-8;
        top: $padding-8;
        background-color: rgba(255, 255, 255, 0.8);
        height: 28px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        backdrop-filter: blur(10px);
        border-radius: 20px;
        opacity: 0;
        transition: $tr;
        cursor: pointer;
        .icon-aixin {
            color: $gray-3;
            padding-right: $padding-4;
        }
        .like-data {
            color: $gray-1;
        }
    }
    &:hover {
        .photo-bg {
            opacity: 1;
        }
        .photo-like {
            opacity: 1;
        }
    }
}
</style>
