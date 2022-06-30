<template>
    <demo :data="demoInfo">
        <div class="masonry">
            <div class="colmun" ref="column1">
                <img class="item" :src="i.img" :key="i.id" v-for="i in data1" :title="i.id" />
            </div>
            <div class="colmun" ref="column2">
                <img class="item" :src="i.img" :key="i.id" v-for="i in data2" :title="i.id" />
            </div>
            <div class="colmun" ref="column3">
                <img class="item" :src="i.img" :key="i.id" v-for="i in data3" :title="i.id" />
            </div>
        </div>
    </demo>
</template>

<script>
import { getMinValueIndexOfArr } from '@/utils/index';
import Demo from '@/components/Demo/index.vue';
export default {
    components: {
        Demo
    },
    data() {
        return {
            demoInfo: {
                title: '瀑布流',
                url: ''
            },
            data: [], // 完整的data
            insertIndex: 0, // 数据插入记号
            //第一列
            data1: [],
            //第二列
            data2: [],
            //第三列
            data3: []
        };
    },
    created() {
        this.initData();
    },
    methods: {
        async initData() {
            let data = [];
            let res = await this.req({
                url: '/masonry/list'
            });
            if (res.data && res.data.list) {
                data = res.data.list;
            }
            this.data1.push(data[0]);
            this.data2.push(data[1]);
            this.data3.push(data[2]);
            this.insertIndex = 3;
            this.data = data.slice(0);

            this.insertData();
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
    // width: 50%;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    .colmun {
        display: inline-block;
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 0 2px;
        .item {
            margin-bottom: 5px;
            width: 100%;
        }
    }
}
</style>
