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
    </div>
</template>

<script setup>
import { wallType, label } from "../../../mock/data.js";
import { ref, computed } from "vue";
import { note } from "../../../mock/index.js";

const id = ref(0); // 留言墙和照片墙切换
const labelIdx = ref(-1); // 对应的标签
// 标签的切换
const selectcNode = (index) => {
    labelIdx.value = index;
};
console.log(note.data)
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
}
</style>
