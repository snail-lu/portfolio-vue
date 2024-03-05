<template>
    <div class="page-editor-box">
        <div class="col-2">
            <page-editor-tool-bars />
        </div>
        <div class="col-6 editor-box">
            <draggable class="editor" :list="list" :group="{ name: 'componentsGroup' }" item-key="name" @choose="onChoose">
                <template #item="{ element, index }">
                    <div :class="`${activeIndex === index ? 'component-wrapper-active' : 'component-wrapper'}`">
                        <component :is="supportedComponents[element.component].component" />
                    </div>
                </template>
            </draggable>
        </div>
        <div class="col-2">
            <div class="block-title">组件配置</div>
            <div class="form-box">
                <vue-form v-model="formData" :ui-schema="uiSchema" :schema="schema" />
            </div>
        </div>
    </div>
</template>

<script setup>
import draggable from 'vuedraggable';
import VueForm from '@lljj/vue3-form-element';
import PageEditorToolBars from '@/components/PageEditor/PageEditorToolBars.vue';
import Image from './Image/index';
import Swiper from './Swiper/index';
import GoodsList from './GoodsList/index';

const supportedComponents = {
    Image,
    Swiper,
    GoodsList
};
const props = defineProps({
    list: {
        required: true,
        type: Array
    }
});
const emits = defineEmits(['choose']);

const activeIndex = ref(0);
const onChoose = (evt) => {
    const { oldIndex } = evt;
    activeIndex.value = oldIndex;

    emits('choose', evt);
};

const formData = reactive({});

const schema = computed(() => {
    if (props.list && props.list.length > 0) {
        const componentName = props.list[activeIndex.value].component;
        return supportedComponents[componentName].schema;
    } else {
        return {};
    }
});
const uiSchema = computed(() => {
    if (props.list && props.list.length > 0) {
        const componentName = props.list[activeIndex.value].component;
        return supportedComponents[componentName].uiSchema;
    } else {
        return {};
    }
});
</script>

<style lang="scss" scoped>
.page-editor-box {
    width: 100%;
    display: flex;
}

.col-2 {
    width: 20%;
}

.col-6 {
    width: 60%;
}

.component-wrapper {
    position: relative;

    &-active {
        position: relative;

        &:after {
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            box-shadow: inset 0 0 10px 4px #1c7be7;
            transition: box-shadow 0.3s ease;
        }
    }

    &:after {
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        transition: box-shadow 0.3s ease;
    }

    &:hover {
        &:after {
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            box-shadow: inset 0 0 10px 2px #7aaee9;
            transition: box-shadow 0.3s ease;
        }
    }
}

.editor-box {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.editor {
    width: 375px;
    height: 750px;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.3);
    background-color: #fff;
    overflow: auto;
    position: relative;

    // 滚动条整体样式
    &::-webkit-scrollbar {
        width: 6px;
        position: absolute;
        top: 0;
        right: 0;
    }

    // 滚动条外层轨道样式
    &::-webkit-scrollbar-track {
        background: #eee;
    }

    // 滚动条中滑块样式
    &::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 20px;
    }
}

.block-title {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    padding: 0 10px;
    background-color: #f5f5f5;
    text-align: center;
    border-left: 1px dashed #ccc;
}
.form-box {
    height: calc(100vh - 50px);
    padding: 10px 20px;
    box-sizing: border-box;
    overflow-y: auto;
    border-left: 1px dashed #ccc;

    // 滚动条整体样式
    &::-webkit-scrollbar {
        width: 6px;
        position: absolute;
        top: 0;
        right: 0;
    }

    // 滚动条外层轨道样式
    &::-webkit-scrollbar-track {
        background: #eee;
    }

    // 滚动条中滑块样式
    &::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 20px;
    }
}
</style>
