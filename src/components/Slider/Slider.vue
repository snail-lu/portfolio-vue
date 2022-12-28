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

// v-model实现
const props = defineProps({
    modelValue: Number,
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: Number,
        default: 100
    },
    step: {
        type: Number,
        default: 1
    },
    vertical: {
        type: Boolean,
        default: false
    }
});
const emits = defineEmits(['update:modelValue', 'change', 'drag']);

const runway = ref(null);
const dot = ref(null);

const progress = computed(() => {
    return ((props.modelValue * 100) / (props.max - props.min)).toFixed(2) + '%';
});

// 计算精度
const precision = computed(() => {
    const precisions = [props.min, props.max, props.step].map((item) => {
        const decimal = `${item}`.split('.')[1];
        return decimal ? decimal.length : 0;
    });
    return Math.max.apply(null, precisions);
});

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
    emits('drag');
};

// 拖动结束
const onDragEnd = () => {
    window.removeEventListener('mousemove', onDragging);
    window.removeEventListener('mouseup', onDragEnd);
    // 拖动结束后再触发change事件
    emits('change', props.modelValue);
};

// 拖动中
const onDragging = (ev) => {
    let e = ev || window.event;

    // 拖动的距离
    let diff = e.clientX - initData.startX;

    // 新的位置 = 按钮距左侧距离 + 拖动距离
    let newL = initData.startPosition + diff;
    updateNewValue(newL);
};

const slider = ref(null);
// 点选位置
const onPick = (ev) => {
    let newL = ev.clientX - slider.value.getBoundingClientRect().left;
    const newValue = updateNewValue(newL);
    emits('change', newValue);
};

// 更新value
const updateNewValue = (newL) => {
    const { offsetWidth: runwayW } = runway.value;
    // 新的位置不可为负
    if (newL < 0) {
        newL = 0;
    }
    // 新的位置不可超过滑轨长度
    if (newL >= runwayW) {
        newL = runwayW;
    }
    // 总步数
    const totalSteps = (props.max - props.min) / props.step;
    // 改变为新值需要的步数
    const steps = Math.round((newL / runwayW) * totalSteps);
    // 新值
    let value = steps * props.step + props.min;
    value = Number.parseFloat(value.toFixed(precision.value));
    emits('update:modelValue', value);
    return value;
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
