<template>
    <nav class="topbar-wrapper flex-box flex-v-center" v-show="!isScreenFull">
        <router-link key="collapse" class="topbar-logo" to="/">
            <img src="../../assets/icons/logo.png" class="topbar-logo animate__animated animate__zoomIn animate__faster" />
        </router-link>

        <ul class="menu-list flex-box flex-v-center">
            <li
                class="menu-item animate__animated animate__zoomIn animate__faster"
                :class="{ 'menu-item-active': currentRoute == item.path }"
                v-for="item in menuList"
                :key="item.path"
                @click="linkTo(item.path)"
            >
                <i class="iconfont menu-item-icon" :class="item.icon" v-if="item.icon"></i>
                <span> {{ item.name }}</span>
            </li>
            <span class="menu-item-active-bg" :style="{ left }"></span>
        </ul>

        <!-- 移动端菜单 -->
        <div class="menu-mobile-wrapper">
            <i-ep-menu class="menu-btn" @click="drawer = true"></i-ep-menu>

            <el-drawer v-model="drawer" title="Vue项目集" direction="rtl" append-to-body size="50%">
                <ul class="menu-list-mobile">
                    <li
                        class="menu-item"
                        :class="{ 'menu-item-active': currentRoute == item.path }"
                        v-for="item in menuList"
                        :key="item.path"
                        @click="linkTo(item.path)"
                    >
                        <i class="iconfont menu-item-icon" :class="item.icon" v-if="item.icon"></i>
                        <span> {{ item.name }}</span>
                    </li>
                </ul>
            </el-drawer>
        </div>
    </nav>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import settings from '@/settings';
import { useStore } from 'vuex';
import { onUpdated, ref } from 'vue';

// 获取当前激活的菜单
const route = useRoute();
const currentRoute = computed(() => '/' + route.path.split('/')[1]);
const menuList = computed(() => settings.menu || []);

// 全屏状态
const store = useStore();
const isScreenFull = computed(() => store.state.isScreenFull);

// 菜单动态切换效果
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
    }, 300);
});

onUpdated(() => {
    setActiveItemStyle();
});

// 菜单跳转
const router = useRouter();
const linkTo = (path) => {
    router.push(path);
};

const drawer = ref(false);
</script>
<style lang="scss" scoped>
.topbar-wrapper {
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
        width: 50px;
        height: 50px;
        vertical-align: middle;
        border-radius: 25px;
    }

    .menu-list {
        position: relative;
        .menu-item {
            margin-right: 70px;
            padding-top: 10px;
            color: #fff;
            cursor: pointer;

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
@media (min-width: 768px) {
    .topbar-wrapper {
        padding-left: 25%;

        .topbar-logo {
            position: absolute;
            margin-right: 50px;
            left: 36px;
        }

        .menu-btn {
            display: none;
        }
    }
}

// 移动端样式
@media (max-width: 768px) {
    .topbar-wrapper {
        justify-content: space-between;
        padding: 0 20px;

        .menu-btn {
            color: #fff;
            font-size: 20px;
        }

        .menu-list {
            display: none;
        }
    }
}

.menu-list-mobile {
    .menu-item {
        margin-bottom: 30px;

        &-icon {
            margin-right: 6px;
        }

        &-active {
            color: #3498db;
            font-weight: bold;
        }
    }
}
</style>
