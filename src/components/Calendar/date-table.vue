<template>
    <table
        :class="{
            'calendar-table': true
        }"
        :cellspacing="0"
        :cellpadding="0"
    >
        <thead>
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
                    <div class="calendar-day">
                        <span>{{ cell.text }}</span>
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
        selectedDay: String, // formated date yyyy-MM-dd
        date: Date,
        hideHeader: Boolean
    },

    inject: ['Calendar'],

    data() {
        return {
            WEEK_DAYS: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        }
    },

    methods: {
        toNestedArr(days) {
            return rangeArr(days.length / 7).map((_, index) => {
                const start = index * 7
                return days.slice(start, start + 7)
            })
        },

        getFormateDate(day, type) {
            if (!day || ['prev', 'current', 'next'].indexOf(type) === -1) {
                throw new Error('invalid day or type')
            }
            let prefix = this.curMonthDatePrefix
            if (type === 'prev') {
                prefix = this.prevMonthDatePrefix
            } else if (type === 'next') {
                prefix = this.nextMonthDatePrefix
            }
            day = `00${day}`.slice(-2)
            return `${prefix}-${day}`
        },

        getCellClass({ text, type }) {
            const classes = [type]
            if (type === 'current') {
                const date = this.getFormateDate(text, type)
                if (date === this.selectedDay) {
                    classes.push('is-selected')
                }
                if (date === this.formatedToday) {
                    classes.push('is-today')
                }
            }
            return classes
        }

        // cellRenderProxy({ text, type }) {
        //     // let render = this.Calendar.$scopedSlots.dateCell
        //     // if (!render) return <span>{text}</span>

        //     const day = this.getFormateDate(text, type)
        //     const date = new Date(day)
        //     const data = {
        //         isSelected: this.selectedDay === day,
        //         type: `${type}-month`,
        //         day
        //     }
        //     console.log(data, 'data')
        //     // return render({ date, data })
        // }
    },

    computed: {
        prevMonthDatePrefix() {
            const temp = new Date(this.date.getTime())
            temp.setDate(0)
            return dateFormat(temp, 'yyyy-mm')
        },

        curMonthDatePrefix() {
            return dateFormat(this.date, 'yyyy-mm')
        },

        nextMonthDatePrefix() {
            const temp = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1)
            return dateFormat(temp, 'yyyy-mm')
        },

        formatedToday() {
            return this.Calendar.formatedToday
        },

        rows() {
            let days = []

            const date = this.date
            let firstDay = getFirstDayOfMonth(date)
            firstDay = firstDay === 0 ? 7 : firstDay
            const prevMonthDays = getPrevMonthLastDays(date, firstDay - 1).map((day) => ({
                text: day,
                type: 'prev'
            }))
            const currentMonthDays = getMonthDays(date).map((day) => ({
                text: day,
                type: 'current'
            }))
            days = [...prevMonthDays, ...currentMonthDays]
            const nextMonthDays = rangeArr(42 - days.length).map((_, index) => ({
                text: index + 1,
                type: 'next'
            }))
            days = days.concat(nextMonthDays)

            return this.toNestedArr(days)
        },

        weekDays() {
            const start = this.firstDayOfWeek
            const { WEEK_DAYS } = this

            if (typeof start !== 'number' || start === 0) {
                return WEEK_DAYS.slice()
            } else {
                return WEEK_DAYS.slice(start).concat(WEEK_DAYS.slice(0, start))
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.calendar-table {
    table-layout: fixed;
    width: 100%;
}
.calendar-table thead th {
    padding: 12px 0;
    color: #606266;
    font-weight: 400;
}
.calendar-table td.next,
.calendar-table td.prev {
    color: #c0c4cc;
}
.calendar-table td {
    border-bottom: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    vertical-align: top;
    -webkit-transition: background-color 0.2s ease;
    transition: background-color 0.2s ease;
}
.calendar-table td.is-selected {
    background-color: #f2f8fe;
}
.calendar-table td.is-today {
    color: #409eff;
}
.calendar-table tr:first-child td {
    border-top: 1px solid #ebeef5;
}
.calendar-table tr td:first-child {
    border-left: 1px solid #ebeef5;
}
.calendar-table tr.calendar-table__row--hide-border td {
    border-top: none;
}
.calendar-table .calendar-day {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 8px;
    height: 85px;
}
.calendar-table .calendar-day:hover {
    cursor: pointer;
    background-color: #f2f8fe;
}
</style>
