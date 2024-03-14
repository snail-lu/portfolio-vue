<template>
    <img class="image" v-bind="objectOfAttrs" />
</template>

<script setup>
const props = defineProps({
    config: Object
});

const objectOfAttrs = computed(() => {
    return {
        src: props.config?.imgUrl,
        style: {
            width: props.config?.width || '100%',
            height: props.config?.height || 'auto'
        }
    }
})

console.log(props.config, 'img setup')
</script>

<style lang="scss" scoped>
.image-wrapper {
    font-size: 0;
}
.image {
    width: 100%;
}
</style>
