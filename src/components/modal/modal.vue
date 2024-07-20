<template>
    <Transition name="AniModal">
        <div class="modal" v-if="isVisible">
            <div class="modal-head">
                <p class="modal-name">{{ title }}</p>
                <span class="iconfont icon-guanbi" @click="closeModal"></span>
            </div>
            <main class="modal-main">
                <slot></slot>
                <!-- <div class="slot"></div> -->
            </main>
        </div>
    </Transition>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
    title: {
        default: "标题",
    },
    isVisible: {
        default: false,
    },
});

// 外部关闭模态框
const emit = defineEmits(["close"]);
const closeModal = () => {
    console.log("modal");
    emit("close");
};

onMounted(() => {
    // closeModal();
});
</script>

<style scoped lang="scss">
.AniModal {
    &-enter {
        &-from {
            transform: translateX(360px);
        }
        &-active {
            transition: $tr ease-in;
        }
        &-to {
            transform: translateX(0);
        }
    }
    &-leave {
        &-from {
            transform: translateX(0);
        }
        &-active {
            transition: $tr ease-in;
        }
        &-to {
            transform: translateX(360px);
        }
    }
}

.modal {
    width: 360px;
    height: 100%;
    position: fixed;
    right: 0;
    top: 52px;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(10px);

    .modal-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: $padding-20;
        box-sizing: border-box;
        .modal-name {
            font-size: 16px;
            color: $gray-1;
            font-weight: 600;
        }
        .icon-guanbi {
            color: gray-2;
            cursor: pointer;
            padding-left: 8px;
        }
    }
    .modal-main {
        height: 100%;
        overflow-y: auto;
        padding-bottom: 116px;
        box-sizing: border-box;
        margin: 2px;
    }
    .slot {
        height: 1200px;
        border: 1px solid #333;
        width: 200px;
    }
    .modal-main::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 4px;
        /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
    }
    .model-slot:-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.2);
    }
    .model-slt::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        border-radius: 4px;
        background: rgba(0, 0, 0, 0);
    }
}
</style>
