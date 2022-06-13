<template>
    <div class="topbar-wrapper flex-box flex-v-center" v-if="!isScreenFull">
        <router-link key="collapse" class="topbar-logo" to="/">
            <img src="../../assets/icons/logo.png" class="topbar-logo" />
        </router-link>

        <ul class="menu-list flex-box flex-v-center">
            <li v-for="item in menuList" :key="item.path" class="menu-item" :class="{ 'menu-item-active': currentRoute == item.path }">
                <router-link :to="item.path"> {{ item.name }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

const settings = require('@/settings.js')
export default {
    name: 'Topbar',
    computed: {
        ...mapGetters(['isScreenFull']),
        currentRoute() {
            return '/' + this.$route.path.split('/')[1]
        },
        menuList() {
            return settings.menu || []
        }
    }
}
</script>
<style lang="scss" scoped>
.topbar-wrapper {
    padding-left: 20%;
    box-sizing: border-box;
    height: 60px;
    backdrop-filter: blur(12px) saturate(100%);
    background-color: rgba(245, 244, 241, 0.25);
    position: sticky;
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
            color: $menuText;

            &-active {
                // color: $menuActiveText;
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
