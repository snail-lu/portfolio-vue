<template>
    <div class="page-editor-box">
        <div class="col-2 box-l">
            <page-editor-tool-bars />
        </div>
        <div class="col-6 editor-box">
            <div class="btn-groups">
                <el-button type="primary" @click="onSavePage">保存</el-button>
                <el-button @click="onPreviewPage">预览</el-button>
                <el-button @click="onClearPage">清空</el-button>
            </div>
            <div class="editor" :class="{ 'empty-editor': componentList.length == 0 }">
                <draggable
                    class="drag-area"
                    v-model="componentList"
                    item-key="id"
                    group="componentsGroup"
                    animation="200"
                >
                    <template #item="{ element }">
                        <div
                            :class="`${activeComponent?.id === element.id ? 'component-wrapper-active' : 'component-wrapper'}`"
                            @click="onChoose(element)"
                        >
                            <component :is="element.component.view" :config="element?.configData" />
                        </div>
                    </template>
                </draggable>
            </div>
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
            <div v-else class="empty-tips">请选择需要配置的组件~</div>
        </div>
    </div>
</template>

<script setup>
import _ from 'lodash';
import draggable from 'vuedraggable';
import VueForm from '@lljj/vue3-form-element';
import PageEditorToolBars from '@/components/PageEditor/PageEditorToolBars.vue';

const componentList = ref([]);
const emits = defineEmits(['choose']);

const activeComponent = ref(null);
const formData = ref(null);
const onChoose = (element) => {
    if (activeComponent.value?.id !== element.id) {
        activeComponent.value = _.cloneDeep(element);
        formData.value = _.cloneDeep(element.configData);
    } else {
        activeComponent.value = null;
    }
};

const schema = computed(() => {
    if (activeComponent.value) {
        return activeComponent.value.component.schema;
    } else {
        return {};
    }
});
const uiSchema = computed(() => {
    if (activeComponent.value) {
        return activeComponent.value.component.uiSchema;
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
    console.log(activeComponent, '');
    console.log(formData.value, 'formData');
    componentList.value.forEach((component) => {
        if (component.id === activeComponent.value.id) {
            component.configData = formData.value;
        }
    });
};
const onSavePage = () => {
    const pageData = componentList.value.map(item => {
        return {
            componentName: item.componentName
        }
    })
}

const onPreviewPage = () => {

}

const onClearPage = () => {
    ElMessageBox.confirm('确定要清空页面?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
        .then(() => {
            componentList.value = [];
            activeComponent.value = null;
        })
        .catch(() => {});
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

    .empty-tips {
        text-align: center;
        margin-top: 100px;
    }
}

.component-wrapper {
    position: relative;
    // font-size: 0;

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

    .drag-area {
        width: 100%;
        min-height: 100%;
    }

    &.empty-editor {
        &::before {
            content: '拖动左侧组件至此';
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: #7aaee9;
            line-height: 1.5;
        }
    }

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
.flip-list-move {
    transition: transform 0.5s;
}

.no-move {
    transition: transform 0s;
}

.ghost {
    opacity: 0.5;
    background: #c8ebfb;
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
