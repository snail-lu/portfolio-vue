<template>
    <div class="slider" ref="slider">
        <div class="slider-runway" @click="onClick" ref="runway">
            <div class="slider-bar" :style="{ width: progress }"></div>
            <div class="slider-dot" :style="{ left: progress }" @mousedown="onMousedown" ref="dot"></div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const runway = ref(null);
const dot = ref(null);

const progress = ref('50%');

// 鼠标点击
const onMousedown = (ev) => {
    /*
     * offsetLeft 获取的是相对于父对象的左边距, 返回的是数值， 没有单位
     */

    const { offsetLeft: runwayL, offsetWidth: runwayW } = runway.value;
    const { offsetLeft: dotL } = dot.value;

    let e = ev || window.event; // 兼容性
    /*
     * clientX 事件属性返回当事件被触发时鼠标指针向对于浏览器页面（或客户区）的水平坐标。
     */
    let mouseX = e.clientX; // 鼠标按下的位置
    window.onmousemove = function (ev) {
        let e = ev || window.event;
        // 浏览器当前位置减去鼠标按下的位置
        let moveL = e.clientX - mouseX; // 鼠标移动的距离

        // 保存newL是必要的
        let newL = dotL + moveL; // left值
        // 判断最大值和最小值
        if (newL < 0) {
            newL = 0;
        }
        if (newL >= runwayW) {
            newL = runwayW;
        }

        progress.value = ((newL * 100) / runwayL).toFixed(2) + '%';
    };
    window.onmouseup = function () {
        window.onmousemove = false; // 解绑移动事件
        return false;
    };
};

const slider = ref(null);
const onClick = (ev) => {
    const { offsetWidth: dotW } = dot.value;
    const { offsetLeft: runwayL, offsetWidth: runwayW } = runway.value;
    let left = ev.clientX - slider.value.offsetLeft - dotW / 2;
    if (left < 0) {
        left = 0;
    }
    if (left >= runwayW) {
        left = runwayW;
    }
    progress.value = ((left * 100) / runwayL).toFixed(2) + '%';
};
</script>

<style lang="scss" scoped>
.slider {
    width: 100%;
    height: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &-runway {
        height: 3px;
        background-color: rgba(255, 255, 255, 0.3);
        position: relative;
        border-radius: 3px;

        &:hover {
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
        transform: translateY(-50%);
        cursor: pointer;
    }
}
</style>
