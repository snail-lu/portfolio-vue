<template>
    <vue-draggable-resizable
        :w="100"
        :h="100"
        @dragging="onDrag"
        @resizing="onResize"
        :parent="true"
        class-name="my-photo"
    >
        <img :src="src" />
    </vue-draggable-resizable>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
export default {
    components: {
        VueDraggableResizable
    },
    props: {
        src: ''
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

<style lang="scss" scoped>
.my-photo {
    width: 100px;
    height: 100px;
    overflow: hidden;
}
</style>
