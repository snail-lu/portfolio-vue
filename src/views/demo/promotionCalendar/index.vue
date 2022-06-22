<template>
    <demo :data="demoInfo">
        <calendar :schedule="schedule" />
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
            },
            schedule: [
                {
                    title: '日常促销1',
                    start: '2022-06-01',
                    end: '2022-06-03',
                    id: 1
                },
                {
                    title: '日常促销2',
                    start: '2022-06-02',
                    end: '2022-06-04',
                    id: 2
                },
                {
                    title: '日常促销3',
                    start: '2022-06-03',
                    end: '2022-06-06',
                    id: 3
                },
                {
                    title: '日常促销4',
                    start: '2022-06-04',
                    end: '2022-06-05',
                    id: 4
                },
                {
                    title: '日常促销5',
                    start: '2022-06-07',
                    end: '2022-06-08',
                    id: 5
                },
                {
                    title: '日常促销6',
                    start: '2022-06-07',
                    end: '2022-06-09',
                    id: 6
                },
                {
                    title: '日常促销7',
                    start: '2022-06-06',
                    end: '2022-06-06',
                    id: 6
                },
                {
                    title: '日常促销8',
                    start: '2022-06-01',
                    end: '2022-06-02',
                    id: 8
                },
                {
                    title: '日常促销9',
                    start: '2022-06-29',
                    end: '2022-07-15',
                    id: 9
                }
            ]
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
