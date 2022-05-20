<template>
    <div :class="classObj" class="app-wrapper">
        <topbar />
        <app-main />
    </div>
</template>

<script>
import { AppMain, Topbar } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
    data() {
        return {
            userInfo: {}
        }
    },
    name: 'Layout',
    components: {
        AppMain,
        Topbar
    },
    mixins: [ResizeMixin],
    computed: {
        sidebar() {
            return this.$store.state.app.sidebar
        },
        device() {
            return this.$store.state.app.device
        },
        fixedHeader() {
            return this.$store.state.settings.fixedHeader
        },
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device === 'mobile'
            }
        }
    },
    mounted() {
        let userInfo = localStorage.getItem('userInfo')
        if (userInfo) {
            this.userInfo = JSON.parse(userInfo)
        }
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    // background-image: linear-gradient(120deg, rgb(132, 250, 176) 0%, rgb(143, 211, 244) 100%);
    // background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);
    // background-image: linear-gradient(60deg, #96deda 0%, #50c9c3 100%);
    background-image: linear-gradient(-225deg, #cbbacc 0%, #2580b3 100%);

    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
    .header {
        height: 70px;
        background: #242f42;
        padding: 0 55px 0 30px;
        box-sizing: border-box;
        display: flex;
        font-size: 18px;
        justify-content: space-between;
        align-items: center;
        position: relative;
        z-index: 1003;
        .title {
            width: 192px;
            font-family: MicrosoftYaHei;
            font-size: 22px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 33px;
            letter-spacing: 2px;
            color: #ffffff;
        }
        .option {
            display: flex;
            justify-content: space-between;
            color: white;
            .el-dropdown-link {
                cursor: pointer;
                color: #fff;
            }
            div {
                display: flex;
                align-items: center;
            }
        }
        .iconfont {
            font-size: 20px;
            margin-right: 10px;
        }
        .icon-quit {
            font-size: 16px;
        }
        .line {
            margin: 0 23px 0 23px;
        }
        .logout {
            cursor: pointer;
        }
    }
    .main {
        height: calc(100vh - 60px);
        overflow: hidden;
        position: relative;
        .sidebar-container {
            margin-top: 70px;
        }
    }
}
</style>
