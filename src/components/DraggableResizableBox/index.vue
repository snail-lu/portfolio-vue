<template>
    <div ref="el" :style="fullStyle" class="draggable-resizable-box">
        <slot></slot>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useDraggable } from '@vueuse/core';

const props = defineProps({
    width: {
        type: Number,
        default: 200
    },
    height: {
        type: Number,
        default: 200
    }
});

const el = ref(null);

// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(el, {
    initialValue: { x: 100, y: 200 }
});

console.log(style, 'style');

const fullStyle = computed(() => {
    return `${style.value}width:${props.width}px;height:${props.height}px`;
});
</script>

<style lang="scss" scoped>
.draggable-resizable-box {
    z-index: 10;
    cursor: move;
    touch-action: none;
    user-select: none;
    position: fixed;
    overflow: hidden;
}
</style>
