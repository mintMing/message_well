<template>
    <div class="wall-message">
        <p class="title">{{ wallType[id].name }}</p>
        <p class="slogan">{{ wallType[id].slogan }}</p>
        <div class="label">
            <p
                class="label-list"
                :class="{ lbselected: labelIdx === -1 }"
                @click="selectcNode(-1)"
            >
                全部
            </p>
            <p
                class="label-list"
                v-for="(e, index) in label[id]"
                :key="index"
                :class="{ lbselected: labelIdx === index }"
                @click="selectcNode(index)"
            >
                {{ e }}
            </p>
        </div>
        <div class="card">
            <nodeCard
                v-for="(ele, index) in note.data"
                :key="index"
                :note="ele"
                class="card-inner"
            ></nodeCard>
        </div>
        <div class="add" :style="{ bottom: addBottom + 'px' }">
            <span class="iconfont icon-tianjia"></span>
        </div>
    </div>
</template>

<script setup>
import { wallType, label } from "../../../mock/data.js";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { note } from "../../../mock/index.js";
import { debounce } from "../../utils/index.js";

const id = ref(0); // 留言墙和照片墙切换
const labelIdx = ref(-1); // 对应的标签
const addBottom = ref(30); // add按钮距离底部高度

// 标签的切换
const selectcNode = (index) => {
    labelIdx.value = index;
};

/**
 * 动态调整主页添加留言的图标位置
 */
const scrollBottom = () => {
    const scrollTop =
        document.documentElement.scrollTop  || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    if (scrollTop + clientHeight + 230 >= scrollHeight) {
        console.log("before: "+addBottom.value);
        addBottom.value = (scrollTop + clientHeight + 230) - scrollHeight;
        console.log("after: "+addBottom.value);
    } else {
        addBottom.value = 30;
    }
};

const descrollBottom = debounce(scrollBottom, 10, false);

onMounted(() => {
    window.addEventListener("scroll", descrollBottom);
});

onUnmounted(() => {
    window.removeEventListener("scroll", descrollBottom);
});
</script>

<style scoped lang="scss">
.wall-message {
    min-height: 700px;
    padding-top: 52px;
    .title {
        padding-top: 48px;
        padding-bottom: $padding-8;
        font-size: 56px;
        color: $gray-1;
        text-align: center;
        font-weight: 600;
    }
    .slogan {
        color: $gray-2;
        text-align: center;
    }
    .label {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 40px;
        .label-list {
            padding: 0 14px;
            display: flex;
            align-items: center;
            height: 30px;
            // 减小上下抖动
            line-height: 28px;
            margin: $padding-4;
            color: $gray-2;
            box-shadow: border-box;
            // border-radius: 16px;
            // min-width: 16px;
            // @media (max-wdith: 768px) {
            //     margin: 2px;
            // }
        }
        .lbselected {
            color: $gray-1;
            font-weight: 600;
            border: 1px solid $gray-1;
            // border-radius: 14px;
            min-width: 16px;
            border-radius: 16px;
            // @media (max-wdith: 768px) {
            //     border-radius: 10px;
            // }
        }
    }
    .card {
        display: grid;
        border: 1px solid red;
        grid-template-columns: repeat(5, 1fr);
        justify-content: center;
        justify-items: center;
        // grid-auto-flow: row dense;
        padding-top: 28px;
        margin-left: 100px;
        margin-right: 100px;
        // width: 100%;
        // grid: 0;
        .card-inner {
            margin: 6px;
        }
    }
    @media (max-width: 1300px) {
        .card {
            grid-template-columns: repeat(3, 1fr);
        }
    }
    @media (max-width: 900px) {
        .card {
            grid-template-columns: repeat(1, 1fr);
        }
    }
    .add {
        width: 56px;
        height: 56px;
        background: $gray-1;
        box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
        border-radius: 28px;
        position: fixed;
        right: 30px;
        bottom: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: $tr;
        .icon-tianjia {
            color: $gray-10;
            font-size: 24px;
        }
    }
}
</style>
