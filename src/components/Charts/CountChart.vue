<template>
    <div class="sales-amount-box flex-box-column flex-h-between">
        <div class="amount-item flex-box flex-h-between flex-v-center">
            <span class="label">全年</span>
            <countTo :startVal="oldAnnualQuota" :endVal="annualQuota" :duration="1000" class="amount"></countTo>
        </div>
        <div class="amount-item flex-box flex-h-between flex-v-center">
            <span class="label">本月</span>
            <countTo :startVal="oldMonthlyQuota" :endVal="monthlyQuota" :duration="1000" class="amount"></countTo>
        </div>
        <div class="amount-item flex-box flex-h-between flex-v-center">
            <span class="label">今日</span>
            <countTo :startVal="oldDailyQuota" :endVal="dailyQuota" :duration="1000" class="amount"></countTo>
        </div>
    </div>
</template>

<script>
import countTo from 'vue-count-to'
import { randomData } from '@/utils/index'
export default {
    components: {
        countTo
    },
    data() {
        return {
            oldAnnualQuota: 33043243,
            oldMonthlyQuota: 3000765,
            oldDailyQuota: 10000,
            annualQuota: 33043243,
            monthlyQuota: 3000765,
            dailyQuota: 10000,
            timer: null
        }
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer)
            this.timer = null
        }
    },
    mounted() {
        this.updateData()
    },
    methods: {
        updateData() {
            this.timer = setInterval(() => {
                const { annualQuota, monthlyQuota, dailyQuota } = this
                const n = randomData(1000, 10000)
                console.log(n, 'n')
                this.oldAnnualQuota = annualQuota
                this.oldMonthlyQuota = monthlyQuota
                this.oldDailyQuota = dailyQuota
                this.annualQuota = annualQuota + n
                this.monthlyQuota = monthlyQuota + n
                this.dailyQuota = dailyQuota + n
            }, 3000)
        }
    }
}
</script>

<style lang="scss" scoped>
.sales-amount-box {
    height: 100%;
}
.amount-item {
    .label {
        font-size: 16px;
    }
    .amount {
        position: relative;
        margin-right: 20px;
        font-size: 20px;
        line-height: 1;

        &::after {
            position: absolute;
            content: '元';
            display: block;
            bottom: 3px;
            right: -16px;
            font-size: 10px;
            line-height: 1;
        }
    }
}
</style>
