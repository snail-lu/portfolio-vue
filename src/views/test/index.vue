<template>
    <div class="masonry">
        <Waterfall :data="data" />
    </div>
</template>

<script>
import Waterfall from './waterfall/index.vue';
import { getMinValueIndexOfArr } from '@/utils/index';
export default {
    components: {
        Waterfall
    },
    data() {
        return {
            demoInfo: {
                title: '瀑布流',
                url: ''
            },
            data: []
        };
    },
    created() {
        this.initData();
    },
    methods: {
        async initData() {
            let res = await this.req({
                url: '/masonry/list'
            });
            if (res.result && res.result.list) {
                this.data = res.result.list;
            }
        },

        // 根据列高度来决定下个数据要插入的列
        insertData() {
            this.$nextTick(() => {
                const { data, insertIndex } = this;
                if (insertIndex < data.length) {
                    const column1Height = this.$refs.column1.offsetHeight;
                    const column2Height = this.$refs.column2.offsetHeight;
                    const column3Height = this.$refs.column3.offsetHeight;
                    const minColumnIndex = getMinValueIndexOfArr([column1Height, column2Height, column3Height]);
                    // debugger;

                    this[`data${minColumnIndex + 1}`].push(data[insertIndex]);
                    this.insertIndex = insertIndex + 1;
                    this.insertData();
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.masonry {
    display: flex;
    justify-content: center;
}
</style>
