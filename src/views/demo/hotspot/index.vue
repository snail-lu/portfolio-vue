<template>
    <demo :data="demoInfo">
        <div class="img-box" @mouseup.left.stop="mouseUp($event)">
            <img
                class="img"
                src="https://fastly.jsdelivr.net/gh/Snail-Lu/imageGalleries/gh-pages/2021-12/hotspot-example.webp"
                alt=""
                @mousedown.left.stop="mouseDown($event)"
            />
            <!--当前正在绘制的热区蒙版-->
            <div
                v-show="drawBoxVisible"
                class="spot"
                :style="{ width: width + 'px', height: height + 'px', left: startX + 'px', top: startY + 'px' }"
            />

            <!--已有的热区蒙版-->
            <hot-spot-item
                v-for="(item, index) in spotDataList"
                :id="index"
                :key="index"
                :area-init="item"
                @del="delSpot"
            />
        </div>
        <div class="hot-spot-list flex-box flex-wrap">
            <div class="hot-spot-item" v-for="(item, index) in spotDataList" :key="index">
                <div class="info-header">热区{{ index + 1 }}</div>
                <div class="info-content flex-box flex-v-center">
                    <div class="label">起点坐标：</div>
                    <div>{{ `(${item.startX},${item.startY})` }}</div>
                </div>
                <div class="info-content flex-box flex-v-center">
                    <div class="label">热区宽/高：</div>
                    {{ `${item.width}/${item.height}` }}
                </div>
                <div class="info-content flex-box flex-v-center">
                    <div class="label">热区链接：</div>
                    <el-input v-model="item.link" class="flex-item-1" placeholder="请输入热区链接"></el-input>
                </div>
            </div>
        </div>
    </demo>
</template>

<script>
import Demo from '@/components/Demo'
import HotSpotItem from './components/HotSpotItem.vue'
export default {
    components: {
        Demo,
        HotSpotItem
    },
    data() {
        return {
            demoInfo: {
                title: '绘制热区',
                url: ''
            },
            spotDataList: [],
            startX: 0,
            startY: 0,
            width: 0,
            height: 0,
            drawBoxVisible: false
        }
    },
    methods: {
        // 绘制热区开始
        mouseDown(e) {
            this.drawBoxVisible = true
            this.startX = e.layerX
            this.startY = e.layerY

            if (!document.onmousemove) {
                document.onmousemove = (ev) => {
                    this.width = ev.layerX - this.startX
                    this.height = ev.layerY - this.startY
                }
            }
        },

        // 移动绘制热区
        mouseMove(ev) {
            if (this.drawBoxVisible) {
                this.width = ev.layerX - this.startX
                this.height = ev.layerY - this.startY
            }
        },

        // 绘制热区结束
        mouseUp(e) {
            document.onmousemove = null
            const { drawBoxVisible, startX, startY, width, height } = this
            if (drawBoxVisible && width > 10 && height > 10) {
                const data = {
                    startX,
                    startY,
                    width,
                    height,
                    link: ''
                }
                this.spotDataList.push(data)
            }
            // 数据重置
            this.drawBoxVisible = false
            this.startX = 0
            this.startY = 0
            this.width = 0
            this.height = 0
        },

        // 删除指定热区
        delSpot(index) {
            this.spotDataList.splice(index, 1)
        }
    }
}
</script>

<style lang="scss" scoped>
.img-box {
    position: relative;
    overflow: hidden;

    .img {
        width: 100%;
        cursor: crosshair;
    }

    .spot {
        position: absolute;
        background: rgba(#2980b9, 0.3);
        border: 1px dashed #34495e;
        box-sizing: border-box;
        color: #fff;

        .el-icon-close {
            position: absolute;
            top: -6px;
            right: -6px;
            background-color: #fff;
            color: #000;
            border-radius: 100px;
            font-size: 12px;
        }
    }
}

.hot-spot-list {
    margin-top: 10px;
    .hot-spot-item {
        width: 45%;
        background-color: #f5f5f5;
        padding: 10px 20px;
        margin-bottom: 10px;
        margin-right: 2.5%;
        border-radius: 6px;

        .info-header {
            font-weight: bold;
            margin-bottom: 10px;
            text-align: center;
            font-size: 14px;
        }

        .info-content {
            margin-bottom: 20px;
            .label {
                font-size: 13px;
            }
        }
    }
}
</style>
