<template>
	<header class="todo__header">
		<h1 class="todo__title">TODO VUE</h1>
		<button
			class="todo__choose-theme"
			@mouseup="removeFocusOnClick($event)"
			@click="changeTheme()"
		>
			<span class="material-icons">
				{{ mode === 'light' ? 'dark_mode' : 'light_mode' }}
			</span>
		</button>
	</header>
</template>

<script>
export default {
	name: 'TodoHeader',
	computed: {
		mode() {
			return this.$store.state.mode;
		},
	},

	methods: {
		changeTheme() {
			this.$store.dispatch('changeTheme');
		},
	},
};
</script>

<style lang="scss" scoped>
.todo {
	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 40px;
	}

	&__title {
		margin: 0;
		font-size: 1.7rem;
		font-family: 'Montserrat', sans-serif;
		letter-spacing: 0.6rem;
		font-weight: 700;
		color: #fff;
	}

	&__choose-theme {
		background: none;
		border: none;
		color: #fff;
		cursor: pointer;

		& > span {
			font-size: 1.7rem;
			vertical-align: middle;
			pointer-events: none;
		}
	}
}
</style>