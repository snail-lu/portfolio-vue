<template>
	<div class="demo-container">
		<el-row>
			<el-link
				icon="el-icon-link"
				href="https://snail-lu.github.io/2020-05-07-element-ui-zhong-biao-ge-zi-ding-yi-pai-xu.html"
				>表格自定义排序</el-link
			>
		</el-row>
		<el-table
			:data="tableData"
			stripe
			style="margin: 0 auto"
			@sort-change="onSortChange"
			:header-cell-style="{ background: '#F5F7FA', color: '#606266', textAlign: 'center' }"
			:cell-style="{ textAlign: 'center' }"
		>
			<el-table-column
				prop="date"
				label="日期"
				width="180"
				sortable="custom"
				:sort-orders="['ascending', 'descending']"
			/>
			<el-table-column prop="name" label="姓名" width="180" />
			<el-table-column prop="address" label="地址" />
			<el-table-column prop="sort" label="排序" sortable="custom" :sort-orders="['ascending', 'descending']" />
			<el-table-column label="状态">
				<template slot-scope="scope">{{ scope.row.status | statusFormat }}</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tableData: [
				{
					date: '2014-12-02',
					name: '张帅',
					address: '南京市秦淮区秦虹路98号',
					sort: 100,
					status: 1
				},
				{
					date: '2016-06-04',
					name: '王帅',
					address: '北京市朝阳区东三环北路甲26号',
					sort: 15,
					status: 0
				},
				{
					date: '2012-03-01',
					name: '刘帅',
					address: '上海市浦东新区潍坊西路与浦城路交叉路口往西北约50米',
					sort: 8,
					status: 1
				},
				{
					date: '2018-11-03',
					name: '孟帅',
					address: '湖北省武汉市硚口区解放大道586号',
					sort: 1,
					status: 0
				}
			]
		}
	},
	filters: {
		statusFormat: function (value) {
			return value == '0' ? '已离职' : '在职'
		}
	},
	methods: {
		/**
		 * 表格排序事件处理函数
		 * @param {object} {column,prop,order} 列数据|排序字段|排序方式
		 */
		onSortChange({ prop, order }) {
			this.tableData.sort(this.compare(prop, order))
		},

		/**
		 * 排序比较
		 * @param {string} propertyName 排序的属性名
		 * @param {string} sort ascending(升序)/descending(降序)
		 * @return {function}
		 */
		compare(propertyName, sort) {
			return function (obj1, obj2) {
				var value1 = obj1[propertyName]
				var value2 = obj2[propertyName]
				if (typeof value1 === 'string' && typeof value2 === 'string') {
					const res = value1.localeCompare(value2, 'zh')
					return sort === 'ascending' ? res : -res
				} else {
					if (value1 <= value2) {
						return sort === 'ascending' ? -1 : 1
					} else if (value1 > value2) {
						return sort === 'ascending' ? 1 : -1
					}
				}
			}
		}
	}
}
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
}
</style>
