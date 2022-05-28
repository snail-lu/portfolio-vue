<template>
    <section class="app-main" :class="{ 'app-main-fullscreen': isScreenFull }">
        <transition name="fade-transform" mode="out-in">
            <router-view :key="key" />
        </transition>
    </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'AppMain',
    computed: {
        ...mapState('settings', ['isScreenFull']),
        key() {
            return this.$route.path
        }
    }
}
</script>

<style scoped>
.app-main {
    /*60 = navbar  */
    height: calc(100vh - 60px);
    /* height: 100%; */
    width: 100%;
    position: relative;
    overflow: auto;
    box-sizing: border-box;
    margin: 0 auto;
    /* padding: 0 10px; */
}

.app-main-fullscreen {
    height: 100vh;
}
</style>

<style lang="scss"></style>
