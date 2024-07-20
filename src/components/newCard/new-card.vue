<template>
    <div class="new-card">
        <div class="new-card__colors">
            <p
                class="new-card__color"
                v-for="(ele, index) in cardColor1"
                :key="index"
                :style="{ backgroundColor: ele }"
                :class="{ colorSelected: index == colorSelected }"
                @click="changeColor(index)"
            ></p>
        </div>
        <main
            class="new-card__main"
            :style="{ backgroundColor: cardColor[colorSelected] }"
        >
            <textarea
                class="new-card__message"
                placeholder="留言..."
                maxlength="96"
                v-model="message"
            ></textarea>
            <input class="new-card__name" type="text" placeholder="签名" v-model="name" />
        </main>
        <div class="new-labels">
            <p class="new-labels__title"></p>
            <p
                class="new-labels__li"
                v-for="(ele, index) in label[id]"
                :key="index"
                :class="{ labelSelected: index == labelIndex }"
                @click="changeLabel(index)"
                :style="{
                    backgroundColor:
                        index == labelIndex
                            ? cardColor[colorSelected]
                            : 'transparent',
                }"
            >
                {{ ele }}
            </p>
        </div>
        <p class="new-noRes__title">免责声明</p>
        <p class="new-noRes__statement">
            <br />
            1、反对宪法所确定的基本原则的
            <br />
            2、危害国家安全,泄露国家秘密, 颠覆国家政权,破坏国家统一的;
            <br />
            3、损害国家荣誉和利益的;
            <br />
            4、煽动民族仇恨、民族歧视,破坏民族团结的;
            <br />
            5、破坏国家宗教政策,宣扬邪教和封建迷信的;
            <br />
            6、散布谣言,扰乱社会秩序,破坏社会稳定的;
            <br />
            7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的;
            <br />
            8、侮辱或者诽谤他人,侵害他人合法权益的;
            <br />
            9、含有法律、行政法规禁止的其他内容的信息。
        </p>
        <div class="new-footer">
            <CommonButton size="max" state="secondary" @click="dropDown">丢弃</CommonButton>
            <CommonButton class="new-footer__bt" size="max">确认</CommonButton>
        </div>
    </div>
</template>

<script setup>
import { cardColor, cardColor1, label } from "../../../mock/data.js";
import { ref } from "vue";

const colorSelected = ref(0); // 当前选择的颜色
const labelIndex = ref(0); // 当前选择的标签
const message = ref(""); // 留言信息
const name = ref(""); // 签名

const changeColor = (index) => {
    colorSelected.value = index;
};

const props = defineProps({
    // 选择的标签
    id: {
        default: 0,
    },
});

const changeLabel = (index) => {
    labelIndex.value = index;
};

const emit = defineEmits(["addClose"]);
// 丢弃
const dropDown = () => {
    if(name.value == "" && message.value == "") {
        emit("addClose", 0)
    } else {
        name.value = "";
        message.value = "";
    }

};
</script>

<style lang="scss">
$namespace: "new";

@mixin com-styles {
    box-sizing: border-box;
    padding: $padding-8;
    width: 100%;
    background: none;
    font-family: SO;
}
@include b($namespace, "card") {
    padding: 0 $padding-20 120px;
    position: relative;
    @include e("colors") {
        // height: 36px;
        padding-bottom: $padding-12;
        display: flex;
        align-items: center;
    }
    @include e("color") {
        width: 24px;
        height: 24px;
        margin: 0 $padding-8 0 0;
        cursor: pointer;
        &.colorSelected {
            border: 1px solid rgba(59, 115, 240, 1);
        }
    }
    @include e("main") {
        height: 240px;
        // background: rgba(252, 175, 162, 0.31);
        padding: 12px;
        transition: $tr;
    }
    @include e("message") {
        @include com-styles;
        border: none;
        resize: none;
        height: 172px;
    }

    @include e("name") {
        @include com-styles;
        border: #fff 1px solid;
        line-height: 20px;
    }
}

@include b($namespace, "labels") {
    display: flex;
    flex-wrap: wrap;
    .labelSelected {
        // background: v-bind(labelColor);
        font-weight: 600;
        color: $gray-1;
    }
    @include e("title") {
        color: $gray-1;
        font-weight: 600;
        padding-top: 30px;
    }

    @include e("li") {
        padding: 2px 10px;
        border-radius: 20px;
        margin: $padding-20 $padding-4 0 0;
        cursor: pointer;
        color: $gray-2;
        transition: $tr;
    }
    @include e("noRespon") {
        padding: 2px 10px;
        border-radius: 20px;
        margin: $padding-20 $padding-4 0 0;
        cursor: pointer;
        color: $gray-2;
        transition: $tr;
    }
}

@include b($namespace, "noRes") {
    @include e("title") {
        color: $gray-1;
        font-weight: 600;
        padding-top: 30px;
    }

    @include e("statement") {
        padding-top: 10px;
        font-size: 12px;
        color: $gray-3;
    }
}

@include b($namespace, "footer") {
    padding: $padding-20;
    box-sizing: border-box;
    position: fixed;
    bottom: 52px;
    left: 0;
    background: rgba(255, 255, 255, 0.6);
    width: 100%;
    backdrop-filter: blur(10px);
    @include e("bt") {
        margin-left: $padding-20;
        width: 200px;
    }
}
</style>
