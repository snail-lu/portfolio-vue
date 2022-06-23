<template>
    <div class="calendar">
        <div class="calendar__header">
            <div class="calendar__title">
                {{ currentDate }}
            </div>
            <div class="calendar__button-group">
                <button class="btn" @click="selectDate('prev-month')">上个月</button>
                <button class="btn" @click="selectDate('today')">今天</button>
                <button class="btn" @click="selectDate('next-month')">下个月</button>
            </div>
        </div>
        <div class="calendar__body">
            <date-table :date="date" :schedule="schedule" />
        </div>
    </div>
</template>

<script>
import DateTable from './date-table'
import { dateFormat } from '@/utils/date'

export default {
    name: 'Calendar',
    components: {
        DateTable
    },
    props: {
        schedule: Array
    },

    provide() {
        return {
            Calendar: this
        }
    },
    data() {
        return {
            selectedDay: '',
            now: new Date()
        }
    },

    methods: {
        /**
         * 切换上一月/今天/下一月
         *
         * @param {string} type 切换类型
         *
         */
        selectDate(type) {
            let day = ''
            if (type === 'prev-month') {
                day = `${this.prevMonthDatePrefix}-01` // 切换成上个月1号
            } else if (type === 'next-month') {
                day = `${this.nextMonthDatePrefix}-01` // 切换成下个月1号
            } else {
                day = this.formatedToday
            }

            this.selectedDay = day
        },

        // 点选某一天
        pickDay(cell) {
            this.$emit('pick-day', cell)
        },
        // 点选某一日程
        pickSchedule(schedule) {
            const { id, title } = schedule
            this.$emit('pick-schedule', { id, title })
        }
    },

    computed: {
        // 上个月月份前缀
        prevMonthDatePrefix() {
            const temp = new Date(this.date.getTime())
            temp.setDate(0)
            return dateFormat(temp, 'yyyy-mm')
        },

        // 下个月月份前缀
        nextMonthDatePrefix() {
            const temp = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1)
            return dateFormat(temp, 'yyyy-mm')
        },

        // 当前显示的月份
        currentDate() {
            const year = this.date.getFullYear()
            const month = this.date.getMonth() + 1
            return `${year} 年 ${month} 月`
        },

        // 格式化今日
        formatedToday() {
            return dateFormat(this.now, 'yyyy-mm-dd')
        },

        // 日历要展示的日期
        date() {
            if (this.selectedDay) {
                const d = this.selectedDay.split('-')
                return new Date(d[0], d[1] - 1, d[2])
            }
            return this.now
        }
    }
}
</script>
<style lang="scss" scoped>
.calendar {
    background-color: #fff;
}
.calendar__header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 12px 20px;
    border-bottom: 1px solid #ebeef5;
}
.calendar__title {
    color: #000;
    -ms-flex-item-align: center;
    align-self: center;
}
.calendar__body {
    padding: 12px 20px 35px;
}

.calendar__button-group {
    .btn {
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: 0.1s;
        font-weight: 500;
        font-size: 12px;
        padding: 7px 15px;
        &:hover {
            background-color: #ecf5ff;
            color: #44a2fd;
        }
    }
    & > .btn:not(:last-child) {
        margin-right: -1px;
    }
}
</style>
