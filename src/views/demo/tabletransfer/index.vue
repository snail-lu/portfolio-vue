<template>
    <demo :data="demoInfo">
        <el-row type="flex">
            <el-col :span="10">
                <el-row>待选区</el-row>
                <el-table
                    :data="table1Data"
                    style="width: 100%"
                    ref="table1"
                    stripe
                    @selection-change="onTable1Select"
                    :header-cell-style="{ background: '#F5F7FA', color: '#606266', textAlign: 'center' }"
                    :cell-style="{ textAlign: 'center' }"
                >
                    <el-table-column type="selection" />
                    <el-table-column prop="name" label="姓名" />
                    <el-table-column label="性别">
                        <template slot-scope="scope">{{ scope.row.sex | sexFilter }}</template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="4" class="btn-groups">
                <el-button type="primary" @click="onAdd">添加</el-button>
                <el-button @click="onDelete" style="margin-left: 0; margin-top: 10px">删除</el-button>
            </el-col>
            <el-col :span="10">
                <el-row>已选区</el-row>
                <el-table
                    :data="table2Data"
                    style="width: 100%"
                    ref="table2"
                    strip
                    @selection-change="onTable2Select"
                    :header-cell-style="{ background: '#F5F7FA', color: '#606266', textAlign: 'center' }"
                    :cell-style="{ textAlign: 'center' }"
                >
                    <el-table-column type="selection" />
                    <el-table-column prop="name" label="姓名" />
                    <el-table-column label="性别">
                        <template slot-scope="scope">{{ scope.row.sex | sexFilter }}</template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </demo>
</template>

<script>
import Demo from '@/components/Demo'
export default {
    components: {
        Demo
    },
    filters: {
        sexFilter(val) {
            const map = { 1: '男', 2: '女' }
            return map[val]
        }
    },
    data() {
        return {
            demoInfo: {
                title: '表格穿梭',
                url: 'https://snail-lu.vercel.app/2020-05-08-element-ui-zhong-biao-ge-chuan-suo-gong-neng.html'
            },
            table1Data: [
                {
                    id: '1',
                    name: '张帅',
                    sex: 1
                },
                {
                    id: '2',
                    name: '王帅',
                    sex: 1
                },
                {
                    id: '3',
                    name: '刘帅',
                    sex: 1
                },
                {
                    id: '4',
                    name: '孟帅',
                    sex: 1
                },
                {
                    id: '5',
                    name: '牛帅',
                    sex: 1
                },
                {
                    id: '6',
                    name: '孙帅',
                    sex: 1
                }
            ],
            table2Data: [],
            selectedTable1Data: [], // table1已选数据
            selectedTable2Data: [] // table2已选数据
        }
    },
    methods: {
        /**
         * table1选择事件处理函数
         * @param {array} rows 已勾选的数据
         */
        onTable1Select(rows) {
            this.selectedTable1Data = [...rows]
        },

        /**
         * table2选择事件处理函数
         * @param {array} rows 已勾选的数据
         */
        onTable2Select(rows) {
            this.selectedTable2Data = [...rows]
        },

        /**
         * 添加按钮事件处理函数
         */
        onAdd() {
            this.filterAdd(this.selectedTable1Data, this.table2Data, 'id')
            this.selectedTable1Data = []
            this.$refs.table1.clearSelection()
        },

        /**
         * 删除按钮事件处理函数
         */
        onDelete() {
            this.table2Data = this.filterDelete(this.selectedTable2Data, this.table2Data, 'id')
            this.selectedTable2Data = []
        },

        /**
         * 根据选中项去重添加到array中
         * @param {array} records   待添加数据
         * @param {array} targetRecords   目标数据
         * @param {string} compareProperty  对比的重复属性
         * @param {boolean} isEnd   往尾部添加？默认往头部添加
         */
        filterAdd(records = [], targetRecords = [], compareProperty, isEnd = false) {
            const o = new Set()
            targetRecords.forEach((record) => {
                o.add(record[compareProperty])
            })
            records.forEach((record) => {
                if (!o.has(record[compareProperty])) {
                    if (isEnd) {
                        targetRecords.push(record)
                    } else {
                        targetRecords.unshift(record)
                    }
                }
            })
        },

        /**
         * 删除数组中数据
         * @param {array} records   待删除数据
         * @param {array} targetRecords   目标数据
         * @param {string} compareProperty  对比的重复属性
         * @return {array} 删除待删除数据后的目标数据
         */
        filterDelete(records = [], targetRecords = [], compareProperty) {
            const o = new Set()
            records.forEach((record) => {
                o.add(record[compareProperty])
            })

            return targetRecords.filter((item) => !o.has(item[compareProperty]))
        }
    }
}
</script>

<style lang="scss" scoped>
.el-row {
    text-align: center;
    margin-bottom: 10px;
}

.el-link {
    font-size: 18px;
    margin-bottom: 10px;
    text-align: center;
}

.btn-groups {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
