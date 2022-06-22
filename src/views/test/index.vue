<template>
    <div class="test-container">
        <Calendar :schedule="schedule" />
    </div>
</template>

<script>
import Calendar from '@/components/Calendar'
export default {
    components: {
        Calendar
    },
    data() {
        return {
            schedule: [
                {
                    title: '日常促销1',
                    start: '2022-06-01',
                    end: '2022-06-03',
                    id: 1
                },
                {
                    title: '日常促销1',
                    start: '2022-06-02',
                    end: '2022-06-04',
                    id: 2
                },
                {
                    title: '日常促销2',
                    start: '2022-06-03',
                    end: '2022-06-06',
                    id: 3
                },
                {
                    title: '日常促销3',
                    start: '2022-06-04',
                    end: '2022-06-05',
                    id: 4
                },
                {
                    title: '日常促销4',
                    start: '2022-06-07',
                    end: '2022-06-08',
                    id: 4
                },
                {
                    title: '日常促销5',
                    start: '2022-06-07',
                    end: '2022-06-09',
                    id: 4
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.test-container {
    width: 50%;
    margin: 0 auto;
}
</style>
