<template>
	<div class="todo__tabs">
		<button
			class="todo__tab todo__tab--all"
			:class="{ active: filter === 'all' }"
			@click="filterNotes('all')"
			@keydown.enter="filterNotes('all')"
		>
			Все
		</button>
		<button
			class="todo__tab todo__tab--completed"
			:class="{ active: filter === 'completed' }"
			@click="filterNotes('completed')"
			@keydown.enter="filterNotes('completed')"
		>
			Выполненные
		</button>
		<button
			class="todo__tab todo__tab--current"
			:class="{ active: filter === 'current' }"
			@click="filterNotes('current')"
			@keydown.enter="filterNotes('current')"
		>
			Текущие
		</button>
	</div>
</template>

<script>
export default {
	name: 'TodoTabs',
	computed: {
		filter() {
			return this.$store.state.filter;
		},
	},
	methods: {
		filterNotes(filter) {
			this.$store.commit('filterNotes', filter);
		},
	},
};
</script>

<style lang="scss" scoped>
.todo__tab {
	border: none;
	padding: 5px;
	margin: 5px 5px 5px;
	background-color: rgb(243, 243, 243);
	cursor: pointer;

	&:focus {
		outline: none;
	}

	&--all:hover,
	&--all:focus,
	&--all.active {
		background-color: rgb(203, 211, 255);
	}

	&--completed:hover,
	&--completed:focus,
	&--completed.active {
		background-color: rgb(203, 255, 207);
	}

	&--current:hover,
	&--current:focus,
	&--current.active {
		background-color: rgb(255, 240, 198);
	}
}
</style>