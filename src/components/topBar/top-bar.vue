<template>
    <div class="top-bar">
        <div class="logo">
            <img class="logo-img" src="@/assets/images/logo.svg" alt="logo" />
            <p class="logo-name">mint</p>
        </div>
        <div class="menu">
            <CommonButton class="menu-mw" state="commonPrimary">
                留言墙
            </CommonButton>
            <CommonButton class="menu-pw" state="commonSecondary">
                照片墙
            </CommonButton>
        </div>
        <div class="user">
            <div class="user-head"></div>
        </div>
    </div>
</template>

<script setup></script>

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
            padding-left: 10px;
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
        .menu-mw {
            margin-right: 24px;
            @media (max-width: 768px) {
                padding: 0 16px;
                height: 32px;
                font-size: 14px;
            }
        }
    }
}
</style>
