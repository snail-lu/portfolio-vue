<template>
    <el-row type="flex">
        <el-col :span="10">
            <el-row>待选区</el-row>
            <el-table
                :data="fullTableData"
                style="width: 100%"
                @selection-change="onFullTabelSelect">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址">
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="4">
            <el-button>添加</el-button>
            <el-button>删除</el-button>
        </el-col>
        <el-col :span="10">
            <el-row>已选区</el-row>
            <el-table
                :data="selectedTableData"
                style="width: 100%"
                @selection-change="onSelectedTableSelect">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址">
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        data() {
            return {
                fullTableData: [{
                    id: '1',
                    name: '张帅',
                    address: '南京市秦淮区秦虹路98号',
                }, {
                    id: '2',
                    name: '王帅',
                    address: '北京市朝阳区东三环北路甲26号',
                }, {
                    id: '3',
                    name: '刘帅',
                    address: '上海市浦东新区潍坊西路与浦城路交叉路口往西北约50米',
                }, {
                    id: '4',
                    name: '孟帅',
                    address: '湖北省武汉市硚口区解放大道586号',
                }],
                selectedTableData: []
            }
        },
        methods: {
            onFullTabelSelect(rows) {
                this.filterAdd(rows,this.selectedTableData,'id');
            },
            onSelectedTableSelect(rows) {
                this.filterDelete(rows,this.selectedTableData, 'id')
            },

            /**
             * 根据选中项去重添加到array中
             * @param {array} records   待添加数据
             * @param {array} targetRecords   目标数据
             * @param {string} compareProperty  对比的重复属性
             * @param {boolean} isEnd   往尾部添加？默认往头部添加
             */
            filterAdd (records=[], targetRecords=[], compareProperty, isEnd = false) {
                const o = {}
                records.forEach(record=>{
                    o[record[compareProperty]] = 1;
                })
                records.forEach(record=>{
                    if(!o[record[compareProperty]]) {
                        if (isEnd) {
                            targetRecords.push(record);
                        } else {
                            targetRecords.unshift(record);
                        }
                    }
                })
            },

            /**
             * 删除数组中数据
             * @param {array} records   待删除数据
             * @param {array} targetRecords   目标数据
             * @param {string} compareProperty  对比的重复属性
             */
            filterDelete (records=[], targetRecords=[], compareProperty) {
                const o = {}
                records.forEach(record=>{
                    o[record[compareProperty]] = 1;
                })
                for (let j = 0; j < targetRecords.length; j++) {
                   const record = targetRecords[j]
                   if (o[record[compareProperty]]) {
                       targetRecords.splice(j, 1)
                   }
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>