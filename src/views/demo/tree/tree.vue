<template>
    <demo :data="demoInfo">
        <el-button type="primary" @click="onExpand" size="mini">{{ expandAll ? '收缩' : '展开' }}所有节点</el-button>
        <el-tree :data="data" ref="tree"></el-tree>
    </demo>
</template>

<script>
import Demo from '@/components/Demo/index.vue';
export default {
    components: {
        Demo
    },
    data() {
        return {
            demoInfo: {
                title: '节点树展开/收缩',
                url: 'https://snail-lu.vercel.app/2020-05-05-element-ui-zhong-el-tree-zu-jian-jie-dian-quan-zhan-kai-yu-quan-shou-suo-gong-neng-shi-xian.html'
            },
            expandAll: false,
            data: [
                {
                    label: '一级 1',
                    children: [
                        {
                            label: '二级 1-1',
                            children: [
                                {
                                    label: '三级 1-1-1'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '一级 2',
                    children: [
                        {
                            label: '二级 2-1',
                            children: [
                                {
                                    label: '三级 2-1-1'
                                }
                            ]
                        },
                        {
                            label: '二级 2-2',
                            children: [
                                {
                                    label: '三级 2-2-1'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '一级 3',
                    children: [
                        {
                            label: '二级 3-1',
                            children: [
                                {
                                    label: '三级 3-1-1'
                                }
                            ]
                        },
                        {
                            label: '二级 3-2',
                            children: [
                                {
                                    label: '三级 3-2-1'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '一级 4',
                    children: [
                        {
                            label: '二级 4-1',
                            children: [
                                {
                                    label: '三级 4-1-1'
                                },
                                {
                                    label: '三级 4-1-2'
                                }
                            ]
                        },
                        {
                            label: '二级 4-2',
                            children: [
                                {
                                    label: '三级 4-2-1'
                                },
                                {
                                    label: '三级 4-2-2'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        // 节点树
        async onExpand() {
            this.expandAll = !this.expandAll;
            // 改变每个节点的状态
            this.changeTreeNodeStatus(this.$refs.tree.store.root);
        },
        // 改变节点的状态
        changeTreeNodeStatus(node) {
            node.expanded = this.expandAll;
            for (let i = 0; i < node.childNodes.length; i++) {
                // 改变节点的自身expanded状态
                node.childNodes[i].expanded = this.expandAll;
                // 遍历子节点
                if (node.childNodes[i].childNodes.length > 0) {
                    this.changeTreeNodeStatus(node.childNodes[i]);
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.el-button {
    margin-bottom: 10px;
}
</style>
