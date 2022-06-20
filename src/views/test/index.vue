<template>
    <div class="test-container">
        <Calendar />
    </div>
</template>

<script>
import Calendar from '@/components/Calendar'
export default {
    components: {
        Calendar
    },
    data() {
        return {}
    }
}
</script>

<style lang="scss" scoped>
.test-container {
    width: 50%;
    margin: 0 auto;
}
</style>
