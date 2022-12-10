<template>
    <div class="waterfall-wrapper" :style="{ 'column-gap': gaps[1] }">
        <!-- 列渲染 -->
        <div class="col-wrapper" ref="cols" v-for="(col, i) in colData" :key="i" :style="{ 'row-gap': gaps[0] }">
            <div class="row-wrapper" :class="[animation]" v-for="(row, j) in col" :key="j">
                <div class="waterfall-card">
                    <img class="waterfall-img" :src="row.img" />
                    <p class="title">{{ row.value }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { checkIntersectionObserver } from '@/utils/index';
import { nextTick, ref, watch } from 'vue';
let observerObj;
let minCol = 0; // 最小列索引
let innerData = []; // 瀑布流数据队列
let count = 0; // 已经渲染的数量

const props = defineProps({
    // 瀑布流数据
    data: {
        type: Array,
        default: () => []
    },
    // 列数
    col: {
        type: Number,
        default: 2
    },
    // 行、列间距
    gaps: {
        type: Array,
        default: () => ['0px', '0px']
    },
    // 首屏开启并行渲染，减少白屏时间
    firstPageCount: {
        type: Number,
        default: 10
    },
    animation: {
        type: String,
        default: 'hapi' // hapi|osiris
    },
    // 扩展intersectionRect交叉区域，可以提前加载部分数据，优化用户浏览体验
    rootMargin: {
        type: String,
        default: '0px 0px 400px 0px'
    }
});

// 列数据（二维数组）
const colData = ref([]);
// 根据配置的列数，初始化列数据
const initColData = () => {
    for (let i = 0; i < props.col; i++) {
        colData.value[i] = [];
    }
};
initColData();

watch(
    () => props.data,
    (v) => {
        innerData = [...innerData, ...v];
        waterfall();
    }
);

function waterfall() {
    // 更新瀑布流高度最小列
    updateMinCol();
    // 取出数据源中最靠前的一个并添加到瀑布流高度最小的那一列
    appendColData();
    // 首屏采用并行渲染，非首屏采用串行渲染
    if (++count < props.firstPageCount) {
        nextTick(() => {
            waterfall();
        });
    } else {
        nextTick(() => {
            startObserver();
        });
    }
}

const cols = ref(null);
function updateMinCol() {
    // 首屏渲染时，不计算高度，依次放到不同列中
    if (count < props.firstPageCount) {
        minCol = count % props.col;
        return;
    }
    // 后续渲染根据列高进行数据分配
    const heightList = cols.value.map((item) => item.offsetHeight);
    const minHeight = Math.min(...heightList);
    minCol = heightList.indexOf(minHeight);
}

// 开始监测新增加的瀑布流元素
function startObserver() {
    const nodes = cols.value[minCol].querySelectorAll('.waterfall-img');
    const lastNode = nodes[nodes.length - 1];
    observerObj.observe(lastNode);
}

// 将innerData中的数据依次移至最小列中
function appendColData() {
    const colItem = innerData.shift();
    colData.value[minCol].push(colItem);
}

function init() {
    // 不支持IntersectionObserver的场景下，动态引入polyfill
    const ioPromise = checkIntersectionObserver() ? Promise.resolve() : import('intersection-observer');

    ioPromise.then(() => {
        // 瀑布流布局：取出数据源中最靠前的一个并添加到瀑布流高度最小的那一列，等图片完全加载后重复该循环
        observerObj = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const { target, isIntersecting } = entry;
                    if (isIntersecting) {
                        const done = () => {
                            if (innerData.length) {
                                waterfall();
                            } else {
                                // this.$emit('rendered');
                            }
                            // 停止观察，防止回拉时二次触发监听逻辑
                            observerObj.unobserve(target);
                        };

                        if (target.complete) {
                            done();
                        } else {
                            target.onload = target.onerror = done;
                        }
                    }
                }
            },
            {
                rootMargin: props.rootMargin
            }
        );
    });
}

init();
</script>
<style lang="scss" scoped>
.waterfall-wrapper {
    display: flex;
    align-items: flex-start;

    .col-wrapper {
        display: flex;
        flex: 1 1 0%;
        flex-direction: column;
    }

    .waterfall-card {
        width: 236px;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        .title {
            width: 100%;
            overflow: hidden;
            padding: 0 10px;
            box-sizing: border-box;
        }
    }

    .hapi {
        .waterfall-card {
            animation: 0.4s hapi-animation linear;
            animation-fill-mode: forwards;
        }

        @keyframes hapi-animation {
            from {
                opacity: 0;
                transform-origin: 50% 50%;
                transform: scale(0);
            }

            to {
                opacity: 1;
                transform-origin: 50% 50%;
                transform: scale(1);
            }
        }
    }

    .osiris {
        .waterfall-card {
            animation: 0.4s osiris-animation linear;
            animation-fill-mode: forwards;
        }

        @keyframes osiris-animation {
            from {
                opacity: 0;
                transform-origin: 50% 50%;
                transform: translateZ(-3000px) rotateY(-1turn);
            }

            to {
                opacity: 1;
                transform-origin: 50% 50%;
                transform: translateZ(0) rotateY(0turn);
            }
        }
    }
}
</style>
