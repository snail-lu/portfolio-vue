<template>
    <!-- <vue-draggable-resizable
        :x="x"
        :y="y"
        :w="width"
        :h="height"
        @dragging="onDrag"
        @resizing="onResize"
        :parent="true"
        class-name="my-photo"
    > -->
    <DraggableResizableBox>
        <div class="close-icon" title="删除" @click="onDelete">×</div>
        <img class="pic" :src="src" @load="onImgLoad" />
    </DraggableResizableBox>

    <!-- </vue-draggable-resizable> -->
</template>

<script>
import DraggableResizableBox from '@/components/DraggableResizableBox/index.vue';
export default {
    components: {
        DraggableResizableBox
    },
    props: {
        src: {
            type: String,
            default: ''
        },
        startX: {
            type: Number,
            default: 0
        },
        startY: {
            type: Number,
            default: 0
        },
        initialWidth: {
            type: Number,
            default: 200
        },
        initialHeight: {
            type: Number,
            default: 200
        }
    },
    data() {
        return {
            x: this.startX,
            y: this.startY,
            width: this.initialWidth,
            height: this.initialHeight
        };
    },
    methods: {
        onResize(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        },
        onDrag(x, y) {
            this.x = x;
            this.y = y;
        },
        onDelete() {
            this.$emit('onDelete');
        },
        onImgLoad(data) {
            console.log(data, 'img data');
        }
    }
};
</script>

<style lang="scss" scoped>
.my-photo {
    background-color: #fff;
    padding: 20px;
    position: absolute;

    &:hover {
        .close-icon {
            display: block;
        }
    }
}

.close-icon {
    display: none;
    position: absolute;
    top: 2px;
    right: 4px;
    cursor: pointer;
    font-size: 18px;
    color: #999;
}

.pic {
    width: 100%;
    object-fit: contain;
    height: 100%;
}
</style>
