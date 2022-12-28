<template>
    <div class="slider" ref="slider">
        <div class="slider-runway" @click="onPick" ref="runway">
            <div class="slider-bar" :style="{ width: progress }"></div>
            <div class="slider-dot" :style="{ left: progress }" @mousedown="onDragStart" ref="dot"></div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const runway = ref(null);
const dot = ref(null);

const progress = ref('0%');
const initData = {};
// 开始拖动
const onDragStart = (ev) => {
    ev.preventDefault();
    initData.startX = ev.clientX;
    initData.startY = ev.clientY;
    // 按钮距左侧距离
    const { offsetLeft: dotL } = dot.value;
    initData.startPosition = dotL;
    window.addEventListener('mousemove', onDragging);
    window.addEventListener('mouseup', onDragEnd);
};

// 拖动中
const onDragging = (ev) => {
    let e = ev || window.event;

    // 滑轨长度
    const { offsetWidth: runwayW } = runway.value;

    // 拖动的距离
    let diff = e.clientX - initData.startX;

    // 新的位置 = 按钮距左侧距离 + 拖动距离
    let newL = initData.startPosition + diff;
    // 新的位置不可为负
    if (newL < 0) {
        newL = 0;
    }
    // 新的位置不可超过滑轨长度
    if (newL >= runwayW) {
        newL = runwayW;
    }

    progress.value = ((newL * 100) / runwayW).toFixed(2) + '%';
};

// 拖动结束
const onDragEnd = () => {
    window.removeEventListener('mousemove', onDragging);
    window.removeEventListener('mouseup', onDragEnd);
};

const slider = ref(null);
// 点选进度
const onPick = (ev) => {
    const { offsetWidth: runwayW } = runway.value;
    let left = ev.clientX - slider.value.getBoundingClientRect().left;
    if (left < 0) {
        left = 0;
    }
    if (left >= runwayW) {
        left = runwayW;
    }
    progress.value = ((left * 100) / runwayW).toFixed(2) + '%';
};
</script>

<style lang="scss" scoped>
.slider {
    width: 100%;
    height: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &:hover {
        .slider-runway {
            height: 5px;
            cursor: pointer;

            .slider-bar {
                height: 5px;
                border-radius: 5px;
            }
            .slider-dot {
                width: 10px;
                height: 10px;
                border-radius: 10px;
            }
        }
    }

    &-runway {
        height: 3px;
        background-color: rgba(255, 255, 255, 0.3);
        position: relative;
        border-radius: 3px;
    }

    &-bar {
        background-color: #ec4141;
        position: absolute;
        height: 3px;
        width: 50%;
        border-radius: 3px;
        top: 0;
        left: 0%;
    }

    &-dot {
        background-color: #ec4141;
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 3px;
        top: 50%;
        left: 0%;
        transform: translate(-50%, -50%);
        cursor: pointer;
    }
}
</style>
