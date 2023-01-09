import { mapState, mapActions } from 'vuex';
export default {
    computed: {
        ...mapState(['isScreenFull'])
    },
    methods: {
        ...mapActions(['changeSetting']),
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.isScreenFull) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                this.changeSetting({ key: 'isScreenFull', value: false });
                window.removeEventListener('fullscreenchange', this.fullscreenchangeHandler);
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
                this.changeSetting({ key: 'isScreenFull', value: true });
                window.addEventListener('fullscreenchange', this.fullscreenchangeHandler);
            }
        },
        // 退出全屏事件回调
        fullscreenchangeHandler() {
            const isFull = document.fullscreenElement;
            if (!isFull) {
                this.changeSetting({ key: 'isScreenFull', value: false });
            }
        }
    }
};
