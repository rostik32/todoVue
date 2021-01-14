<template>
	<div id="app" :class="{ dark: mode === 'dark' }">
		<div class="todo">
			<TodoHeader />

			<TodoInput />

			<div class="todo__content">
				<transition-group
					mode="out-in"
					name="todoList"
					tag="ul"
					class="todo__list"
				>
					<TodoNote v-for="note in notes" :key="note.id" :note="note" />
					<li class="none" v-if="!notes.length" :key="text">{{ text }}</li>
				</transition-group>

				<TodoFooter />
			</div>
		</div>
	</div>
</template>

<script>
import TodoInput from './components/TodoInput';
import TodoNote from './components/TodoNote';
import TodoHeader from './components/TodoHeader';
import TodoFooter from './components/TodoFooter';

export default {
	name: 'App',
	components: { TodoInput, TodoNote, TodoFooter, TodoHeader },
	computed: {
		notes() {
			return this.$store.getters.notes;
		},

		text() {
			const filter = this.$store.state.filter;
			let message = 'У вас еще нет заметок';
			if (filter === 'completed') {
				message = 'Ничего еще не выполнено, пора бы начать';
			} else if (filter === 'current') {
				return 'Отлично! Все выполнено';
			}

			return message;
		},

		mode() {
			return this.$store.state.mode;
		},
	},
	created() {
		this.$store.dispatch('initState');
	},
};
</script>

<style lang="scss">
@import './styles/normalize.scss';
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Yanone+Kaffeesatz&display=swap');

#app {
	height: 100%;
}

html {
	font-family: 'Yanone Kaffeesatz';
	font-size: 18px;
	line-height: 1;
}

body,
html {
	height: 100%;
}

body {
	display: flex;
	flex-direction: column;
}

#app {
	background: #fff url('assets/bg-desktop-light.jpg') no-repeat top center;

	&.dark {
		background-color: hsl(235, 21%, 11%);
		background-image: url('assets/bg-desktop-dark.jpg');
	}
}

.todo {
	max-width: 600px;
	margin: 60px auto 0 auto;

	@media (max-width: 768px) {
		max-width: 95%;
	}

	@media (max-width: 576px) {
		margin-top: 0;
		padding-top: 20px;
		height: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	&__button {
		padding: 0;
		opacity: 0;
		flex-shrink: 1;
		align-self: flex-start;
		border: none;
		background: none;
		transition: opacity 0.3s;
		cursor: pointer;

		& > span {
			vertical-align: middle;
			pointer-events: none;
			color: hsl(235, 19%, 35%);
		}

		&:focus {
			opacity: 1;
		}
	}

	&__content {
		box-shadow: 2px 15px 30px hsl(233, 11%, 84%);
		border-radius: 5px;
		overflow: hidden;
		display: flex;
		flex-direction: column;

		@media (max-width: 576px) {
			flex-grow: 1;
			position: relative;
		}
	}

	&__list {
		margin: 0;
		padding: 0;
		list-style: none;
		overflow: auto;
		background-color: #fff;
		min-height: 396px;
		max-height: 396px;

		@media (max-width: 576px) {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 90px;
			top: 0;
			min-height: 0;
			max-height: none;
		}
	}

	&__row {
		position: relative;
		display: flex;
		align-items: center;
		padding: 20px 25px;
		background-color: #fff;
		letter-spacing: 0.05rem;
		z-index: 0;

		@media(max-width: 375px) {
			padding: 20px 15px;
		} 

		&:hover .todo__button {
			opacity: 1;
		}
	}

	&__label {
		position: relative;
		align-self: flex-start;
		margin-right: 20px;
		min-width: 25px;
		height: 25px;
		background-color: #fff;
		border-radius: 50%;
		cursor: pointer;

		&:active:focus {
			outline: none;
		}

		&::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			display: block;
			width: 28px;
			height: 28px;
			border-radius: 50%;
			background-color: hsl(236, 33%, 92%);
			opacity: 1;
			z-index: -1;
		}

		&:hover::before,
		&:focus::before {
			background-image: linear-gradient(
				135deg,
				hsl(192, 100%, 67%),
				hsl(280, 87%, 65%)
			);
		}
	}

	&__checkbox {
		display: none;

		&:checked + .todo__label::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: url('assets/icon-check.svg') no-repeat center,
				linear-gradient(135deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%));
			border-radius: 50%;
		}

		&:checked + .todo__label::before {
			opacity: 0;
		}

		&:checked ~ .todo__text {
			text-decoration: line-through;
			color: hsl(233, 11%, 84%);
		}
	}
}

.none {
	display: inline-block;
	padding: 10px;
}

.todoList-enter,
.todoList-leave-to {
	transform: translateX(-100%);
	opacity: 0;
}

.todoList-enter-active,
.todoList-leave-active {
	opacity: 1;
	transition: all 0.2s linear;
}

.dark {
	& .todo__row {
		background-color: hsl(235, 24%, 19%);
	}

	& .todo__label {
		background-color: hsl(235, 24%, 19%);

		&:before {
			background-color: hsl(233, 14%, 35%);
		}
	}

	& .todo__list {
		background-color: hsl(235, 24%, 19%);
	}

	& .todo__button > span {
		color: hsl(234, 11%, 52%);
	}

	& .todo__checkbox:checked ~ .todo__text {
		color: hsl(233, 14%, 35%);
	}

	& .todo__content {
		box-shadow: 2px 15px 30px hsl(240, 2%, 8%);
	}

	& .none {
		color: hsl(234, 39%, 85%);
	}
}
</style>
