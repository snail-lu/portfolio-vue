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
                    title: '618大促',
                    start: '2022-06-01',
                    end: '2022-06-21',
                    id: 1
                },
                {
                    title: '日常促销',
                    start: '2022-06-05',
                    end: '2022-06-07',
                    id: 2
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
