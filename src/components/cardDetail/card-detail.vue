<template>
    <div class="card-detail">
        <div class="top-bt">
            <p class="revoke">联系墙主撕掉该便签</p>
            <p class="report">举报</p>
        </div>
        <NodeCard style="width: 100%" :note="card"></NodeCard>
        <div class="form">
            <textarea class="message" placeholder="请输入..."></textarea>
            <div class="bt">
                <input type="text" class="name" placeholder="签名" />
                <CommonButton>确定</CommonButton>
            </div>
        </div>
        <p class="title">评论 {{ card.comment }}</p>
        <div class="comment">
            <div
                class="comment-li"
                v-for="(ele, index) in comment.data"
                :key="index"
            >
                <div
                    class="user-head"
                    :style="{ backgroundImage: headGradients[ele.imgurl] }"
                >
                </div>
                <main class="comm-m">
                    <div class="m-top">
                        <p class="name">{{ ele.name }}</p>
                        <p class="time">{{ formatDate(ele.moment) }}</p>
                    </div>
                    <div class="mm">{{ ele.message }}</div>
                </main>
            </div>
        </div>
    </div>
</template>

<script setup>
import { note, comment } from "../../../mock";
import { headGradients } from "../../../mock/data.js";
import { formatDate } from "@/utils/tool.js";

const props = defineProps({
    card: {
        default: () => {},
    },
});

// console.log(comment);
</script>

<style scoped lang="scss">
.card-detail {
    position: relative;
    padding: 0 $padding-20;
    .top-bt {
        position: fixed;
        top: 0;
        left: 0;
        padding: $padding-20;
        display: flex;
    }
    .revoke {
        color: $primary-color;
        cursor: pointer;
        padding-right: 30px;
        font-size: $size-16;
    }
    .report {
        font-size: $size-16;
        color: $warning-color;
        cursor: pointer;
    }
    .form {
        .message {
            background: none;
            height: 56px;
            border: 1px solid rgba(148, 148, 148, 1);
            resize: none;
            padding: $padding-8;
            box-sizing: border-box;
            width: 100%;
            margin-top: $padding-12;
        }
        .bt {
            display: flex;
            padding-top: 6px;
            justify-content: space-between;
        }
        .name {
            width: 200px;
            box-sizing: border-box;
            padding: 7px;
            background: none;
            border: 1px solid rgba(148, 148, 148, 1);
            line-height: 20px;
        }
    }
    .title {
        font-weight: 600;
        padding-top: 30px;
        padding-bottom: 20px;
    }
    .comment-li {
        display: flex;
        padding-bottom: 30px;
        .user-head {
            flex: none;
            width: 28px;
            height: 28px;
            border-radius: 20px;
            overflow: hidden;
            // background-image: linear-gradient(
            //     180deg,
            //     rgba(245, 65, 65, 0.5) 0%
            // );
        }
        .comm-m {
            padding-left: $padding-8;
        }
        .m-top {
            display: flex;
            .name {
                font-weight: 600;
            }
            .time {
                font-size: $size-12;
                padding-left: $padding-4;
                color: $gray-3;
            }
        }
        .mm {
            padding-top: $padding-4;
        }
    }
}
</style>
