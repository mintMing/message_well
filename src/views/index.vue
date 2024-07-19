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
    </div>
</template>

<script setup></script>

<style scoped lang="scss">
.wall-index {
    .bg-view {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 0;
        height: 800px;
    }
}
</style>
