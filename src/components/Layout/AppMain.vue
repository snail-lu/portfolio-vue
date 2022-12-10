<template>
    <section class="app-main" :class="{ 'app-main-fullscreen': isScreenFull }">
        <router-view v-slot="{ Component }">
            <transition
                mode="out-in"
                enter-active-class="animate__animated animate__fadeIn animate__faster"
                leave-active-class="animate__animated animate__fadeOut animate__faster"
            >
                <component :is="Component" />
            </transition>
        </router-view>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isScreenFull = computed(() => store.state.isScreenFull);
</script>

<style scoped lang="scss">
.app-main {
    /*60 = topbar  */
    // min-height: calc(100vh - 60px);
    // width: 100%;
    min-height: 100vh;
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
