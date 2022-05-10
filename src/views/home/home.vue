<template>
	<el-container class="home-container">
		<el-main class="content">
			<!-- <img class="avatar-img" alt="Vue logo" src="./../../assets/images/avatar.jpg" /> -->
			<!-- <h1>{{ msg }}</h1> -->
			<video class="home-video"
				src="https://cdn.jsdelivr.net/gh/Snail-Lu/imageGalleries/portfolio-vue/videos/bg.mp4" autoplay loop
				muted></video>
			<!-- <audio
				ref="bgm"
				src="https://cdn.jsdelivr.net/gh/Snail-Lu/imageGalleries/portfolio-vue/videos/beach-during-sunset.mp3"
				autoplay
				loop
			></audio> -->
		</el-main>
	</el-container>
</template>

<script>
export default {
	name: 'Home',
	data() {
		return {
			msg: 'Welcome~'
		}
	},
	mounted() {
		// this.$refs.bgm.volume = 0.1
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home-container {
	height: 100%;
	/* background-image: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%); */
	// background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
}

.content {
	padding: 0;
	height: calc(100vh - 60px);
	overflow: hidden;
	background-image: url('https://cdn.jsdelivr.net/gh/Snail-Lu/imageGalleries/portfolio-vue/images/deer-bg.jpg');
	background-size: cover;
	background-position: center;

	.home-video {
		width: 100%;
	}
}
</style>
