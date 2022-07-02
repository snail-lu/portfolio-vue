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
    w: {
        type: Number,
        default: 200
    },
    h: {
        type: Number,
        default: 200
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
const newWidth = ref(props.w);
const newHeight = ref(props.h);

// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(dragger, {
    initialValue: { x: props.x, y: props.y }
});

useResizeObserver(resizer, (entries) => {
    const entry = entries[0];
    const { width, height } = entry.contentRect;
    if (width && height) {
        newWidth.value = width;
        newHeight.value = height;
    }

    text.value = `width: ${width}, height: ${height}`;
});

const sizeStyle = computed(() => {
    return `width:${newWidth.value - 3}px;height:${newHeight.value - 3}px`;
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
        width: calc(100% + 3px);
        height: calc(100% + 3px);
        background: transparent;
        z-index: 1;
        border: none;
    }
}
</style>
