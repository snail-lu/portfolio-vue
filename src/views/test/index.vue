<template>
  <div class="test-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content">
          <div>常用组件</div>
          <!-- <nested-draggable :tasks="list" /> -->
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content">预览区域</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">组件配置</div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
// import nestedDraggable from "@/components/NestedDraggable/NestedDraggable.vue";
const list = ref([
    {
        name: 'task 1',
        tasks: [
            {
                name: 'task 2',
                tasks: []
            }
        ]
    },
    {
        name: 'task 3',
        tasks: [
            {
                name: 'task 4',
                tasks: []
            }
        ]
    },
    {
        name: 'task 5',
        tasks: []
    }
]);
</script>

<style lang="scss" scoped>
.test-container {
  background-color: #fff;
  width: 100%;
  min-height: 100vh;
  padding: 40px;
  margin: 0 auto 0;
}
</style>
