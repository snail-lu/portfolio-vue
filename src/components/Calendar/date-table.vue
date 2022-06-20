<template>
    <table
        :class="{
            'el-calendar-table': true
        }"
        :cellspacing="0"
        :cellpadding="0"
    >
        <thead v-if="!hideHeader">
            <th v-for="day in weekDays" :key="day">{{ day }}</th>
        </thead>
        <tbody>
            <tr
                v-for="(row, index) in rows"
                :key="index"
                :class="{
                    'el-calendar-table__row': true,
                    'el-calendar-table__row--hide-border': index === 0 && hideHeader
                }"
            >
                <td v-for="(cell, key) in row" :key="key" :class="getCellClass(cell)" @click="pickDay(cell)">
                    <div class="el-calendar-day">
                        <span>{{ cell.text }}</span>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import fecha from 'element-ui/src/utils/date'
import { range as rangeArr, getFirstDayOfMonth, getPrevMonthLastDays, getMonthDays, getI18nSettings } from 'element-ui/src/utils/date-util'

export default {
    props: {
        selectedDay: String, // formated date yyyy-MM-dd
        date: Date,
        hideHeader: Boolean,
        firstDayOfWeek: Number
    },

    inject: ['Calendar'],

    data() {
        return {
            WEEK_DAYS: getI18nSettings().dayNames
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
        },

        pickDay({ text, type }) {
            const date = this.getFormateDate(text, type)
            this.$emit('pick', date)
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
            return fecha.format(temp, 'yyyy-MM')
        },

        curMonthDatePrefix() {
            return fecha.format(this.date, 'yyyy-MM')
        },

        nextMonthDatePrefix() {
            const temp = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1)
            return fecha.format(temp, 'yyyy-MM')
        },

        formatedToday() {
            return this.Calendar.formatedToday
        },

        rows() {
            let days = []

            const date = this.date
            let firstDay = getFirstDayOfMonth(date)
            firstDay = firstDay === 0 ? 7 : firstDay
            const firstDayOfWeek = typeof this.firstDayOfWeek === 'number' ? this.firstDayOfWeek : 1
            const prevMonthDays = getPrevMonthLastDays(date, firstDay - firstDayOfWeek).map((day) => ({
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
