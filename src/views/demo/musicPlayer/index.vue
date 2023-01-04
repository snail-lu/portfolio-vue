<template>
    <demo :data="demoInfo">
        <div class="music-container">
            <div class="header flex-box flex-v-center">
                <span class="logo iconfont icon-music"></span>
                音乐播放器
            </div>
            <div class="content">
                <div
                    class="playlist animate__animated animate__faster"
                    :class="{
                        playlist__hidden: showPlaylistStatus === 0,
                        animate__slideInLeft: showPlaylistStatus === 1,
                        animate__slideOutLeft: showPlaylistStatus === 2
                    }"
                    v-if="showPlaylistStatus !== 0"
                >
                    <div
                        class="playlist-item flex-box flex-v-center"
                        :class="{ 'playlist-item-active': songIdx === index }"
                        v-for="(item, index) in playlist"
                        :key="item.url"
                    >
                        <div class="playlist-item-name">
                            <auto-scroll-text :text="item.name" />
                        </div>
                        <div class="playlist-item-author">
                            <auto-scroll-text :text="item.author" />
                        </div>
                        <span
                            :class="['play-btn iconfont', songIdx !== index || paused ? 'icon-play' : 'icon-pause']"
                            @click="playControl(index)"
                            :title="songIdx !== index || paused ? '播放' : '暂停'"
                        ></span>
                    </div>
                </div>
                <!-- CD机 -->
                <div class="disc flex-box flex-v-center flex-h-center">
                    <div class="disc-outer flex-box flex-v-center flex-h-center">
                        <div class="disc-inner">
                            <img
                                v-if="playlist[songIdx]"
                                :src="playlist[songIdx].coverUrl"
                                class="cover-img"
                                :class="{ 'cover-img-rotate': enableRotate, 'cover-img-rotate-paused': paused }"
                                alt=""
                            />
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
                        <span class="song-name">{{ playlist[songIdx]?.name }}</span>
                        <span class="song-singer"> - {{ playlist[songIdx]?.author }}</span>
                    </div>

                    <!-- 音乐时长 -->
                    <div class="music-duration">
                        <span>{{ playedTime }}</span>
                        <span> / {{ totalTime }}</span>
                    </div>
                </div>

                <!-- 播放进度 -->
                <div class="progress">
                    <slider v-model="sliderCurrentTime" :max="duration" @change="onChangeProgress" @drag="onDraggingProgress" />
                </div>

                <!-- 播放控制 -->
                <div class="controls flex-box flex-v-center flex-h-between">
                    <div class="playlist-btn iconfont icon-playlist" title="播放列表" @click="switchShowPlaylist"></div>
                    <div>
                        <span class="prev iconfont icon-prev" title="上一首" @click="onClickPrev"></span>
                        <span
                            :class="['switch iconfont', paused ? 'icon-play' : 'icon-pause']"
                            @click="playControl()"
                            :title="paused ? '播放' : '暂停'"
                        ></span>
                        <span class="next iconfont icon-next" title="下一首" @click="onClickNext"></span>
                    </div>

                    <!-- 音量调节 -->
                    <div class="volume">
                        <span class="volume-icon iconfont icon-volume" @click="changeVolumeControlsVisible"></span>
                        <div class="volume-controls" v-if="volumeControlsVisible">
                            <slider v-model="volume" :max="1" :step="0.1" vertical />
                        </div>
                    </div>
                </div>
            </div>
            <audio
                ref="audio"
                @canplay="canplay"
                @timeupdate="timeupdate"
                @ended="ended"
                v-if="playlist.length > 0"
                :src="playlist[songIdx].url"
            ></audio>
        </div>
    </demo>
</template>

<script setup>
import Demo from '@/components/Demo/index.vue';
import Slider from '@/components/Slider/Slider.vue';
import AutoScrollText from '@/components/AutoScrollText/AutoScrollText.vue';
import { ref, computed, getCurrentInstance } from 'vue';
import getLyric from '@/utils/lyric.js';

const demoInfo = {
    title: '音乐播放器',
    url: ''
};

const { proxy: _this } = getCurrentInstance();
// 播放列表
const playlist = ref([]);
const showPlaylistStatus = ref(0);
const switchShowPlaylist = () => {
    if (showPlaylistStatus.value === 1) {
        showPlaylistStatus.value = 2;
    } else {
        showPlaylistStatus.value = 1;
    }
};
_this.req({ url: '/demo/playlist' }).then((res) => {
    playlist.value = res.result.list;
});
const songIdx = ref(0);

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

