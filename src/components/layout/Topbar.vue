<template>
    <div class="topbar-wrapper flex-box flex-v-center" v-if="!isScreenFull">
        <router-link key="collapse" class="topbar-logo" to="/">
            <img src="../../assets/icons/logo.png" class="topbar-logo animate__animated animate__zoomIn animate__faster" />
        </router-link>

        <ul class="menu-list flex-box flex-v-center">
            <transition v-for="item in menuList" :key="item.path" enter-active-class="animate__animated animate__zoomIn animate__faster">
                <li class="menu-item" :class="{ 'menu-item-active animate__bounceIn': currentRoute == item.path }" v-if="isVisible">
                    <router-link :to="item.path"> {{ item.name }}</router-link>
                </li>
            </transition>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import settings from '@/settings';
export default {
    name: 'Topbar',
    data() {
        return {
            isVisible: false
        };
    },
    computed: {
        ...mapState(['isScreenFull']),
        currentRoute() {
            return '/' + this.$route.path.split('/')[1];
        },
        menuList() {
            return settings.menu || [];
        }
    },
    mounted() {
        this.isVisible = true;
    }
};
</script>
<style lang="scss" scoped>
.topbar-wrapper {
    padding-left: 20%;
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
        margin-right: 50px;
    }

    .menu-list {
        .menu-item {
            padding: 0 30px;
            // color: $menuText;
            color: #fff;

            &-active {
                // color: $menuActiveText;
                color: #3498db;
                font-weight: bold;
                position: relative;

                &::after {
                    position: absolute;
                    content: '';
                    display: block;
                    height: 8px;
                    width: 50px;
                    bottom: -13px;
                    left: calc(50% - 25px);
                    background-image: url('../../assets/icons/wave.png');
                    background-size: contain;
                }
            }
        }
    }
}
</style>
