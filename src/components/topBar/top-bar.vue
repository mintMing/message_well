<template>
    <div class="top-bar">
        <div class="logo">
            <img class="logo-img" src="@/assets/images/logo.svg" alt="logo" />
            <p class="logo-name">mint</p>
        </div>
        <div class="menu">
            <CommonButton
                class="menu-mw"
                :state="id == 0 ? 'commonPrimary' : 'commonSecondary'"
                @click="changeWall(0)"
            >
                留言墙
            </CommonButton>
            <CommonButton
                class="menu-pw"
                :state="id == 1 ? 'commonPrimary' : 'commonSecondary'"
                @click="changeWall(1)"
            >
                照片墙
            </CommonButton>
        </div>
        <div class="user">
            <div class="user-head"></div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { monitorWindowSizeAndScroll } from "@/utils/test.js";

const route = useRoute();
const router = useRouter();

// 缓存路由参数
const id = computed(() => {
    return route.query.id;
});

// 切换
const changeWall = (val) => {
    router.push({
        query: {
            id: val,
        },
    });
};

onMounted(() => {
    monitorWindowSizeAndScroll();
});
</script>

<style scoped lang="scss">
.top-bar {
    width: 100%;
    height: 52px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .logo {
        display: flex;
        align-items: center;
        width: 300px;
        .logo-name {
            font-size: 20px;
            color: $gray-1;
            font-weight: 600;
            padding-left: 10px;
        }
        .logo-img {
            height: 30px;
            width: 30px;
            padding-left: 30px;
        }
        @media (max-wdith: 768px) {
            width: 200px;
            .logo-name {
                font-size: 16px;
            }
            .logo-img {
                height: 24px;
                width: 24px;
            }
        }
    }
    .user {
        width: 300px;
        display: flex;
        justify-content: flex-end;
        padding-right: 50px;
        .user-head {
            border-radius: 50%;
            height: 36px;
            width: 36px;
            background-image: linear-gradient(180deg, #7be7ff 2%, #1e85e2);
        }
        @media (max-width: 768px) {
            width: 200px;
            padding-right: 20px;
            .user-head {
                height: 30px;
                width: 30px;
            }
        }
    }
    .menu {
        display: flex;
        flex-wrap: nowrap; 
        .menu-mw, .menu-pw{
            // margin-right: 24px;

            @media (max-width: 830px) {
                transform: scale(0.7);
                // flex: 2;
                transition: $tr;
                // background: red;
            }
        }
    }
}
</style>
