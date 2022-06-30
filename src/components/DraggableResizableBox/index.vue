<template>
    <div :style="fullStyle" class="draggable-resizable-box">
        <div ref="dragger" class="dragger"></div>
        <slot></slot>
        <textarea ref="resizer" class="resizer" disabled></textarea>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useDraggable, useResizeObserver } from '@vueuse/core';

const props = defineProps({
    width: {
        type: Number,
        default: 200
    },
    height: {
        type: [String, Number],
        default: 'auto'
    },
    x: {
        type: Number,
        default: 0
    },
    y: {
        type: Number,
        default: 0
    }
});

const dragger = ref(null);
const resizer = ref(null);
const text = ref('');
const newWidth = ref(props.width);
const newHeight = ref(props.height);

// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(dragger, {
    initialValue: { x: props.x, y: props.y }
});

useResizeObserver(resizer, (entries) => {
    const entry = entries[0];
    const { width, height } = entry.contentRect;
    newWidth.value = width;
    newHeight.value = height;
    text.value = `width: ${width}, height: ${height}`;
});

const sizeStyle = computed(() => {
    return `width:${newWidth.value - 5}px;height:${newHeight.height - 5}px`;
});
const fullStyle = computed(() => {
    return `${style.value}${sizeStyle.value}`;
});
</script>

<style lang="scss" scoped>
.draggable-resizable-box {
    z-index: 10;
    cursor: move;
    touch-action: none;
    user-select: none;
    position: fixed;
    // overflow: hidden;

    .dragger {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
    }

    .resizer {
        position: absolute;
        left: 0;
        top: 0;
        width: calc(100% + 5px);
        height: calc(100% + 5px);
        background: transparent;
        z-index: 1;
        border: none;
    }
}
</style>