<template>
    <div class="wall-index">
        <topBar></topBar>
        <video
            class="bg-view"
            src="@/assets/images/qm1.mp4"
            autoplay="autoplay"
            loop="loop"
        ></video>
        <router-view></router-view>
        <footBar></footBar>
    </div>
</template>

<script setup>
import { signipApi } from "../api/index.js";
import useNewCard from "../store/modules/newCard.js";
import { onMounted } from "vue";

const useStore = useNewCard();

const getUserId = () => {
    signipApi().then((res) => {
        const cleanIp = res.ip.replace("::ffff:", "");
        useStore.setUser(cleanIp);
        // console.log(useStore.getUser()); // 有值
    });
};


getUserId();
</script>

<style scoped lang="scss">
.wall-index {
    .bg-view {
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        height: 800px;
    }
}
</style>
