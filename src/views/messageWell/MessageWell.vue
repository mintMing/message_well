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
                v-for="(ele, index) in cards"
                :key="index"
                :note="ele"
                class="card-inner"
                :class="{ cardSelected: index == cardSelected }"
                @click="changeCardCom()"
                @nodeToDetail="selectdCard(index)"
                v-show="id == 0"
            ></NodeCard>
        </div>
        <div class="photo" v-show="id == 1">
            <!-- <img :src="photoPath" alt="photo" /> -->
            <PictureWall
                :photo="ele"
                v-for="(ele, index) in cards"
                :key="index"
                @click="selectdCard(index)"
                @nodeToDetail="selectdCard(index)"
            ></PictureWall>
            <!-- <WaterFall :photo="photoData"></WaterFall> -->
        </div>
        <!-- 卡片状态 -->
        <div class="none-msg" v-if="isNoted == 0">
            <img :src="none[id].url" />
            <!-- <img src="../../assets/images/小猫灰灰.svg" /> -->
            <p>{{ none[id].msg }}</p>
        </div>
        <div class="loading" v-show="isNoted == -1">
            <div id="lottile">
                <!-- <p class="bottom-tip" v-show="isNoted == 2">加载中...</p> -->
                <p>加载中...</p>
            </div>
        </div>
        <p class="bottom-tip" v-show="page == 0">没有更多了...</p>
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
                    :card="cards[cardSelected]"
                    @submitted="addCard"
                ></component>
            </keep-alive>
            <!-- <NewCard :id="id" @addClose="changeModal" v-show="cardSelected==-1"></NewCard>
            <CardDetail v-show="cardSelected!=-1"></CardDetail> -->
        </Modal>
        <Viewer :isView="view"></Viewer>
        <MessageReminder type="warning" message="测试"></MessageReminder>
    </div>
</template>

<script setup>
import { wallType, label } from "../../../mock/data.js";
import {
    ref,
    reactive,
    computed,
    onMounted,
    onUnmounted,
    watch,
    nextTick,
} from "vue";
// import { photo } from "../../../mock/index.js";
import { debounce } from "../../utils/index.js";
import { useRoute } from "vue-router";
import lottie from "lottie-web";
import loading from "../../assets/images/empty_compare_list.json";
import { findWallPageApi } from "../../api/index.js";
import useNewCard from "../../store/modules/newCard.js";
import { monitorWindowSizeAndScroll } from "../../utils/test.js";

// const id = ref(0);
const labelIdx = ref(-1); // 对应的标签
const addBottom = ref(200); // add按钮距离底部高度
const wallTitle = ref("写留言"); // 留言墙或照片墙
const cardSelected = ref(-1); // 当前选择的卡片
const tabCom = ref("NewCard"); // 卡片组件
const route = useRoute();
const isModal = ref(false); // 是否关闭弹窗
const view = ref(false); // 预览图片
// const photoPath = ref(""); // 图片墙的路径
let cards = reactive([]); // 留言墙卡片集合
const isNoted = ref(-1); // 是否为加载状态 -1为加载中、0为没有拿到数据
const none = ref([
    // 加载状态的图片
    {
        url: `src/assets/images/小猫灰灰.svg`,
        msg: "还没有留言，快贴上第一张吧。",
    },
    {
        url: `src/assets/images/旺财旺财.svg`,
        msg: "还没有照片，快贴上第一张吧。",
    },
]);
const useStore = useNewCard();

// const user = ref(); // 访问用户的 IP 地址
const user = computed(() => {
    return useStore.getUser();
});
const page = ref(1); // 当前的页面
const pageSize = ref(5); // 每次加载页数
const photos = reactive([]); // 图片墙集合

// 标签的切换
const selectcNode = (index) => {
    labelIdx.value = index;
    console.log(labelIdx.value);
    // 不同标签有不同卡片
    cards = [];
    page.value = 1;
    getWallCard(id.value);
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
    // 这里做分页监听
    if (scrollTop + clientHeight >= scrollHeight) {
        // isNoted.value = -1;
        // setTimeout(() => {
        getWallCard(id.value);
        // }, 100000);
    }
};

const descrollBottom = debounce(scrollBottom, 10, false);

onMounted(() => {
    window.addEventListener("scroll", descrollBottom);
    load();
    // console.log(cards)
    console.log(id.value);
});

onUnmounted(() => {
    window.removeEventListener("scroll", descrollBottom);
});

const changeModal = () => {
    wallTitle.value = "写留言";
    isModal.value = !isModal.value;
    cardSelected.value = -1;
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

const changeCardCom = () => {
    if (cardSelected.value === -1) {
        tabCom.value = "NewCard";
    } else {
        tabCom.value = "CardDetail";
    }
};

// 留言墙和照片墙切换
const id = computed(() => {
    return route.query.id;
});

// 墙是否切换
watch(
    () => route.query.id,
    (newVal, oldVal) => {
        view.value = false;
        isModal.value = false;
        labelIdx.value = -1;
        cardSelected.value = -1;
        getWallCard(newVal);
    },
    { deep: true },
);

// 创建新卡片 数据来源 new-card 组件
const addCard = (e) => {
    cards.unshift(e);
    changeModal();
};

// 加载动画
const load = () => {
    if (isNoted.value == -1) {
        nextTick(async () => {
            const params = {
                container: document.getElementById("lottile"),
                renderer: "svg",
                loop: true,
                autoplay: true,
                animationData: loading,
            };
            lottie.loadAnimation(params);
        });
    }
};

// 获取留言墙卡片
const getWallCard = (wallTypeId) => {
    if (page.value <= 0) {
        return;
    }
    isNoted.value = -1;
    const data = {
        type: wallTypeId,
        page: page.value,
        pageSize: pageSize.value,
        user_id: user.value,
        label: labelIdx.value, // 为-1时获取所有数据
    };
    console.log("getWallCard: " + wallTypeId);
    findWallPageApi(data).then((res) => {
        if (res && res.message && res.message.length > 0) {
            cards.splice(0, 0, ...res.message);
            page.value++;
        } else {
            console.log(page.value);
            page.value = 0;
        }

        if (cards.length > 0) {
            isNoted.value = 1; // 有数据
            if (page.value === 0) {
                isNoted.value = 2; // 没有更多数据
            }
        } else {
            isNoted.value = 0; // 没有拿到数据
        }

        if (id.value === 1) {
            // photos.splice(0, photos.length); // 清空现有照片数组
            for (let i = 0; i < cards.length; i++) {
                photos.push(cards[i].imgurl);
            }
        }
    });
};

/**
 * 在 pinia 完成异步操作后执行
 */
watch(user, (newUser) => {
    if (newUser) {
        getWallCard(0);
    }
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
        // border: 1px solid red;
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
    .none-msg {
        width: 100%;
        text-align: center;
        padding-top: 80px;
        position: absolute;
        top: 280px;
        z-index: -1;
        img {
            display: inline;
            max-width: 100px;
        }
        p {
            font-family: serif;
            font-weight: 700;
            font-size: 24px;
            color: $gray-3;
        }
    }
    .loading {
        text-align: center;
        width: 100%;
        position: absolute;
        top: 500px;
        z-index: 999;
        p {
            margin-top: -72px;
            font-family: serif;
            font-size: 24px;
            color: $gray-3;
        }
    }
    .bottom-tip {
        text-align: center;
        color: $gray-3;
        padding: $padding-20;
    }
}

#lottile {
    margin-top: 20px;
    height: 200px;
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
