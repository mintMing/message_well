<template>
    <div class="node-card" :style="{ width: width, backgroundColor:cardColor[noteVal.imgurl] }">
        <div class="top">
            <p class="time">{{ formatDate(noteVal.moment) }}</p>
            <p class="label">{{ labelData[noteVal.type][noteVal.label] }}</p>
        </div>
        <p class="message">{{ noteVal.message }}</p>
        <div class="foot">
            <div class="foot-left">
                <div class="icon">
                    <span class="iconfont icon-aixin"></span>
                    <span class="value">{{ noteVal.like }}</span>
                </div>
                <div class="icon">
                    <span class="iconfont icon-liuyan"></span>
                    <span class="value">{{ noteVal.comment }}</span>
                </div>
            </div>
            <div class="name">{{ noteVal.name }}</div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { label, cardColor } from "../../../mock/data.js";
import { formatDate } from "@/utils/tool.js";

const labelData = ref(label);

const props = defineProps({
    width: {
        default: "288px",
    },
    backgroundColor: {
        default: "rgba(252, 175, 162, 0.30);",
    },
    note: {
        default: () => {},
    },
});

const noteVal = computed(() => {
    return props.note;
});

console.log(noteVal.value);
</script>

<style scoped lang="scss">
@font-face {
    font-family: "SO";
    src:
        url("@/assets/fonts/SmileySans-Oblique.woff") format("woff"),
        url("@/assets/fonts/SmileySans-Oblique.ttf") format("truetype");
    font-display: swap;
}
.node-card {
    height: 240px;
    padding: 10px 20px;
    box-sizing: border-box;
    position: relative;
    background-color: rgba(252, 175, 162, 0.3);
    .top {
        display: flex;
        justify-content: space-between;
        padding-bottom: 16px;
        p {
            font-size: $size-12;
            color: $gray-3;
        }
    }
    .message {
        height: 140px;
        font-family: SO;
        font-size: 14px;
        color: $gray-1;
        cursor: pointer;
    }
    .foot {
        display: flex;
        justify-content: space-between;

        align-items: flex-end;
        height: calc(100% - 170px);
        // position: absolute;
        // left: 0;
        width: 100%;
        bottom: 16px;
        // padding: 0 $padding-20;
        box-sizing: border-box;
        .foot-left {
            display: flex;
            .icon {
                padding-right: $padding-8;
                display: flex;
                align-items: center;
                .value {
                    font-size: $size-12;
                    color: $gray-3;
                    line-height: 16px;
                    padding-left: $padding-4;
                }
                .iconfont {
                    font-size: 16px;
                    color: $gray-3;
                }
            }
            .icon-aixin {
                cursor: pointer;
                transition: $tr;
                &:hover {
                    color: $like;
                }
            }
        }
        .name {
            font-family: SO;
            font-size: 17px;
            color: $gray-1;
            font-weight: 500;
        }
    }
}
</style>
