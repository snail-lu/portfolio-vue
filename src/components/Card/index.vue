<template>
    <div class="card flex-box-column flex-h-between" @click="pushUrl">
        <div :class="`header bg-color${data.id}`"></div>
        <div class="card-info">
            <div class="card-info-title">{{ data.title }}</div>
            <div class="card-info-desc">{{ data.desc }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object
        }
    },
    methods: {
        pushUrl() {
            const { data } = this
            if ('url' in data || 'reposity' in data) {
                window.open(data.url || data.reposity, '_blank')
            } else {
                this.$router.push({ path: `/demo/${data.path}` })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@for $i from 1 through 30 {
    .bg-color#{$i} {
        color: #fff;
        background-image: linear-gradient(
            to right,
            rgba(random(255), random(255), random(255), 0.4),
            rgba(random(255), random(255), random(255), 0.4)
        );
    }
}
.card {
    background-color: #fff;
    border-radius: 10px;
    height: 230px;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    overflow: hidden;

    .header {
        height: 80%;
    }

    &-info {
        height: 80px;
        padding: 10px 20px;
        &-title {
            font-size: 14px;
            font-weight: bold;
        }

        &-desc {
            color: #999;
            font-size: 13px;
            margin-top: 10px;
        }
    }
}
</style>
