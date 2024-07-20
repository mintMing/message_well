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
            <NodeCard
                v-for="(ele, index) in note.data"
                :key="index"
                :note="ele"
                class="card-inner"
                :class="{ cardSelected: index == cardSelected }"
                @click="selectdCard(index), changeCardCom()"
                v-show="id == 0"
            ></NodeCard>
        </div>
        <div class="photo" v-show="id == 1">
            <!-- <img :src="photoPath" alt="photo" /> -->
            <PictureWall
                :photo="ele"
                v-for="(ele, index) in photo.data"
                :key="index"
                @click="selectdCard(index)"
            ></PictureWall>
            <!-- <WaterFall :photo="photoData"></WaterFall> -->
        </div>
        <Transition name="AniAdd">
            <div
                class="add"
                :style="{ bottom: addBottom + 'px' }"
                @click="changeModal(), changeCardCom()"
                v-show="!isModal"
            >
                <span class="iconfont icon-tianjia"></span>
            </div>
        </Transition>

        <Modal :title="wallTitle" @close="changeModal" :isVisible="isModal">
            <keep-alive>
                <component
                    :is="tabCom"
                    :id="id"
                    @addClose="changeModal"
                    :card="note.data[cardSelected]"
                ></component>
            </keep-alive>
            <!-- <NewCard :id="id" @addClose="changeModal" v-show="cardSelected==-1"></NewCard>
            <CardDetail v-show="cardSelected!=-1"></CardDetail> -->
        </Modal>
        <Viewer :isView="view"></Viewer>
    </div>
</template>

<script setup>
import { wallType, label } from "../../../mock/data.js";
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { note, photo } from "../../../mock/index.js";
import { debounce } from "../../utils/index.js";
import { useRoute } from "vue-router";

// const id = ref(0);
const labelIdx = ref(-1); // 对应的标签
const addBottom = ref(30); // add按钮距离底部高度
const wallTitle = ref("写留言"); // 留言墙或照片墙
const cardSelected = ref(-1); // 当前选择的卡片
const tabCom = ref("NewCard"); // 卡片组件
const route = useRoute();
const isModal = ref(false); // 是否关闭弹窗
const view = ref(false); // 预览图片
// const photoPath = ref(""); // 图片墙的路径

// 标签的切换
const selectcNode = (index) => {
    labelIdx.value = index;
};

/**
 * 动态调整主页添加留言的图标位置
 * 防抖且在组件卸载时移除监听
 */
const scrollBottom = () => {
    const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    if (scrollTop + clientHeight + 230 >= scrollHeight) {
        addBottom.value = scrollTop + clientHeight + 230 - scrollHeight;
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

const changeModal = () => {
    wallTitle.value = "写留言";
    isModal.value = !isModal.value;
    if (id.value == 1) {
        view.value = false;
    }
};

// 选择卡片
const selectdCard = (index) => {
    wallTitle.value = "";
    const wasSelected = index === cardSelected.value;
    cardSelected.value = wasSelected ? -1 : index;
    isModal.value = !wasSelected;
    if (id.value == 1) {
        view.value = true;
    } else {
        view.value = false;
    }
};

// 新建卡片
// const addCard = () => {
//     wallTitle.value = "写留言";
//     changeModal();
// };

const changeCardCom = () => {
    // console.log(note.data)
    if (cardSelected.value === -1) {
        tabCom.value = "NewCard";
    } else {
        tabCom.value = "CardDetail";
    }
};

// const tabProp = computed(() => {
//     if (tabCom.value === "NewCard") {
//         return { id: id.value };
//     } else if (tabCom.value === "CardDetail") {
//         // Add other props if needed
//         return {};
//     }
// });

// 留言墙和照片墙切换
const id = computed(() => {
    return route.query.id;
});

const cards = computed(() => {
    let a = "";
    if (route.query.id == 0) {
        a = note.data;
    } else {
        a = photo.data;
    }
    return a;
});

const photoData = ref([
    { imgurl: "./state/0.jpg", like: 10 },
    { imgurl: "./state/1.jpg", like: 20 },
    { imgurl: "./state/2.jpg", like: 30 },
    { imgurl: "./state/3.jpg", like: 30 },
    { imgurl: "./state/4.jpg", like: 30 },
    // 更多图片数据...
]);

const photoPath = computed(() => {
    return `./state/${photo.data[0].imgurl}.jpg`;
});

//
watch(
    () => route.query.id,
    (newVal, oldVal) => {
        if(newVal == 0) {
            view.value = false;
            isModal.value = false;
        }
    },
);
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
            line-height: 30px;
            margin: $padding-4;
            color: $gray-2;
            // box-shadow: border-box;
            // 预先设置边框，避免点击时尺寸变化
            border: 1px solid transparent;
            border-radius: 16px;
            transition: all 0.3s ease;
            // min-width: 16px;
            // @media (max-wdith: 768px) {
            //     margin: 2px;
            // }
        }
        .lbselected {
            color: $gray-1;
            font-weight: 600;
            // border: 1px solid $gray-1;
            border-color: $gray-1;
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
        .cardSelected {
            border: 1px solid $primary-color;
        }
        .photo {
            width: 88%;
            margin: 0 auto;
            columns: 6;
            column-gap: $padding-4;
            // display: flex;
            // justify-content: center;
        }
        .photo-card {
            margin-bottom: $padding-4;
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

.AniAdd {
    &-enter {
        &-from {
            opacity: 0;
        }
        &-active {
            transition: $tr ease-in;
        }
        &-to {
            opacity: 1;
        }
    }
    &-leave {
        &-from {
            opacity: 1;
        }
        &-active {
            transition: $tr ease-out;
        }
        &-to {
            opacity: 0;
        }
    }
}
</style>
