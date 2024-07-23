<template>
    <div class="photo-card">
        <img
            class="photo-img"
            :src="baseUrl + props.photo.img_url"
            alt="photo"
            @click="toDetailCard"
        />
        <div class="photo-bg"></div>
        <div class="photo-like" @click="iLike">
            <span
                class="iconfont icon-aixin"
                :class="props.note.islike.count > 0"
            ></span>
            <span class="like-data">{{ props.photo.like.count }}</span>
        </div>
        <p>{{ props.photo.img_url }}</p>
    </div>
</template>

<script setup>
// import { photo } from "../../../mock/index.js";
import { ref, computed } from "vue";

const baseUrl = ref(import.meta.env.VITE_SERVE);

const props = defineProps({
    photo: {
        default: () => {},
    },
});

const emit = defineEmits(["nodeToDetail"]);

const toDetailCard = () => {
    emit("nodeToDetail");
};

const iLike = () => {
    if (props.note.islike.count == 0) {
        const reqData = {
            wall_id: props.note.id,
            user_id: user,
            type: 0,
            moment: new Date(),
        };
        insertFeedbackApi(reqData).then(() => {
            props.note.like.count++;
            props.note.islike.count++;
        });
    }
};

console.log("picture ：" + props.photo);
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
        .islike {
            color: $like;
        }
        .photo-like {
            opacity: 1;
        }
    }
}
</style>
