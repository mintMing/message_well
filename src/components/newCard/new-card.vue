<template>
    <div class="new-card">
        <div class="colors">
            <p
                class="color-li"
                v-for="(ele, index) in cardColor1"
                :key="index"
                :style="{ backgroundColor: ele }"
            ></p>
        </div>
        <main class="card-main">
            <textarea
                class="message"
                placeholder="留言..."
                maxlength="96"
            ></textarea>
            <input class="name" type="text" placeholder="签名" />
        </main>
    </div>
</template>

<script setup>
import { cardColor, cardColor1 } from "../../../mock/data.js";

const props = defineProps({});
</script>

<style scoped lang="scss">
.new-card {
    padding: 0 $padding-20;
    .colors {
        height: 36px;
        display: flex;
        .color-li {
            width: 24px;
            height: 24px;
            margin: 0;
            margin-right: $padding-8;
            &.color-selected {
                border: 1px solid rgba(59, 115, 240, 1);
            }
        }
    }
    .card-main {
        height: 240px;
        width: 100%;
        background: rgba(252, 175, 162, 0.31);
        padding: 12px;
        box-sizing: border-box;

        .message,
        .name {
            box-sizing: border-box;
            padding: var(--padding-8); 
            background: none;
            border: var(--border-color) 1px solid; 
            font-family: var(--font-family); 
            width: 100%; 
        }
        .message {
            border: none;  
            resize: none;  
            height: 172px;
        }
        .name {
            line-height: 20px;
        }
    }
}
</style>
