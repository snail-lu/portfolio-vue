<template>
    <vue-draggable-resizable :w="100" :h="100" @dragging="onDrag" @resizing="onResize" :parent="true">
        <p>
            Hello! I'm a flexible component. You can drag me around and you can resize me.<br />
            X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}
        </p>
    </vue-draggable-resizable>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
export default {
    components: {
        VueDraggableResizable
    },
    data() {
        return {
            x: 0,
            y: 0,
            width: 100,
            height: 100
        }
    },
    methods: {
        onResize(x, y, width, height) {
            this.x = x
            this.y = y
            this.width = width
            this.height = height
        },
        onDrag(x, y) {
            this.x = x
            this.y = y
        }
    }
}
</script>

<style lang="scss" scoped></style>
