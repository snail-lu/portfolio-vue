<template>
    <div class="app-wrapper">
        <topbar />
        <app-main />
    </div>
</template>

<script>
import AppMain from './AppMain'
import Topbar from './Topbar'

export default {
    name: 'Layout',
    components: {
        AppMain,
        Topbar
    }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';

.app-wrapper {
    @include clearfix;
    // position: relative;
    // height: 100%;
    // width: 100%;
    // background-image: linear-gradient(120deg, rgb(132, 250, 176) 0%, rgb(143, 211, 244) 100%);
    // background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);
    // background-image: linear-gradient(60deg, #96deda 0%, #50c9c3 100%);
    background-image: linear-gradient(-225deg, #cbbacc 0%, #2580b3 100%);
    // background-color: #6abeef;
}
</style>
