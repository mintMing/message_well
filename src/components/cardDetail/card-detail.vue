<template>
    <div class="card-detail">
        <div class="top-bt">
            <p class="revoke">联系墙主撕掉该便签</p>
            <p class="report">举报</p>
        </div>
        <NodeCard style="width: 100%" :note="props.card"></NodeCard>
        <div class="form">
            <textarea
                class="message"
                placeholder="请输入..."
                v-model="dicuss"
            ></textarea>
            <div class="bt">
                <input
                    type="text"
                    class="name"
                    placeholder="签名"
                    v-model="name"
                />
                <CommonButton :class="{ noTall: !submitState }" @click="submit">
                    确定
                </CommonButton>
            </div>
        </div>
        <p class="title">评论 {{ props.card.comcount.count }}</p>
        <div class="comment">
            <div
                class="comment-li"
                v-for="(ele, index) in comments"
                :key="index"
            >
                <div
                    class="user-head"
                    :style="{ backgroundImage: headGradients[ele.img_url] }"
                ></div>
                <main class="comm-m">
                    <div class="m-top">
                        <p class="name">{{ ele.name }}</p>
                        <p class="time">
                            {{ formatDate(new Date(ele.moment)) }}
                        </p>
                    </div>
                    <div class="mm">{{ ele.comment }}</div>
                </main>
            </div>
        </div>
        <p class="more" @click="getComment" v-show="page > 0">加载更多</p>
    </div>
</template>

<script setup>
import {
    computed,
    ref,
    inject,
    reactive,
    onMounted,
    watch,
    watchEffect,
} from "vue";
// import { note, comment } from "../../../mock";
import { headGradients } from "../../../mock/data.js";
import { formatDate } from "@/utils/tool.js";
import { insertCommentApi, findCommentPageApi } from "../../api/index.js";

const $message = inject("message");

const props = defineProps({
    card: {
        default: () => {},
    },
});

// const isState = ref(false);
const dicuss = ref(""); // 评论内容
const name = ref("匿名");
let comments = reactive([]);
const page = ref(1);
const pageSize = ref(8);

// 是否可以确定
const submitState = computed(() => {
    if (dicuss.value && name.value) {
        return true;
    } else {
        return false;
    }
});

const submit = () => {
    if (submitState.value) {
        const userHeadImg = Math.floor(Math.random() * 14);
        name.value = name.value ? name.value : "匿名";
        const reqData = {
            wall_id: props.card.id,
            user_id: props.card.user_id,
            img_url: userHeadImg,
            moment: new Date(),
            name: name.value,
            comments: dicuss.value,
        };
        // console.log(reqData);
        insertCommentApi(reqData).then(() => {
            comments.unshift(reqData);
            props.card.comcount.count++;
            dicuss.value = "";
        });
        $message({ type: "success", message: "感谢你的评论！" });
    }
};

const getComment = () => {
    if (page.value <= 0) {
        return;
    }
    const reqData = {
        id: props.card.id,
        page: page.value,
        pageSize: pageSize.value,
    };
    // console.log(reqData);
    findCommentPageApi(reqData).then((res) => {
        // console.log(res);
        comments.splice(0, 0, ...res.message);
        if (res.message.length == pageSize.value) {
            page.value++;
        } else {
            page.value = 0;
        }
    });
};

onMounted(() => {
    getComment();
    console.log(props.card);
});

watch(
    () => props.card,
    (newVal) => {
        if (newVal) {
            console.log("test");
            page.value = 1;
            comments = [];
            getComment();
        }
    },
    { deep: true },
);
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
    .more {
        color: $gray-2;
        text-align: center;
        padding: $padding-20;
        cursor: pointer;
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
