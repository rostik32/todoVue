<template>
	<form class="todo__row-input" @submit.prevent="onCreate()">
		<input
			type="text"
			class="todo__input"
			placeholder="Введите текст заметки"
			v-model="note"
		/>
		<button type="submit" class="todo__create">
			<span class="material-icons"> add_task </span>
		</button>
	</form>
</template>

<script>
export default {
	name: 'TodoInput',
	data: () => ({
		note: null,
	}),
	methods: {
		onCreate() {
			if (this.note) {
				const note = {
					text: this.note,
					completed: false,
					id: Date.now(),
				};

				this.$store.dispatch('createNote', note);
				this.note = '';
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.todo__row-input {
	display: flex;
	border-bottom: 1px solid rgb(0, 0, 0);
}

.todo__input {
	flex-grow: 1;
	border: none;
	outline: none;
	font-size: 1.5rem;
	padding: 0 20px;
}

.todo__create {
	flex-basis: 50px;
	height: 50px;
	padding: 0;
	border: none;
	font-size: 2rem;
	cursor: pointer;

	&:hover {
		background-color: rgb(199, 255, 202);
	}
}
</style>