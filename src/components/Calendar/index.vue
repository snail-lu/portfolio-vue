<template>
    <div class="calendar">
        <div class="calendar__header">
            <div class="calendar__title">
                {{ currentDate }}
            </div>
            <div class="calendar__button-group">
                <el-button-group>
                    <el-button type="plain" size="mini" @click="selectDate('prev-month')"> 上个月 </el-button>
                    <el-button type="plain" size="mini" @click="selectDate('today')"> 今天 </el-button>
                    <el-button type="plain" size="mini" @click="selectDate('next-month')"> 下个月 </el-button>
                </el-button-group>
            </div>
        </div>
        <div class="calendar__body">
            <date-table :date="date" :selected-day="realSelectedDay" :first-day-of-week="realFirstDayOfWeek" @pick="pickDay" />
        </div>
    </div>
</template>

<script>
import fecha from 'element-ui/src/utils/date'
import DateTable from './date-table'

const validTypes = ['prev-month', 'today', 'next-month']

export default {
    name: 'Calendar',
    components: {
        DateTable
    },

    props: {
        value: [Date, String, Number],
        firstDayOfWeek: {
            type: Number,
            default: 1
        }
    },

    provide() {
        return {
            Calendar: this
        }
    },

    methods: {
        /**
         * 切换到指定的日期
         * @param {*} day
         */
        pickDay(day) {
            this.realSelectedDay = day
        },

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

            if (day === this.formatedDate) return
            this.pickDay(day)
        },

        toDate(val) {
            if (!val) {
                throw new Error('invalid val')
            }
            return val instanceof Date ? val : new Date(val)
        }
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

        formatedDate() {
            return fecha.format(this.date, 'yyyy-MM-dd')
        },

        currentDate() {
            const year = this.date.getFullYear()
            const month = this.date.getMonth() + 1
            return `${year} 年 ${month} 月`
        },

        formatedToday() {
            return fecha.format(this.now, 'yyyy-MM-dd')
        },

        realSelectedDay: {
            get() {
                if (!this.value) return this.selectedDay
                return this.formatedDate
            },
            set(val) {
                this.selectedDay = val
                const date = new Date(val)
                this.$emit('input', date)
            }
        },

        date() {
            if (!this.value) {
                if (this.realSelectedDay) {
                    const d = this.selectedDay.split('-')
                    return new Date(d[0], d[1] - 1, d[2])
                }
                return this.now
            } else {
                return this.toDate(this.value)
            }
        },

        realFirstDayOfWeek() {
            if (this.firstDayOfWeek < 1 || this.firstDayOfWeek > 6) {
                return 0
            }
            return Math.floor(this.firstDayOfWeek)
        }
    },

    data() {
        return {
            selectedDay: '',
            now: new Date()
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
</style>
