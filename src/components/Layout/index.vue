<template>
    <div class="app-wrapper">
        <topbar />
        <app-main />
    </div>
</template>

<script setup>
import AppMain from './AppMain.vue';
import Topbar from './Topbar.vue';
</script>

<style lang="scss" scoped>
.app-wrapper {
    // background-image: linear-gradient(-225deg, #cbbacc 0%, #2580b3 100%);
    background-color: $themeBg;
    // background-image: linear-gradient(60deg, #96deda 0%, #50c9c3 100%);
    // background-image: linear-gradient(to top, #4481eb 0%, #04befe 100%);
    // background-image: linear-gradient(-225deg, #69eacb 0%, #eaccf8 48%, #6654f1 100%);
    // background-image: linear-gradient(-225deg, #2cd8d5 0%, #c5c1ff 100%);
    // background-color: #4b76cf;
    // background-color: #6abeef;
}
</style>
