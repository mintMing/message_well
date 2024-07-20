<template>
    <div class="waterfall" ref="waterfall">
        <div
            class="item"
            v-for="(image, index) in photo"
            :key="index"
            :style="getItemStyle(index)"
        >
            <div class="photo-card">
                <img
                    class="photo-img"
                    :src="getImagePath(image.imgurl)"
                    alt="photo"
                />
                <div class="photo-bg"></div>
                <div class="photo-like">
                    <span class="iconfont icon-aixin"></span>
                    <span class="like-data">{{ image.like }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import { debounce } from "lodash"; // 引入 lodash 的 debounce 函数

const props = defineProps({
    photo: {
        type: Array,
        required: true,
    },
});

const waterfallRef = ref(null);
const columnCount = ref(3); // 默认列数为3
const columnHeights = ref([]);

const getImagePath = (imgurl) => {
    return `./state/${imgurl}.jpg`;
};

const getItemStyle = (index) => {
    const column = index % columnCount.value;
    const top = columnHeights.value[column] || 0;
    columnHeights.value[column] = top + 300 + 10; // 这里300为图片高度 + 10为间隔
    return {
        position: "absolute",
        top: `${top}px`,
        left: `${column * (100 / columnCount.value)}%`,
        width: `calc(100% / ${columnCount.value} - 10px)`,
    };
};

const updateColumns = () => {
    if (waterfallRef.value) {
        const containerWidth = waterfallRef.value.offsetWidth;
        const newColumnCount = Math.floor(containerWidth / 300);
        if (newColumnCount !== columnCount.value) {
            columnCount.value = newColumnCount;
            columnHeights.value = Array(columnCount.value).fill(0);
        }
    }
};

const debouncedUpdateColumns = debounce(updateColumns, 100);

onMounted(async () => {
    await nextTick();
    updateColumns();
    window.addEventListener("resize", debouncedUpdateColumns);
});

watch(() => props.photo, updateColumns, { immediate: true });

onUnmounted(() => {
    window.removeEventListener("resize", debouncedUpdateColumns);
});
</script>

<style scoped lang="scss">
.waterfall {
    position: relative;
    width: 100%;
}

.item {
    position: absolute;
    margin-bottom: 10px;
}

.photo-card {
    position: relative;
    width: 100%;
    max-width: 300px;
    height: 500px;

    .photo-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .photo-bg {
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.2);
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .photo-like {
        position: absolute;
        left: 8px;
        top: 8px;
        background-color: rgba(255, 255, 255, 0.8);
        height: 28px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        backdrop-filter: blur(10px);
        border-radius: 20px;
        opacity: 0;
        transition: opacity 0.3s;
        cursor: pointer;

        .icon-aixin {
            color: #666;
            padding-right: 4px;
        }

        .like-data {
            color: #333;
        }
    }

    &:hover {
        .photo-bg {
            opacity: 1;
        }
        .photo-like {
            opacity: 1;
        }
    }
}
</style>
