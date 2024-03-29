<template>
    <div class="lazy-load-wrapper">
        <!-- 加载中 -->
        <img
            :src="loadSrc"
            ref="loadImg"
            class="loading-placeholder"
            :style="{
                display: isShow ? 'none' : 'relative',
                opacity: isShow ? '0' : '1',
                borderRadius,
                width,
                height,
                transition: `opacity ${duration / 1000}s ${effect}`
            }"
        />

        <!-- 加载成功 -->
        <img
            class="main-img"
            @load="load"
            @error="error"
            v-if="status == 1"
            :src="src"
            :style="{
                opacity: isShow ? '1' : '0',
                borderRadius,
                width,
                transition: `opacity ${duration / 1000}s ${effect}`
            }"
        />
        <!-- 加载失败 -->
        <img
            class="loading-placeholder"
            v-if="status == 2"
            :src="errorSrc"
            :style="{
                opacity: isShow ? '1' : '0',
                borderRadius,
                width,
                height,
                transition: `opacity ${duration / 1000}s ${effect}`
            }"
        />
    </div>
</template>

<script>
let loadTimer = null;
/**
 * 懒加载图片组件
 * @description 懒加载图片组件
 *
 * @property {String}           borderRadius        图片圆角,必须带尺寸单位
 * @property {String}           width               图片宽度,必须带尺寸单位(默认200px)
 * @property {String}           height              占位图高度,必须带尺寸单位(默认200px),实际图片高度会根据宽度自适应
 * @property {String}           src                 图片链接,不传的话会一直是加载中状态
 * @property {String|Number}    minTimeOut          当图片加载过快(存在缓存)至少显示多少秒加载动画
 * @property {String}           effect = [linear|ease|ease-in|ease-out|ease-in-out] 过渡效果,可以用cubic-bezier
 *  @value linear       规定以相同速度开始至结束的过渡效果(默认)
 *  @value ease         规定慢速开始,然后变快,然后慢速结束的过渡效果
 *  @value ease-in      规定以慢速开始的过渡效果
 *  @value ease-out     规定以慢速结束的过渡效果
 *  @value ease-in-out  规定以慢速开始和结束的过渡效果
 * @property {String|Number}    duration            图片加载成功后的过渡时间,单位毫秒
 * @property {Object}           showDistance        当图片到屏幕哪个位置的时候开始加载,单位px,可以是负数 (默认{bottom:0})
 * @property {String}           loadSrc             加载中显示的图片，输入网络路径或绝对路径
 * @property {String}           errorSrc            加载失败显示的图片，输入网络路径或绝对路径
 * @example <muqian-lazyLoad :src="src" width="100rpx" height="100rpx"></muqian-lazyLoad>
 */

