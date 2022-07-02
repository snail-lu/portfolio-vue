<template>
    <demo :data="demoInfo">
        <el-button @click="onPrint" type="primary" size="mini" style="margin-bottom: 20px">打印所有已选数据ID</el-button>
        <span v-if="showSelectedGoods">{{ selectedGoodsIdsAll.length ? selectedGoodsIdsAll.join(' ') : '' }}</span>
        <el-table
            ref="multipleTable"
            :data="tableData"
            v-loading="tableLoading"
            border
            height="450"
            :header-cell-style="{ background: '#F5F7FA', color: '#606266', textAlign: 'center' }"
            :cell-style="{ textAlign: 'center' }"
            @select="handleSelectionChange"
            @select-all="handleSelectionChange"
        >
            <el-table-column type="selection" />
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="goodsName" label="商品名称" />
            <el-table-column prop="goodsCode" label="款号" />
            <el-table-column prop="goodsPrice" label="吊牌价格（元）" />
        </el-table>
        <div class="flex-box flex-h-end">
            <el-pagination
                background
                layout="total,prev,sizes, pager, next"
                :total="goodsTotal"
                :page-size="goodsForm.pageInfo.pageSize"
                :current-page="goodsForm.pageInfo.pageNum"
                @size-change="handleGoodsSizeChange"
                @current-change="handleGoodsPageChange"
                :page-sizes="[5, 10]"
            />
        </div>
    </demo>
</template>

<script>
import Demo from '@/components/Demo/index.vue';
export default {
    components: {
        Demo
    },
    name: 'TableSelect',
    data() {
        return {
            demoInfo: {
                title: '表格分页多选',
                url: 'https://snail-lu.vercel.app/2021-11-11-element-ui-zhong-el-table-fan-ye-duo-xuan-shi-xian.html'
            },
            tableData: [],
            goodsTotal: 0,
            tableLoading: false,
            selectedGoodsIds: [], // 当前页中已选数据
            selectedGoodsIdsOther: [], // 其它页中已选的数据
            selectedGoodsIdsAll: [], // 所有已选数据
            showSelectedGoods: false,
            goodsForm: {
                pageInfo: {
                    pageNum: 1,
                    pageSize: 5
                }
            }
        };
    },
    created() {
        // this.onSearch()
        this.onSearchGoods();
    },
    methods: {
        // 切换页码
        handleGoodsPageChange(currentPage) {
            this.getAllSelectedGoodsId();
            this.goodsForm.pageInfo.pageNum = currentPage;
            this.onSearchGoods();
        },
        // 切换每页条数
        handleGoodsSizeChange(currentPage) {
            this.getAllSelectedGoodsId();
            this.goodsForm.pageInfo.pageSize = currentPage;
            this.onSearchGoods();
        },

        // 搜索商品
        onSearchGoods() {
            this.tableLoading = true;
            this.queryGoods(this.goodsForm).then(
                (res) => {
                    this.tableData = res.list;
                    this.toggleSelection();
                    this.goodsTotal = res.total;
                    this.tableLoading = false;
                },
                () => {
                    this.tableLoading = false;
                }
            );
        },

        // 设置表格选中效果
        toggleSelection() {
            const selectedGoodsIds = [];
            const selectedGoodsIdsOther = this.selectedGoodsIdsAll.slice();
            this.$nextTick(() => {
                this.tableData.forEach((goods) => {
                    if (this.selectedGoodsIdsAll.includes(goods.id)) {
                        this.$refs.multipleTable.toggleRowSelection(goods, true);
                        // 拆分当前页数据和其它页数据
                        selectedGoodsIds.push(goods.id);
                        const index = selectedGoodsIdsOther.indexOf(goods.id);
                        selectedGoodsIdsOther.splice(index, 1);
                    }
                });
                this.selectedGoodsIds = selectedGoodsIds;
                this.selectedGoodsIdsOther = selectedGoodsIdsOther;
            });
        },

        // 商品选择
        handleSelectionChange(tableData) {
            this.selectedGoodsIds = tableData.map((goods) => goods.id);
        },

        // 获得全部数据
        getAllSelectedGoodsId() {
            const { selectedGoodsIds, selectedGoodsIdsOther } = this;
            this.selectedGoodsIdsAll = [...selectedGoodsIdsOther, ...selectedGoodsIds];
        },

        // 打印数据
        onPrint() {
            this.showSelectedGoods = true;
            this.getAllSelectedGoodsId();
        },

        // 模拟接口获取数据
        queryGoods(params) {
            const { pageInfo } = params;
            const { pageNum, pageSize } = pageInfo;
            const data = [
                { id: 1, goodsName: '测试商品1', goodsCode: '000001', goodsPrice: 101 },
                { id: 2, goodsName: '测试商品2', goodsCode: '000002', goodsPrice: 102 },
                { id: 3, goodsName: '测试商品3', goodsCode: '000003', goodsPrice: 103 },
                { id: 4, goodsName: '测试商品4', goodsCode: '000004', goodsPrice: 104 },
                { id: 5, goodsName: '测试商品5', goodsCode: '000005', goodsPrice: 105 },
                { id: 6, goodsName: '测试商品6', goodsCode: '000006', goodsPrice: 106 },
                { id: 7, goodsName: '测试商品7', goodsCode: '000007', goodsPrice: 107 },
                { id: 8, goodsName: '测试商品8', goodsCode: '000008', goodsPrice: 108 },
                { id: 9, goodsName: '测试商品9', goodsCode: '000009', goodsPrice: 109 },
                { id: 10, goodsName: '测试商品10', goodsCode: '0000010', goodsPrice: 110 }
            ];
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        list: data.slice((pageNum - 1) * pageSize, pageNum * pageSize),
                        total: data.length
                    });
                }, 1000);
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.demo-container {
    padding: 50px 25%;

    .el-row {
        text-align: center;
        margin-bottom: 10px;
    }

    .el-link {
        font-size: 18px;
        margin-bottom: 10px;
        text-align: center;
    }

    .el-button {
        margin: 0 10px 10px 0;
    }
}
</style>
