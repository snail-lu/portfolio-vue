<template>
    <demo :data="demoInfo">
        <div class="music-container">
            <div class="header flex-box flex-v-center">
                <span class="logo iconfont icon-music"></span>
                音乐播放器
            </div>
            <div class="content">
                <!-- {/* CD机 */} -->
                <div class="disc flex-box flex-v-center flex-h-center">
                    <div class="disc-outer flex-box flex-v-center flex-h-center">
                        <div class="disc-inner">
                            <img src="./music_cover.jpg" :class="['cover-img-rotate', paused ? 'cover-img-rotate-paused' : '']" alt="" />
                        </div>
                    </div>
                </div>
                <!-- 歌词 -->
                <div class="lyric" :style="{ marginTop: lyricPosition }">
                    <p
                        :class="['lyric-text', currentLine === lyricIndex ? 'lyric-text-current' : '']"
                        v-for="(lyric, lyricIndex) in lyricObj.ms"
                        :key="lyric.t"
                    >
                        {{ lyric.c }}
                    </p>
                </div>
            </div>
            <div class="footer">
                <!-- 歌曲信息 -->
                <div class="music-info">
                    <!-- 音乐名 -->
                    <div>
                        <span class="song-name">{{ lyricObj.ti }}</span>
                        <span>---</span>
                        <span class="song-singer">{{ lyricObj.ar }}</span>
                    </div>

                    <!-- 音乐时长 -->
                    <div class="music-duration">
                        <span>{{ playedTime }}</span
                        >/<span>{{ totalTime }}</span>
                    </div>
                </div>

                <!-- 播放进度 -->
                <div class="progress">
                    <!-- <el-slider :max="duration" :min="0" v-model="currentTime" @change="adjustProgress" :show-tooltip="false" size="small" /> -->
                    <slider v-model="sliderCurrentTime" :max="duration" @change="onChangeProgress" @drag="onDraggingProgress" />
                </div>

                <!-- 播放控制 -->
                <div class="controls flex-box flex-h-center flex-v-center">
                    <span class="prev iconfont icon-prev" title="上一首"></span>
                    <span
                        :class="['switch iconfont', paused ? 'icon-play' : 'icon-pause']"
                        @click="playControl"
                        :title="paused ? '播放' : '暂停'"
                    ></span>
                    <span class="next iconfont icon-next" title="下一首"></span>

                    <!-- 音量调节 -->
                    <div class="volume">
                        <span class="volume-icon iconfont icon-volume" @click="changeVolumeControlsVisible"></span>
                        <div class="volume-controls" v-if="volumeControlsVisible">
                            <!-- <el-slider :value="volume" :max="1" :step="0.1" vertical @change="adjustVolume" :show-tooltip="false" /> -->
                            <slider v-model="volume" :max="1" :step="0.1" vertical />
                        </div>
                    </div>
                </div>
            </div>
            <audio ref="audio" @canplay="canplay" @timeupdate="timeupdate" @ended="ended">
                <source src="./有何不可.mp3" />
                Your browser does not support the<code>audio</code> element.
            </audio>
        </div>
    </demo>
</template>

<script setup>
import Demo from '@/components/Demo/index.vue';
import Slider from '@/components/Slider/Slider.vue';
import { ref, computed, reactive } from 'vue';
import getLyric from '@/utils/lyric.js';

const demoInfo = {
    title: '音乐播放器',
    url: ''
};

// 总时长，单位：秒
const duration = ref(0);
// 总时长 mm:ss
const totalTime = computed(() => {
    return transformTime(duration.value);
});

// 已播放时长，单位：秒
const currentTime = ref(0);
const sliderCurrentTime = ref(0);
// 已播放时长 mm:ss
const playedTime = computed(() => {
    return transformTime(sliderCurrentTime.value);
});

// 歌词数据
const lyricObj = ref({});
getLyric('', '../有何不可.lrc').then((data) => {
    lyricObj.value = data;
});

// 当前歌词行
const currentLine = computed(() => {
    let currentSecond = Math.floor(currentTime.value);
    if (lyricObj.value.ms && currentSecond > 0) {
        if (currentLine.value < lyricObj.value.ms.length - 2) {
            // 找到下一行歌词，减一后得到当前行歌词
            let nextLine = lyricObj.value.ms.findIndex((lyricItem) => currentSecond < lyricItem.t);
            return nextLine > 0 ? nextLine - 1 : 0;
        } else {
            // 已经播到了最后一行歌词
            return lyricObj.value.ms.length - 1;
        }
    } else {
        return 0;
    }
});

// 歌词位置
const lyricPosition = computed(() => {
    const lyricHeight = 30;
    if (currentLine.value * lyricHeight >= 150) {
        return -(currentLine.value * lyricHeight - 150) + 'px';
    }
});

