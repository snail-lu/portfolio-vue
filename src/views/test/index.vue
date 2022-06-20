<template>
    <div>
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
        return {
            code: 'function myScript(){\n  return 100;\n}\n'
        }
    }
}
</script>

<style lang="scss" scoped></style>
