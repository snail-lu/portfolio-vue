<template>
  <div class="test-container">
    <div class="design-container">
      <div class="col-2">
        <div class="col-content">
          <div class="col-content-title">常用组件</div>
          <draggable
            class="list-group"
            :list="componentList"
            :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
            @change="log"
            item-key="name"
          >
            <template #item="{ element }">
              <div class="list-group-item">
                <div :class="`icon iconfont ${element.icon}`"></div>
                <div class="name">{{ element.name }}</div>
              </div>
            </template>
          </draggable>
        </div>
      </div>
      <div class="col-6">
        <div class="col-content">
          <div class="col-content-title flex-box flex-h-between flex-v-center">
            页面编辑
            <div>
              <span class="save-btn">保存</span>
              <span class="preview-btn">预览</span>
            </div>
          </div>
          <div class="editor-box">
            <nested-draggable class="editor" :tasks="targetList" />
          </div>
        </div>
      </div>
      <div class="col-2">
        <div class="col-content">
          <div class="col-content-title">组件配置</div>
          <vue-form v-model="formData" :ui-schema="uiSchema" :schema="schema" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable';
import nestedDraggable from '@/components/PageEditor/NestedDraggable.vue';
import VueForm from '@lljj/vue3-form-element';

const componentList = ref([
    {
        name: '图片',
        icon: 'icon-image',
        component: 'Image',
        children: []
    },
    {
        name: '轮播图',
        icon: 'icon-swiper',
        component: 'Swiper',
        children: []
    },
    {
        name: '商品列表',
        icon: 'icon-goodslist2',
        component: 'GoodsList',
        children: []
    }
]);

const targetList = ref([]);

const formData = reactive({});
const schema = {
    title: '测试注册表单',
    description: 'A simple form example.',
    type: 'object',
    required: ['firstName', 'lastName'],
    'ui:order': ['lastName', 'firstName', '*', 'password'],
    properties: {
        firstName: {
            type: 'string',
            title: 'First name',
            default: 'Jun'
        },
        lastName: {
            type: 'string',
            title: 'Last name',
            'ui:options': {
                description: '请输入你的姓'
            },
            'err:required': '必须输入Last Name'
        },
        price: {
            type: 'string',
            description: '最多输入两位小数点，最大值 999999.99',
            title: '价格',
            format: 'price'
        },
        age: {
            type: 'integer',
            title: 'Age',
            maximum: 80,
            minimum: 16
        },
        bio: {
            type: 'string',
            title: 'Bio',
            minLength: 10
        },
        password: {
            type: 'string',
            title: 'Password',
            minLength: 3
        },
        telephone: {
            type: 'string',
            title: 'Telephone',
            minLength: 10
        }
    }
};
const uiSchema = {
    'ui:description': '简单表单例子（这里通过UiSchema覆盖了默认description描述配置）',
    firstName: {
        'ui:title': '名字',
        'ui:description': '比如：李白姓李、孙尚香姓孙、马可波罗姓马可波',
        'ui:emptyValue': '',
        'ui:options': {
            placeholder: '请输入你的姓',
            attrs: {
                autofocus: true
            }
        }
    },
    bio: {
        'ui:options': {
            placeholder: '请输入你的签名',
            type: 'textarea',
            rows: 6
        }
    }
};
</script>

<style lang="scss" scoped>
.test-container {
  background-color: #fff;
  width: 100vw;
  height: 100vh;
}

.design-container {
  min-height: 100vh;
  display: flex;
  box-sizing: border-box;

  .col-2 {
    width: 20%;
  }

  .col-6 {
    width: 60%;
  }

  .col-content {
    border-right: 1px dashed #ccc;
    &-title {
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      padding: 0 10px;
      background-color: #f5f5f5;
    }

    .save-btn {
      display: inline-block;
      background-color: hsl(204, 88%, 48%);
      height: 25px;
      width: 50px;
      text-align: center;
      line-height: 25px;
      color: #fff;
      font-size: 14px;
      border-radius: 4px;
      cursor: pointer;
    }

    .preview-btn {
      border: 1px solid #999;
      display: inline-block;
      height: 25px;
      width: 50px;
      text-align: center;
      line-height: 25px;
      color: #333;
      font-size: 14px;
      border-radius: 4px;
      cursor: pointer;
      margin-left: 10px;
    }
  }

  .list-group {
    height: calc(100vh - 50px);
    padding: 0 40px;
    &-item {
      display: inline-block;
      text-align: center;
      width: 50%;
      padding: 10px 0;
      margin-bottom: 40px;
      &:hover {
        background-color: #f5f5f5;
        cursor: move;
      }
    }

    .icon {
      font-size: 30px;
      margin-bottom: 10px;
    }

    .name {
      font-size: 14px;
    }
  }

  .editor-box {
    display: flex;
    justify-content: center;
    height: calc(100vh - 50px);
    padding-top: 20px;
    box-sizing: border-box;
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
}
</style>
