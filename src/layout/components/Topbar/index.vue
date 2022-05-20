<template>
    <div class="topbar-wrapper flex-box flex-v-center">
        <logo />

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
import Logo from './Logo'
import variables from '@/styles/variables.scss'

const settings = require('@/settings.js')
export default {
    name: 'Topbar',
    components: { Logo },
    computed: {
        ...mapGetters(['sidebar']),
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
    // background-image: linear-gradient(to top, #bdc2e8 0%, #bdc2e8 1%, #e6dee9 100%);
    background-color: rgba(0, 0, 0, 0.5);

    .el-menu {
        border-bottom: none;
        margin-left: 50px;
        background-color: transparent;
        &-item {
            border-bottom: none;
            &:hover,
            &:focus {
                background-color: transparent;
            }
        }
    }
}
</style>
