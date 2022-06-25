<template>
    <demo :data="demoInfo">
        <div class="grid">
            <div class="grid-sizer"></div>
            <div class="grid-item" :class="{ 'grid-item--height2': item % 2 == 0 }" v-for="item in 100" :key="item">
                {{ item }}
            </div>
        </div>
    </demo>
</template>

<script>
import Masonry from 'masonry-layout';
import Demo from '@/components/Demo';
export default {
    components: {
        Demo
    },
    data() {
        return {
            demoInfo: {
                title: '瀑布流',
                url: ''
            }
        };
    },
    mounted() {
        const grid = document.querySelector('.grid');
        const msnry = new Masonry(grid, {
            // options...
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            gutter: 10,
            percentPosition: true
        });
        // msnry.layout()
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
.grid {
    width: 50%;
    margin: 25px auto;

    .grid-sizer,
    .grid-item {
        width: 30%;
        height: 60px;
        line-height: 60px;
        text-align: center;
        background-color: green;
        margin-bottom: 10px;
        border-radius: 10px;
    }

    .grid-item--height2 {
        height: 140px;
        line-height: 140px;
    }
}
</style>
