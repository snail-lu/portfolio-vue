<template>
    <div class="slider">
        <div class="slider-runway">
            <div class="slider-bar"></div>
            <div class="slider-button" ref="dragger" :style="style"></div>
        </div>
    </div>
</template>

<script setup>
import { useDraggable } from '@vueuse/core';
import { ref } from 'vue';

// `style` will be a helper computed for `left: ?px; top: ?px;`
const dragger = ref(null);
const { style } = useDraggable(dragger, {
    initialValue: { x: 0, y: 0 }
});
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

            .slider-bar {
                height: 5px;
                border-radius: 5px;
            }
            .slider-button {
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

    &-button {
        background-color: #ec4141;
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 3px;
        top: 50%;
        left: 0%;
        transform: translateY(-50%);
    }
}
</style>
