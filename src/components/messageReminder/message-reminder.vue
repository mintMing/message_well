<template>
    <Transition name="down">
        <div class="message" v-if="isShow">
            <div class="message-i">
                <i
                    class="iconfont icon-icon-warning"
                    :class="style[props.type].icon"
                ></i>
                <span class="text">{{ message }}</span>
            </div>
        </div>
    </Transition>
</template>
<script setup>
import { ref, onMounted } from "vue";

const name = ref("Message Wall");
const isShow = ref(true);

const props = defineProps({
    message: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: "warning",
    },
});

const style = ref({
    warning: {
        icon: "icon-icon_warning",
    },
    error: {
        icon: "icon-icon_error",
    },
    success: {
        icon: "icon-icon_success",
    },
});

// console.log(style.value[props.type].icon);

onMounted(() => {
    isShow.value = true;
    setTimeout(() => {
        isShow.value = false;
    }, 3000);
});
</script>

<style scoped lang="scss">
.down {
    &-enter {
        &-from {
            transform: translateY(-30px);
            opacity: 0;
        }
        &-active {
            transition: $tr;
        }
        &-to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    &-leave {
        &-from {
            transform: translateY(0);
            opacity: 1;
        }
        &-active {
            transition: $tr;
        }
        &-to {
            transform: translateY(-30px);
            opacity: 0;
        }
    }
}

.message {
    width: 100%;
    height: 40px;
    position: fixed;
    z-index: 9999;
    top: 20px;
    line-height: 40px;
    display: flex;
    justify-content: center;
    .message-i {
        padding: 0 20px;
        color: $gray-1;
        background: #fff;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }
    i {
        margin-right: 6px;
        vertical-align: middle;
    }
    .text {
        vertical-align: middle;
    }
    .icon-icon_success {
        color: $primary-color;
    }
    .icon-icon_warning {
        color: $warning-color;
    }
    .icon-icon_error {
        color: $error-color;
    }
}
</style>
