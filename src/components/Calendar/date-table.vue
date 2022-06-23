<template>
    <table class="calendar-table" :cellspacing="0" :cellpadding="0">
        <thead class="calendar-table-head">
            <th v-for="day in weekDays" :key="day">{{ day }}</th>
        </thead>
        <tbody>
            <tr
                v-for="(row, index) in rows"
                :key="index"
                :class="{
                    'calendar-table__row': true
                }"
            >
                <td v-for="(cell, key) in row" :key="key" :class="getCellClass(cell)">
                    <div class="calendar-day" @click="onPickDay(cell)">
                        <span>{{ cell.text }}</span>
                        <div v-for="(schedule, idx) in scheduleList[index]" :key="idx">
                            <div class="schedule-placeholder" v-if="schedule[key].isPlaceholder"></div>

                            <div
                                class="schedule-item"
                                :class="{ 'is-start': schedule[key].isStart }"
                                :style="{ 'background-color': schedule[key].bgColor }"
                                v-else
                            >
                                {{ schedule[key].showTitle ? schedule[key].title : '' }}
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import { getMonthDays, getFirstDayOfMonth, getPrevMonthLastDays, rangeArr, dateFormat } from '@/utils/date'

export default {
    props: {
        date: Date,
        schedule: Array
    },

    inject: ['Calendar'],

    data() {
        return {
            weekDays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    },

    methods: {
        // 根据日期的type，转换日期格式成yyyy-mm-dd
        getFormateDate(day, type) {
            let prefix = this.curMonthDatePrefix
            if (type === 'prev') {
                prefix = this.prevMonthDatePrefix
            } else if (type === 'next') {
                prefix = this.nextMonthDatePrefix
            }
            day = `0${day}`.slice(-2)
            return `${prefix}-${day}`
        },

        // 根据yyyy-mm-dd格式的日期获取时间戳
        getFormateDateTimestamp(date) {
            const d = date.split('-')
            return new Date(d[0], d[1] - 1, d[2]).getTime()
        },

        // 根据日期的type，赋予对应的展示样式
        getCellClass({ type, formatedDate }) {
            const classes = [type]
            if (type === 'current') {
                if (formatedDate === this.formatedToday) {
                    classes.push('is-today')
                }
            }
            return classes
        },

        // 日期对象包装
        transformMonthDays(days, type) {
            return days.map((day) => {
                const formatedDate = this.getFormateDate(day, type)
                const timestamp = this.getFormateDateTimestamp(formatedDate)
                return {
                    formatedDate,
                    timestamp,
                    text: day,
                    type
                }
            })
        },

        // 一维数组转为二维数组
        toNestedArr(days) {
            return rangeArr(days.length / 7).map((_, index) => {
                const start = index * 7
                return days.slice(start, start + 7)
            })
        },
        /**
         * 计算可以被插入的行
         * @param {Array} arr 二维数组 [[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],...]
         * @param {number} startIndex 起始index
         * @param {number} length 要插入的数据的长度
         */
        getInsertRow(arr, startIndex, length) {
            if (arr.length === 0) return 0
            const endIndex = startIndex + length > 7 ? 7 : startIndex + length + 1
            let row = -1
            for (let i = 0, len = arr.length; i < len; i++) {
                if (arr[i].slice(startIndex, endIndex).every((item) => item.isPlaceholder)) {
                    row = i
                    break
                }
            }
            return row
        },
        // 点击某一天
        onPickDay(cell) {
            this.$emit('pick', cell)
        }
    },

    computed: {
        // 上个月月份前缀
        prevMonthDatePrefix() {
            const temp = new Date(this.date.getTime())
            temp.setDate(0)
            return dateFormat(temp, 'yyyy-mm')
        },

        // 当前月月份前缀
        curMonthDatePrefix() {
            return dateFormat(this.date, 'yyyy-mm')
        },

        // 下个月月份前缀
        nextMonthDatePrefix() {
            const temp = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1)
            return dateFormat(temp, 'yyyy-mm')
        },

        // 格式化今日
        formatedToday() {
            return this.Calendar.formatedToday
        },

        // 行数据
        rows() {
            const { date } = this
            let days = []

            // 计算当前月份第一天是周几
            let firstDay = getFirstDayOfMonth(date)
            firstDay = firstDay === 0 ? 7 : firstDay
            // 截取获取上月尾部天数，组装数据
            const prevMonthDays = this.transformMonthDays(getPrevMonthLastDays(date, firstDay - 1), 'prev')
            // 本月天数，组装天数
            const currentMonthDays = this.transformMonthDays(getMonthDays(date), 'current')
            days = [...prevMonthDays, ...currentMonthDays]
            // 截取下个月头部天数，组装数据，总共显示42天
            const nextMonthDays = this.transformMonthDays(rangeArr(42 - days.length), 'next')
            days = days.concat(nextMonthDays)

            // 转换成二维数组形式
            return this.toNestedArr(days)
        },

        scheduleList() {
            // 六周日历数据对应六周的日程集合，每周下，可能有多个日程行
            const r = [[], [], [], [], [], []]
            const { rows, schedule } = this
            const bgColors = ['#99CCCC', '#99CCFF', '#FF99CC', '#FF9999', '#99CC66', '#FF9900', '#666699', '#FF6666']
            // 日程表数据中的起始和结束日期转为时间戳，便于后面进行时间范围判断
            const transformedSchedule = schedule.map((s, index) => {
                const startTimestamp = this.getFormateDateTimestamp(s.startDate)
                const endTimestamp = this.getFormateDateTimestamp(s.endDate)
                const durationDays = (endTimestamp - startTimestamp) / (24 * 60 * 60 * 1000)
                return {
                    ...s,
                    startTimestamp,
                    endTimestamp,
                    bgColor: bgColors[index % 9],
                    durationDays
                }
            })

            // 日程活动遍历，将活动数据填进对应的行中
            transformedSchedule.forEach((ts) => {
                // 对6周日历数据进行遍历
                rows.forEach((rowItem, rowIndex) => {
                    // 空日程行数据，7个元素，分别对应周一~周日
                    const schedulePlaceholderRow = [
                        {
                            isPlaceholder: true
                        },
                        {
                            isPlaceholder: true
                        },
                        {
                            isPlaceholder: true
                        },
                        {
                            isPlaceholder: true
                        },
                        {
                            isPlaceholder: true
                        },
                        {
                            isPlaceholder: true
                        },
                        {
                            isPlaceholder: true
                        }
                    ]
                    // 单周数据遍历，根据时间戳来判断遍历到的日期是否在活动时间内，是的话，将活动数据填充到该周日程行中
                    let insertRow = 0
                    rowItem.forEach((column, columnIndex) => {
                        // 当前日期是否在活动日期范围内
                        if (column.timestamp >= ts.startTimestamp && column.timestamp <= ts.endTimestamp) {
                            // 活动起始日标志
                            const isStart = column.timestamp === ts.startTimestamp
                            // 第rowIndex周日程数据集合
                            const scheduleRow = r[rowIndex]
                            if (isStart) {
                                // 根据起始日及跨度天数计算数据要插入到第几行日程行
                                insertRow = this.getInsertRow(scheduleRow, columnIndex, ts.durationDays)
                            }
                            // 当前周未插入过日程行
                            if (scheduleRow.length == 0) {
                                // 插入一个日程行
                                scheduleRow.push(schedulePlaceholderRow)
                            } else if (insertRow === -1) {
                                // 当前周之前的日程行中没有可以插入的位置，新增一个日程行
                                scheduleRow.push(schedulePlaceholderRow)
                                // 插入指针指向最后一行日程行
                                insertRow = scheduleRow.length - 1
                            }
                            // 修改当前周第insertRow行日程行的第columnIndex列数据
                            scheduleRow[insertRow][columnIndex] = {
                                isStart,
                                showTitle: isStart || columnIndex === 0,
                                title: ts.title || '',
                                id: ts.id,
                                bgColor: ts.bgColor
                            }
                        }
                    })
                })
            })
            return r
        }
    }
}
</script>
<style lang="scss" scoped>
.calendar-table {
    table-layout: fixed;
    width: 100%;

    &-head {
        background-color: #ecf5ff;
        th {
            padding: 12px 0;
            color: #606266;
            font-weight: 400;
        }
    }

    td {
        border-bottom: 1px solid #ebeef5;
        border-right: 1px solid #ebeef5;
        vertical-align: top;
        -webkit-transition: background-color 0.2s ease;
        transition: background-color 0.2s ease;

        &.next,
        &.prev {
            color: #c0c4cc;
        }

        &.is-selected {
            background-color: #f2f8fe;
        }

        &.is-today {
            color: #409eff;
        }
    }

    tr:first-child td {
        border-top: 1px solid #ebeef5;
    }

    tr td:first-child {
        border-left: 1px solid #ebeef5;
    }

    tr.calendar-table__row--hide-border td {
        border-top: none;
    }
}

.calendar-day {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    // padding: 8px;
    min-height: 85px;

    .schedule-placeholder {
        width: 100%;
        height: 20px;
        margin-bottom: 4px;
    }

    .schedule-item {
        width: 100%;
        height: 20px;
        background-color: #66cccc;
        color: #fff;
        font-size: 13px;
        line-height: 20px;
        margin-bottom: 4px;
        padding-left: 4px;
        box-sizing: border-box;
    }

    .is-start {
        margin-left: 4px;
        width: calc(100% - 4px);
    }

    &:hover {
        cursor: pointer;
        background-color: #f2f8fe;
    }
}
</style>
