<template>
	<div id="app">
		<div class="todo">
			<h1 class="todo__title">Todo Vue</h1>

			<TodoInput />

			<TodoTabs />

			<span class="none" v-if="!notes.length">У вас еще нет заметок.</span>

			<ul class="todo__list">
				<TodoNote v-for="note in notes" :key="note.id" :note="note" />
			</ul>
		</div>
	</div>
</template>

<script>
import TodoInput from './components/TodoInput';
import TodoNote from './components/TodoNote';
import TodoTabs from './components/TodoTabs';

export default {
	name: 'App',
	components: { TodoInput, TodoNote, TodoTabs },
	computed: {
		notes() {
			return this.$store.getters.notes;
		},
	},
	created() {
		this.$store.dispatch('retriveNotes');
	},
};
</script>

<style lang="scss">
@import './styles/normalize.scss';
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

html {
	font-family: Roboto;
	font-size: 16px;
	line-height: 1;
}

.todo {
	max-width: 800px;
	margin: 0 auto;

	&__title {
		margin: 0;
		font-size: 2rem;
		padding: 5px 10px;
		background-color: rgb(30, 138, 211);
		color: #fff;
	}

	&__list {
		margin: 0;
		padding: 0;
		list-style: none;
	}
}

.none {
	display: inline-block;
	padding: 10px;
}
</style>