export default {
    name: 'LazyLoadImg',
    props: {
        // 图片圆角 必须带尺寸单位
        borderRadius: {
            type: String,
            default: '0'
        },
        // 图片宽度
        width: {
            type: String,
            default: '200px'
        },
        // 占位图高度
        height: {
            type: String,
            default: '200px'
        },
        // 图片链接
        src: {
            type: String,
            default: ''
        },
        // 当图片加载过快(存在缓存)至少显示多少秒加载动画
        minTimeOut: {
            type: String || Number,
            default: '300'
        },
        // 当图片到屏幕哪个位置的时候开始加载 单位px 可以是负数
        showDistance: {
            type: Object,
            default: () => {}
        },
        // 过渡效果  linear / ease / ease-in / ease-out / ease-in-out
        effect: {
            type: String,
            default: 'linear'
        },
        // 图片加载成功后的过渡时间 单位毫秒
        duration: {
            type: String || Number,
            default: '300'
        },
        // 加载中图片
        loadSrc: {
            type: String,
            default:
                'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0ibWFyZ2luOiBhdXRvOyBiYWNrZ3JvdW5kOiBub25lOyBkaXNwbGF5OiBibG9jazsgc2hhcGUtcmVuZGVyaW5nOiBhdXRvOyIgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPgo8ZGVmcz4KICA8cGF0aCBpZD0icGF0aCIgZD0iTTUwIDE1QTE1IDM1IDAgMCAxIDUwIDg1QTE1IDM1IDAgMCAxIDUwIDE1IiBmaWxsPSJub25lIj48L3BhdGg+CiAgPHBhdGggaWQ9InBhdGhhIiBkPSJNMCAwQTE1IDM1IDAgMCAxIDAgNzBBMTUgMzUgMCAwIDEgMCAwIiBmaWxsPSJub25lIj48L3BhdGg+CjwvZGVmcz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgwIDUwIDUwKSI+Cjx1c2UgeGxpbms6aHJlZj0iI3BhdGgiIHN0cm9rZT0iI2RmZGZkZiIgc3Ryb2tlLXdpZHRoPSIzIj48L3VzZT4KPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDYwIDUwIDUwKSI+Cjx1c2UgeGxpbms6aHJlZj0iI3BhdGgiIHN0cm9rZT0iI2RmZGZkZiIgc3Ryb2tlLXdpZHRoPSIzIj48L3VzZT4KPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDEyMCA1MCA1MCkiPgo8dXNlIHhsaW5rOmhyZWY9IiNwYXRoIiBzdHJva2U9IiNkZmRmZGYiIHN0cm9rZS13aWR0aD0iMyI+PC91c2U+CjwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgwIDUwIDUwKSI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMTUiIHI9IjkiIGZpbGw9IiNlMTViNjQiPgogIDxhbmltYXRlTW90aW9uIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMHMiPgogICAgPG1wYXRoIHhsaW5rOmhyZWY9IiNwYXRoYSI+PC9tcGF0aD4KICA8L2FuaW1hdGVNb3Rpb24+CjwvY2lyY2xlPgo8L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoNjAgNTAgNTApIj4KPGNpcmNsZSBjeD0iNTAiIGN5PSIxNSIgcj0iOSIgZmlsbD0iI2Y4YjI2YSI+CiAgPGFuaW1hdGVNb3Rpb24gZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSItMC4xNjY2NjY2NjY2NjY2NjY2NnMiPgogICAgPG1wYXRoIHhsaW5rOmhyZWY9IiNwYXRoYSI+PC9tcGF0aD4KICA8L2FuaW1hdGVNb3Rpb24+CjwvY2lyY2xlPgo8L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDUwIDUwKSI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMTUiIHI9IjkiIGZpbGw9IiNhYmJkODEiPgogIDxhbmltYXRlTW90aW9uIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iLTAuMzMzMzMzMzMzMzMzMzMzM3MiPgogICAgPG1wYXRoIHhsaW5rOmhyZWY9IiNwYXRoYSI+PC9tcGF0aD4KICA8L2FuaW1hdGVNb3Rpb24+CjwvY2lyY2xlPgo8L2c+CjwhLS0gZ2VuZXJhdGVkIGJ5IGh0dHBzOi8vbG9hZGluZy5pby8gLS0+PC9zdmc+'
        },
        // 加载失败图片
        errorSrc: {
            type: String,
            default:
                'data:image/png;base64,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'
        }
    },
    data() {
        return {
            status: 0, // 0加载中 1加载成功 2加载失败
            isShow: false
        };
    },
    watch: {
        // 当链接变化重新加载
        src() {
            if (!this.isShow) return;
            this.status = 0;
            this.isShow = false;
            this.$nextTick(() => {
                this.status = 1;
            });
        }
    },
    mounted() {
        let observer = new IntersectionObserver(
            ([{ isIntersecting }]) => {
                if (isIntersecting) {
                    this.status = 1;
                    loadTimer = new Date().getTime();
                    observer.unobserve(this.$refs.loadImg);
                }
            },
            {
                rootMargin: '0px 0px 100px 0px' // 扩展底部视图范围100px，当loadImg距离视窗100px以内时，触发回调
            }
        );

        observer.observe(this.$refs.loadImg);
    },
    unmounted() {
        // 页面销毁取消监听
        this.$emit('destroyed');
    },
    methods: {
        load() {
            if (this.minTimeOut == 0) {
                this.isShow = true;
                return;
            }
            let newTimer = new Date().getTime() - loadTimer;
            if (newTimer < this.minTimeOut) {
                setTimeout(() => {
                    this.isShow = true;
                }, this.minTimeOut - newTimer);
            } else {
                this.isShow = true;
            }
        },
        error() {
            this.status = 2;
            this.isShow = true;
        }
    }
};
</script>

<style lang="scss" scoped>
.lazy-load-wrapper {
    img {
        display: block;
    }

    .loading-placeholder {
        object-fit: contain;
    }

    .main-img {
        object-fit: contain;
    }
}
</style>
