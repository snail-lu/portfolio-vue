<template>
    <div :class="[vertical ? 'slider-vertical' : 'slider']" ref="slider">
        <div class="slider-runway" @click="onPick" ref="runway">
            <div class="slider-bar" :style="barStyle"></div>
            <div class="slider-dot" :style="dotStyle" @mousedown="onDragStart" ref="dot"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';

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

const stle = reactive({
    width: '40%'
});
const barStyle = computed(() => {
    return props.vertical ? { height: progress.value } : { width: progress.value };
});
const dotStyle = computed(() => {
    return props.vertical ? { bottom: progress.value } : { left: progress.value };
});
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
    initData.start = props.vertical ? ev.clientY : ev.clientX;
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
    let diff = props.vertical ? e.clientY - initData.start : e.clientX - initData.start;

    // 新的位置 = 按钮距左侧距离 + 拖动距离
    let newL = initData.startPosition + diff;
    updateNewValue(newL);
};

const slider = ref(null);
// 点选位置
const onPick = (ev) => {
    let newL = props.vertical ? slider.value.getBoundingClientRect().bottom - ev.clientY : ev.clientX - slider.value.getBoundingClientRect().left;
    const newValue = updateNewValue(newL);
    emits('change', newValue);
};

// 更新value
const updateNewValue = (newL) => {
    const { offsetWidth, offsetHeight } = runway.value;
    const sliderWidth = props.vertical ? offsetHeight : offsetWidth;
    // 新的位置不可为负
    if (newL < 0) {
        newL = 0;
    }
    // 新的位置不可超过滑轨长度
    if (newL >= sliderWidth) {
        newL = sliderWidth;
    }
    // 总步数
    const totalSteps = (props.max - props.min) / props.step;
    // 改变为新值需要的步数
    const steps = Math.round((newL / sliderWidth) * totalSteps);
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

    .slider-runway {
        height: 3px;
        background-color: rgba(255, 255, 255, 0.3);
        position: relative;
        border-radius: 3px;
    }

    .slider-bar {
        background-color: #ec4141;
        position: absolute;
        height: 3px;
        width: 0;
        border-radius: 3px;
        top: 0;
        left: 0%;
    }

    .slider-dot {
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

.slider-vertical {
    height: 100%;
    width: 20px;
    display: flex;
    justify-content: center;

    .slider-runway {
        height: 100%;
        width: 4px;
        background-color: rgba(255, 255, 255, 0.3);
        position: relative;
        border-radius: 4px;
        cursor: pointer;
    }

    .slider-bar {
        background-color: #ec4141;
        position: absolute;
        width: 4px;
        height: 0;
        border-radius: 3px;
        bottom: 0;
        left: 0;
    }

    .slider-dot {
        background-color: #ec4141;
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 50%);
        cursor: pointer;
    }
}
</style>
