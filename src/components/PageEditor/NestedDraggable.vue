<template>
  <draggable :list="tasks" :group="{ name: 'componentsGroup' }" item-key="name">
    <template #item="{ element }">
      <div>
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
import Slider from './Slider.vue';
import GoodsList from './GoodsList.vue';

const components = {
    Image,
    Slider,
    GoodsList
};
const props = defineProps({
    tasks: {
        required: true,
        type: Array
    }
});
</script>

<style lang="scss" scoped></style>
