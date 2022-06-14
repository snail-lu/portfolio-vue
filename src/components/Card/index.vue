<template>
    <div class="card flex-box-column flex-h-between" @click="pushUrl">
        <div :class="`header bg-color${data.id} ${isLoading ? 'animated-bg' : ''}`">
            <img class="cover" :src="data.coverUrl" @load="load" @error="error" v-if="!isError" loading="lazy" />
            <div class="placeholder-cover" v-else>
                <img class="placeholder-cover1" src="@/assets/icons/smile.svg" />
                <img class="placeholder-cover2" src="@/assets/icons/wink.svg" />
            </div>
        </div>
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
    data() {
        return {
            isLoading: true,
            isError: false
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
        },
        load() {
            this.isLoading = false
        },
        error() {
            this.isError = true
            this.isLoading = false
        }
    }
}
</script>

<style lang="scss" scoped>
@for $i from 1 through 30 {
    $random1: random(255);
    $random2: random(255);
    $random3: random(255);
    .bg-color#{$i} {
        color: #fff;
        background: linear-gradient(to right, rgba($random1, $random2, $random3, 0.4), rgba($random1, $random3, $random2, 0.4));
    }
}
.card {
    background-color: #fff;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    overflow: hidden;

    .header {
        height: 180px;

        .cover {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .placeholder-cover {
            width: 50%;
            height: auto;
            transform: translateX(50%) translateY(25%);
        }

        .placeholder-cover1 {
            display: block;
            width: 100%;
            height: auto;
        }
        .placeholder-cover2 {
            display: none;
            width: 100%;
            height: auto;
        }

        &:hover {
            .placeholder-cover1 {
                display: none;
            }
            .placeholder-cover2 {
                display: block;
            }
        }
    }

    .animated-bg {
        $random1: random(255);
        $random2: random(255);
        $random3: random(255);
        animation-duration: 3s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: placeHolderShimmer;
        animation-timing-function: linear;
        background: linear-gradient(
            90deg,
            rgba($random1, $random2, $random3, 0.2) 10%,
            rgba($random1, $random2, $random3, 0.1) 18%,
            rgba($random1, $random2, $random3, 0.2) 33%
        );
        background-size: 600px 100px;
    }

    @keyframes placeHolderShimmer {
        0% {
            background-position: -600px 0;
        }
        100% {
            background-position: 600px 0;
        }
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