// 音频是否暂停
const paused = ref(true);
// 播放/暂停
const audio = ref(null);
const playControl = (index) => {
    if (typeof index !== 'undefined') {
        songIdx.value = index;
    }
    if (audio.value.paused) {
        audio.value.play();
        enableRotate.value = true;
    } else {
        audio.value.pause();
        paused.value = audio.value.paused;
    }

    // 手动播放过音乐，播放器就不再是初始状态
    isInit.value = false;
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

// 歌词数据
let lyricObj = reactive({
    ms: [],
    al: '',
    ar: '',
    by: '',
    offset: 0,
    ti: ''
});
// 播放器初始状态
const isInit = ref(true);
// cd机是否开启旋转功能
const enableRotate = ref(false);
// canplay监听
const canplay = () => {
    duration.value = Math.round(audio.value.duration);

    // 获取歌词数据
    getLyric('', playlist.value[songIdx.value].lyricUrl).then((data) => {
        if (data) {
            for (let key in data) {
                lyricObj[key] = data[key];
            }
        }
    });
    // 非初始状态下，切歌后会触发自动播放
    if (!isInit.value) {
        audio.value.play();
        enableRotate.value = true;
    }
};

// 当前歌词行
const currentLine = ref(0);
watch(currentTime, (newCurrentTime) => {
    if (lyricObj.ms && newCurrentTime > 0) {
        const len = lyricObj.ms.length;
        if (newCurrentTime > parseFloat(lyricObj.ms[len - 1].t)) {
            // 已经播到了最后一行歌词
            currentLine.value = len - 1;
        } else if (currentLine.value < len - 2) {
            // 找到下一行歌词，减一后得到当前行歌词
            let nextLine = lyricObj.ms.findIndex((lyricItem) => newCurrentTime < lyricItem.t);
            if (nextLine > 0) {
                currentLine.value = nextLine - 1;
            }
        }
    }
});

// 歌词位置
const lyricPosition = computed(() => {
    const lyricHeight = 30;
    if (currentLine.value * lyricHeight >= 150) {
        return -(currentLine.value * lyricHeight - 150) + 'px';
    }
});

// timeupdate监听，更新播放时长
const timeupdate = () => {
    if (isDragging.value) return;
    let time = Math.round(audio.value.currentTime);
    sliderCurrentTime.value = time;
    currentTime.value = time;
    paused.value = audio.value.paused;
};

// 结束时
const ended = () => {
    paused.value = true; // 切换为暂停状态
    currentTime.value = 0; // currentTime清零
    enableRotate.value = false; // cd机恢复原装
    onClickNext(); // 自动播放下一首
};

// 切换歌曲
const onClickNext = () => {
    if (songIdx.value < playlist.value.length - 1) {
        songIdx.value++;
    } else {
        songIdx.value = 0;
    }
};
const onClickPrev = () => {
    if (songIdx.value > 0) {
        songIdx.value--;
    } else {
        songIdx.value = playlist.value.length - 1;
    }
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
        position: relative;

        .playlist {
            position: absolute;
            z-index: 100;
            top: 0;
            left: 0;
            height: 100%;
            width: 260px;
            background-color: rgba(33, 33, 36, 0.7);
            color: #fff;
            border-right: 1px solid #333;
            overflow-y: auto;

            &::-webkit-scrollbar-track-piece {
                background: #333;
            }

            &::-webkit-scrollbar {
                width: 6px;
            }

            &::-webkit-scrollbar-thumb {
                background: #666;
                border-radius: 20px;
            }

            &__hidden {
                visibility: hidden;
            }

            &-item {
                height: 36px;
                border-bottom: 1px solid #2a2a2a;
                padding-left: 16px;
                color: #999;

                &:last-child {
                    border-bottom: none;
                }

                &-name {
                    width: 120px;
                    font-size: 13px;
                    margin-right: 10px;
                    display: inline-block;
                }

                &-author {
                    width: 80px;
                    font-size: 12px;
                    display: inline-block;
                }
            }

            &-item-active {
                .playlist-item-name {
                    color: #ec4141;
                }
            }

            .play-btn {
                font-size: 10px;
                cursor: pointer;
                margin-left: 5px;
            }
        }

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
            .cover-img {
                width: 100%;
                height: 100%;
                &-rotate {
                    animation: rotate 20s linear infinite;
                    animation-play-state: running;
                }

                &-rotate-paused {
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
        background-color: #212124;
        border-top: 1px solid #333;
        .music-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 16px 4px;
            color: #aaa;

            .song-name {
                font-size: 14px;
            }

            .song-singer {
                font-size: 12px;
            }
        }

        .music-duration {
            font-size: 12px;
        }
        .progress {
            margin: 0 16px;
        }

        .controls {
            padding: 0 16px;

            .playlist-btn {
                font-size: 20px;
                font-weight: bold;
                cursor: pointer;
            }
            .switch {
                display: inline-block;
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
                height: 30px;
                right: 20px;
                position: relative;

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
                    z-index: 1000;
                }
            }
        }
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
