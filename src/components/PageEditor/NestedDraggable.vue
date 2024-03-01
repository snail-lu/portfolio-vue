<template>
  <draggable
    :list="tasks"
    :group="{ name: 'componentsGroup' }"
    item-key="name"
    @choose="onChoose"
  >
    <template #item="{ element, index }">
      <div
        :class="`${
          activeIndex === index ? 'component-wrapper-active' : 'component-wrapper'
        }`"
      >
        <component :is="components[element.component]">
          <nested-draggable :tasks="element.children" />
        </component>
      </div>
    </template>
  </draggable>
</template>

<script setup>
import draggable from 'vuedraggable';
import Image from './Image.vue';
import Swiper from './Swiper.vue';
import GoodsList from './GoodsList.vue';

const components = {
    Image,
    Swiper,
    GoodsList
};
const props = defineProps({
    tasks: {
        required: true,
        type: Array
    }
});

const activeIndex = ref('');
const onChoose = (evt) => {
    activeIndex.value = evt.oldIndex;
};
</script>

<style lang="scss" scoped>
.component-wrapper {
  position: relative;

  &-active {
    position: relative;

    &:after {
      position: absolute;
      content: "";
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
    content: "";
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    transition: box-shadow 0.3s ease;
  }

  &:hover {
    &:after {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      box-shadow: inset 0 0 10px 2px #7aaee9;
      transition: box-shadow 0.3s ease;
    }
  }
}
</style>
