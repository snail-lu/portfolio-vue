<template>
    <div class="topbar-wrapper flex-box flex-v-center" v-if="!isScreenFull">
        <router-link key="collapse" class="topbar-logo" to="/">
            <img src="../../assets/icons/logo.png" class="topbar-logo" />
        </router-link>

        <el-menu
            :text-color="variables.menuText"
            :unique-opened="false"
            :active-text-color="variables.menuActiveText"
            mode="horizontal"
            :router="true"
            :default-active="currentRoute"
        >
            <el-menu-item :index="item.path" v-for="item in menuList" :key="item.path">{{ item.name }}</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.module.scss'

const settings = require('@/settings.js')
export default {
    name: 'Topbar',
    computed: {
        ...mapGetters(['isScreenFull']),
        currentRoute() {
            return '/' + this.$route.path.split('/')[1]
        },
        variables() {
            return variables
        },
        menuList() {
            return settings.menu || []
        }
    }
}
</script>
<style lang="scss" scoped>
.topbar-wrapper {
    width: 100%;
    padding-left: 20%;
    backdrop-filter: blur(12px) saturate(100%);
    background-color: rgba(245, 244, 241, 0.25);

    .topbar-logo {
        width: 50px;
        height: 50px;
        vertical-align: middle;
        border-radius: 25px;
    }

    .el-menu {
        border-bottom: none;
        margin-left: 50px;
        background-color: transparent;
        &-item {
            border-bottom: none;
            font-size: 16px;
            padding: 0 30px;

            &:hover,
            &:focus {
                background-color: transparent;
            }
        }

        .is-active {
            font-weight: bold;
        }
    }
}
</style>
