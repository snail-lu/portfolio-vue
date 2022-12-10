<template>
    <nav class="topbar-wrapper flex-box flex-v-center" v-show="!isScreenFull">
        <router-link key="collapse" class="topbar-logo" to="/">
            <img src="../../assets/icons/logo.png" class="topbar-logo animate__animated animate__zoomIn animate__faster" />
        </router-link>

        <ul class="menu-list flex-box flex-v-center">
            <li class="menu-item" :class="{ 'menu-item-active': currentRoute == item.path }" v-for="item in menuList" :key="item.path">
                <i class="iconfont menu-item-icon" :class="item.icon" v-if="item.icon"></i>
                <router-link :to="item.path"> {{ item.name }}</router-link>
            </li>
            <span class="menu-item-active-bg" :style="{ left }"></span>
        </ul>
    </nav>
</template>

<script setup>
import { useRoute } from 'vue-router';
import settings from '@/settings';
import { useStore } from 'vuex';
import { onUpdated } from 'vue';

const route = useRoute();
const currentRoute = computed(() => '/' + route.path.split('/')[1]);
const menuList = computed(() => settings.menu || []);

const store = useStore();
const isScreenFull = computed(() => store.state.isScreenFull);

const left = ref(0);

function setActiveItemStyle() {
    const activeItem = document.querySelector('.menu-item-active');
    const { offsetLeft, offsetWidth } = activeItem;
    const bgLeft = offsetLeft + (offsetWidth - 50) / 2;
    left.value = `${bgLeft}px`;
}

onMounted(() => {
    setTimeout(() => {
        setActiveItemStyle();
    }, 100);
});

onUpdated(() => {
    setActiveItemStyle();
});
</script>
<style lang="scss" scoped>
.topbar-wrapper {
    padding-left: 25%;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    backdrop-filter: blur(12px) saturate(100%);
    // background-color: rgba(245, 244, 241, 0.25);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;

    .topbar-logo {
        position: absolute;
        width: 50px;
        height: 50px;
        vertical-align: middle;
        border-radius: 25px;
        margin-right: 50px;
        left: 36px;
    }

    .menu-list {
        position: relative;
        .menu-item {
            margin-right: 70px;
            padding-top: 10px;
            color: #fff;

            &-icon {
                margin-right: 6px;
            }

            &-active {
                color: #3498db;
                font-weight: bold;
            }

            &-active-bg {
                position: absolute;
                display: block;
                height: 8px;
                width: 50px;
                bottom: -13px;
                background-image: url('../../assets/icons/wave.png');
                background-size: contain;
                transition: left 0.2s;
            }
        }
    }
}
</style>
