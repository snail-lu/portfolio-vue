<template>
    <section class="app-main" :class="{ 'app-main-fullscreen': isScreenFull }">
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </transition>
        </router-view>
    </section>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'AppMain',
    computed: {
        ...mapState(['isScreenFull']),
        key() {
            return this.$route.path;
        }
    }
};
</script>

<style scoped lang="scss">
.app-main {
    /*60 = topbar  */
    min-height: calc(100vh - 60px);
    // width: 100%;
    position: relative;
    overflow: auto;
    box-sizing: border-box;
    margin: 0 auto;
}

.app-main-fullscreen {
    height: 100vh;
}
</style>

<style lang="scss"></style>
