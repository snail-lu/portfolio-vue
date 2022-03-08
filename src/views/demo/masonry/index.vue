<template>
	<div class="grid">
		<div class="grid-sizer"></div>
		<div class="grid-item" :class="{ 'grid-item--height2': item % 2 == 0 }" v-for="item in 100" :key="item">
			{{ item }}
		</div>
	</div>
</template>

<script>
import Masonry from 'masonry-layout'
export default {
	data() {
		return {}
	},
	mounted() {
		const grid = document.querySelector('.grid')
		const msnry = new Masonry(grid, {
			// options...
			itemSelector: '.grid-item',
			columnWidth: '.grid-sizer',
			gutter: 10,
			percentPosition: true
		})
		// msnry.layout()
	},
	methods: {}
}
</script>

<style lang="scss" scoped>
@for $i from 0 through 100 {
	.height-#{$i} {
		height: random(30) + 30 + px;
	}
}
.grid {
	width: 50%;
	margin: 25px auto;

	.grid-sizer,
	.grid-item {
		width: 30%;
		height: 60px;
		background-color: #fff;
		margin-bottom: 10px;
		border-radius: 10px;
	}

	.grid-item--height2 {
		height: 140px;
	}
}
</style>
