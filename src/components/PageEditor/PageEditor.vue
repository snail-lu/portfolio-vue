<template>
    <div class="page-editor-box">
        <div class="col-2 box-l">
            <page-editor-tool-bars />
        </div>
        <div class="col-6 editor-box">
            <div class="btn-groups">
                <el-button type="primary">保存</el-button>
                <el-button>预览</el-button>
            </div>
            <draggable class="editor" v-model="componentList" :group="{ name: 'componentsGroup' }" item-key="name" @change="onChange">
                <template #item="{ element }">
                    <div
                        :class="`${activeComponent?.id === element.id ? 'component-wrapper-active' : 'component-wrapper'}`"
                        @click="onChoose(element)"
                    >
                        <component :is="supportedComponents[element.component].component" />
                    </div>
                </template>
            </draggable>
        </div>
        <div class="col-2 box-r">
            <div class="box-r-title">组件配置</div>
            <div class="form-box" v-if="activeComponent">
                <vue-form
                    v-model="formData"
                    :ui-schema="uiSchema"
                    :schema="schema"
                    :form-footer="formFooter"
                    :form-props="formProps"
                    @submit="onSubmitForm"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid';
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
const componentList = ref([]);
const emits = defineEmits(['choose']);

const activeComponent = ref(null);
const onChoose = (element) => {
    console.log(element, 'element');
    if (activeComponent.value?.id !== element.id) {
        activeComponent.value = element;
    } else {
        activeComponent.value = null;
    }
};

const onChange = (evt) => {
    if (evt.added && evt.added.element) {
        // 新加的元素处理特殊配置信息
        evt.added.element.id = uuidv4();
    }
};

const formData = reactive({});

const schema = computed(() => {
    if (activeComponent.value?.component) {
        const componentName = activeComponent.value.component;
        return supportedComponents[componentName].schema;
    } else {
        return {};
    }
});
const uiSchema = computed(() => {
    if (activeComponent.value?.component) {
        const componentName = activeComponent.value.component;
        return supportedComponents[componentName].uiSchema;
    } else {
        return {};
    }
});
const formFooter = {
    show: true,
    okBtn: '应用'
};

const formProps = {
    labelPosition: 'right',
    labelWidth: '120px',
    labelSuffix: '：'
};

const onSubmitForm = () => {
    console.log(formData, 'formData');
};
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

.box-l {
    border-right: 1px dashed #ccc;
}

.box-r {
    border-left: 1px dashed #ccc;
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
    position: relative;

    .btn-groups {
        position: absolute;
        top: 10px;
        right: 10px;
    }
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

.box-r {
    &-title {
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        padding: 0 10px;
        background-color: #f5f5f5;
        text-align: center;
    }
    .form-box {
        height: calc(100vh - 50px);
        padding: 10px 20px;
        box-sizing: border-box;
        overflow-y: auto;

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
}
</style>
