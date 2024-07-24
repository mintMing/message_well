<template>
    <div
        class="node-card"
        :style="{ width: width, backgroundColor: cardColor[props.note.color] }"
    >
        <div class="top">
            <p class="time">{{ formatDate(new Date(props.note.moment)) }}</p>
            <p class="label">
                {{ labelData[props.note.type][props.note.label] }}
            </p>
        </div>
        <p class="message" @click="toDetailCard">{{ props.note.message }}</p>
        <div class="foot">
            <div class="foot-left">
                <div class="icon" @click="iLike">
                    <span
                        class="iconfont icon-aixin"
                        :class="{ islike: props.note.islike.count > 0 }"
                    ></span>
                    <span class="value">{{ props.note.like.count }}</span>
                </div>
                <div class="icon" v-show="props.note.comcount.count > 0">
                    <span class="iconfont icon-liuyan"></span>
                    <span class="value">{{ props.note.comcount.count }}</span>
                </div>
            </div>
            <div class="name">{{ props.note.name }}</div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { label, cardColor } from "../../../mock/data.js";
import { formatDate } from "@/utils/tool.js";
import { insertFeedbackApi } from "../../api/index.js";
import useNewCard from "../../store/modules/newCard.js";

const labelData = ref(label);

const props = defineProps({
    width: {
        default: "288px",
    },
    backgroundColor: {
        default: "rgba(252, 175, 162, 0.30);",
    },
    // cards: {
    //     default: () => {},
    // },
    note: {
        default: () => {},
    },
});

const useStore = useNewCard();
const user = useStore.getUser();

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

/**
 * 删除反馈数据
 */

// watch(
//     () => props.note,
//     (newNote, oldNote) => {
//         console.log("props.note has changed:", newNote);
//         // 你可以在这里添加更多的逻辑来处理 prop 的变化
//     },
//     {
//         deep: true, // 如果 note 是一个对象，你需要使用 deep 选项来深度观察它的变化
//         immediate: true, // 如果你希望在组件初始化时立即执行一次这个回调，可以设置 immediate 为 true
//     },
// );
</script>

<style scoped lang="scss">
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
                .islike {
                    color: $like;
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
