<template>
	<div class="todo__tabs">
		<button
			class="todo__tab todo__tab--all"
			:class="{ active: filter === 'all' }"
			:disabled="!notesLength"
			@click="filterNotes('all')"
			@keydown.enter="filterNotes('all')"
		>
			Все
		</button>
		<button
			class="todo__tab todo__tab--completed"
			:class="{ active: filter === 'completed' }"
			:disabled="!notesLength"
			@click="filterNotes('completed')"
			@keydown.enter="filterNotes('completed')"
		>
			Выполненные
		</button>
		<button
			class="todo__tab todo__tab--current"
			:class="{ active: filter === 'current' }"
			:disabled="!notesLength"
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

		notesLength() {
			return this.$store.state.notes.length;
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
.todo__tabs {
	@media (max-width: 576px) {
		flex-shrink: 0;
		margin: 0 auto;
	}
}

.todo__tab {
	border: none;
	background: none;
	color: hsl(236, 9%, 61%);
	font-weight: 700;
	cursor: pointer;

	&.active {
		color: hsl(220, 98%, 61%);
	}

	&:disabled {
		opacity: 0.5;
	}

	&:focus,
	&:hover {
		outline: none;
		color: hsl(235, 19%, 35%);
	}
}

.dark .todo__tab {
	color: hsl(233, 14%, 35%);

	&:hover {
		color: hsl(236, 33%, 92%);
	}

	&.active {
		color: hsl(220, 98%, 61%);
	}

	&:disabled {
		color: hsl(233, 14%, 35%);
	}
}
</style>