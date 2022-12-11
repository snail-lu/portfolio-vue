<template>
    <div class="loading-container" v-if="loadingStatus === '加载中'">
        <div class="loading-icon">
            <div class="shape shape-1"></div>
            <div class="shape shape-2"></div>
            <div class="shape shape-3"></div>
            <div class="shape shape-4"></div>
        </div>
        <div class="loading-text">{{ loadingStatus }}</div>
    </div>
    <div class="loading-error" v-else-if="loadingStatus === '加载失败'">
        加载失败，<span class="refresh-btn" title="刷新" @click="onRefresh">刷新重试</span>
    </div>
</template>

<script setup>
const props = defineProps({
    loadingStatus: {
        type: String,
        default: '加载中'
    }
});

const emit = defineEmits(['refresh']);
function onRefresh() {
    emit('refresh');
}
</script>

<style lang="scss" scoped>
.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.loading-icon {
    width: 30px;
    height: 30px;
    animation: animationContainer 1s ease infinite;
}

.loading-text {
    font-size: 14px;
    color: #fff;
    margin-top: 8px;
}

.loading-error {
    color: #fff;
    font-size: 14px;

    .refresh-btn {
        display: inline-block;
        background-color: #3498db;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        border-radius: 30px;
        cursor: pointer;
    }
}

.shape {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
}

.shape-1 {
    background-color: #1875e5;
    left: 0;
    animation: animationShape1 0.5s ease infinite alternate;
}

.shape-2 {
    background-color: #c5523f;
    right: 0;
    animation: animationShape2 0.5s ease infinite alternate;
}

.shape-3 {
    background-color: #499255;
    bottom: 0;
    animation: animationShape3 0.5s ease infinite alternate;
}

.shape-4 {
    background-color: #f2b736;
    right: 0;
    bottom: 0;
    animation: animationShape4 0.5s ease infinite alternate;
}

@keyframes animationContainer {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes animationShape1 {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(20px, 20px);
    }
}

@keyframes animationShape2 {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(-20px, 20px);
    }
}

@keyframes animationShape3 {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(20px, -20px);
    }
}

@keyframes animationShape4 {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(-20px, -20px);
    }
}
</style>
