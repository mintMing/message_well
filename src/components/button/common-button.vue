<template>
    <button :class="[size, state]" class="common-button">
        <slot></slot>
    </button>
</template>

<script setup>
defineProps({
    size: {
        type: String,
        default: "base",
    },
    state: {
        type: String,
        default: "primary",
    },
});
</script>

<style scoped lang="scss">
$border-radius: 24px;

.common-button {
    text-align: center;
    border: none;
    cursor: pointer;
}

@mixin size-mixin {
    @content;
}
.max {
    @include size-mixin {
        min-width: 100px;
        height: 48px;
        border-radius: 24px;
        padding: 0 24px;
    }
}

.base {
    @include size-mixin {
        min-width: 80px;
        height: 36px;
        border-radius: 24px;
        padding: 0 20px;
    }
}

.small {
    @include size-mixin {
        min-width: 100px;
        height: 32px;
        padding: 0 20px;
    }
}

.primary {
    background: $gray-1;
    color: $gray-10;
}
.commonPrimary {
    background: $primary-color;
    color: $gray-10;
    font-weight: 600;
}

.commonSecondary {
    background: $gray-10;
    color: $gray-1;
}

.secondary {
    // background: $gray-10;
    color: $gray-1;
    border: 1px solid $gray-1;
}


.noTall {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>
