<template>
    <vue-draggable-resizable
        :w="width"
        :h="height"
        @dragging="onDrag"
        @resizing="onResize"
        :parent="true"
        class-name="my-photo"
    >
        <img class="pic" :src="src" />
    </vue-draggable-resizable>
</template>

<script>
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
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
            width: 200,
            height: 300
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
    background-color: #fff;
    padding: 20px;
    position: absolute;

    .pic {
        width: 100%;
        height: 100%;
    }
}
</style>
