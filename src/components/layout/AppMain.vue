<template>
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
            <router-view :key="key" />
        </transition>
    </section>
</template>

<script>
export default {
    name: 'AppMain',
    computed: {
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
</style>

<style lang="scss"></style>
