<template>
    <div class="scroll-wrap">
        <div class="scroll-item">{{ text }}</div>
    </div>
</template>

<script setup>
defineProps({
    text: String
});
</script>

<style lang="scss" scoped>
// 通用代码部分 ⬇️
.scroll-wrap {
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    white-space: nowrap;
}

.scroll-item {
    animation: scroll linear 4s alternate infinite;
    float: left;
}

@keyframes scroll {
    0% {
        margin-left: 0;
        transform: translateX(0);
    }

    10% {
        margin-left: 0;
        transform: translateX(0);
    }

    90% {
        margin-left: 100%;
        transform: translateX(-100%);
    }

    100% {
        margin-left: 100%;
        transform: translateX(-100%);
    }
}
</style>