const paused = ref(true); // 音频是否暂停
// 播放/暂停
const audio = ref(null);
const playControl = () => {
    if (audio.value.paused) {
        audio.value.play();
    } else {
        audio.value.pause();
    }

    paused.value = audio.value.paused;
};

// 音量调节
const volume = ref(0.2);
watch(
    volume,
    (volume) => {
        if (audio.value) {
            audio.value.volume = volume;
        }
    },
    { immediate: true }
);

// 正在拖拽进度
const isDragging = ref(false);
const onDraggingProgress = (value) => {
    isDragging.value = true;
};
// 调节进度
const onChangeProgress = (value) => {
    audio.value.currentTime = value;
    isDragging.value = false;
};

// 显示/隐藏音量调节框
const volumeControlsVisible = ref(false);
const changeVolumeControlsVisible = () => {
    volumeControlsVisible.value = !volumeControlsVisible.value;
};

// 数字转换为 mm:ss 的格式
const transformTime = (num) => {
    let min = Math.floor(num / 60);
    let sec = Math.floor(num % 60);

    min = String(min).padStart(2, '0');
    sec = String(sec).padStart(2, '0');

    return `${min}:${sec}`;
};

// canplay监听
const canplay = () => {
    duration.value = Math.round(audio.value.duration);
};

// timeupdate监听，更新播放时长
const timeupdate = () => {
    if (isDragging.value) return;
    let time = Math.round(audio.value.currentTime);
    sliderCurrentTime.value = time;
    currentTime.value = time;
};

// 结束时
const ended = () => {
    paused.value = true;
    currentTime.value = 0;
};
</script>

<style lang="scss" scoped>
.music-container {
    width: 580px;
    height: 480px;
    margin: 50px auto 0;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: #292929;
    .header {
        height: 40px;
        background-color: #282828;
        color: #fff;
        font-size: 14px;
        border-bottom: 1px solid #8b1313;
        padding-left: 10px;

        .logo {
            font-size: 20px;
            margin-right: 5px;
        }
    }
    .content {
        flex: 1;
        display: flex;
        height: 0;
        overflow-y: hidden;
        .disc {
            flex: 1;
            .disc-outer {
                background: #18191b;
                border: 8px solid #353535;
                width: 180px;
                height: 180px;
                border-radius: 50%;
            }
            .disc-inner {
                border: 4px solid #202022;
                width: 100px;
                height: 100px;
                background: #fff;
                border-radius: 50%;
                overflow: hidden;
            }
            .cover-img-rotate {
                width: 100%;
                height: 100%;
                animation: rotate 20s linear infinite;
                animation-play-state: running;

                &-paused {
                    animation-play-state: paused;
                }
            }
        }
        .lyric {
            flex: 1;
            text-align: center;
            position: relative;
            transition: margin-top 0.5s;
            .lyric-text {
                color: #999;
                line-height: 30px;
                height: 30px;
                font-size: 14px;
                margin-bottom: 0;
                margin-top: 0;
                &-current {
                    color: #fff;
                    font-size: 16px;
                    height: 30px;
                    line-height: 30px;
                }
            }
        }
    }
    .footer {
        height: 100px;
        color: #fff;
        font-size: 13px;
        background-color: #212124;
        border-top: 1px solid #666;
        .music-info {
            display: flex;
            justify-content: space-between;
            padding: 8px 16px 4px;
        }
        .progress {
            margin: 0 16px;
        }
        .controls {
            position: relative;
            .switch {
                font-size: 20px;
                text-align: center;
                cursor: pointer;
                margin: 0 30px;
                background-color: rgba(255, 255, 255, 0.1);
                width: 40px;
                height: 40px;
                line-height: 40px;
                border-radius: 40px;

                &:hover {
                    background-color: rgba(255, 255, 255, 0.2);
                }
            }
            .prev {
                font-size: 20px;
                line-height: 35px;
                text-align: center;
                cursor: pointer;

                &:hover {
                    color: #ec4141;
                }
            }
            .next {
                font-size: 20px;
                line-height: 35px;
                text-align: center;
                cursor: pointer;

                &:hover {
                    color: #ec4141;
                }
            }
            .volume {
                position: absolute;
                height: 30px;
                right: 20px;
                top: 50%;
                margin-top: -15px;
                &-icon {
                    height: 30px;
                    line-height: 30px;
                    width: 30px;
                    font-size: 20px;
                    cursor: pointer;
                }

                &-controls {
                    position: absolute;
                    top: -55px;
                    left: 50%;
                    height: 90px;
                    padding: 15px 4px;
                    transform: translate(-50%, -50%);
                    background-color: #333;
                    border-radius: 5px;
                }
            }
        }
    }
}

@keyframes move {
    0% {
        transform: translate(0px);
    }
    100% {
        transform: translate(-2400px);
    }
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
