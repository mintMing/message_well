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

.primary,
.commonPrimary {
    background: $gray-1;

    color: $gray-10;
}

.commonPrimary {
    font-weight: 600;
}

.secondary,
.commonSecondary {
    background: $gray-10;

    color: $gray-1;
}

.secondary {
    border: 1px solid $gray-1;
}
</style>
