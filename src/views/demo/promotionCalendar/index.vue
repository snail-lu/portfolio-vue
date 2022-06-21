<template>
    <demo :data="demoInfo">
        <calendar>
            <template v-slot:dateCell="{ data }">
                <div :class="data.isSelected ? 'is-selected' : ''">{{ data.day.split('-').slice(2).join('') }} {{ data.isSelected ? '✔️' : '' }}</div>
            </template>
        </calendar>
    </demo>
</template>

<script>
import Demo from '@/components/Demo'
import Calendar from '@/components/Calendar'
export default {
    components: {
        Demo,
        Calendar
    },
    name: 'PromotionCalendar',
    data() {
        return {
            demoInfo: {
                title: '促销日历',
                url: ''
            }
        }
    },
    created() {},
    methods: {}
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

    .el-button {
        margin: 0 10px 10px 0;
    }
}
</style>
