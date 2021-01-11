<template>
	<li class="todo__note">
		<div class="todo__note-info">
			<input
				ref="checkboxComplete"
				class="todo__checkbox"
				type="checkbox"
				:id="note.id"
				:checked="note.completed"
				@change="isCompleted()"
			/>

			<label
				class="todo__label"
				:for="note.id"
				tabindex="0"
				@keydown.enter="labelEnter()"
			></label>
			<span class="todo__text">{{ note.text }}</span>
		</div>

		<button type="button" class="todo__delete" @click="onDelete()">
			<span class="material-icons"> delete_outline </span>
		</button>
	</li>
</template>

<script>
export default {
	name: 'TodoNote',
	props: ['note', 'id'],
	methods: {
		isCompleted() {
			this.$store.dispatch('taskCompleted', this.$props.note.id);
		},

		onDelete() {
			this.$store.dispatch('noteDeleted', this.$props.note.id);
		},

		labelEnter() {
			this.$refs.checkboxComplete.checked = !this.$refs.checkboxComplete
				.checked;
			this.isCompleted();
		},
	},
};
</script>

<style lang="scss" scoped>
.todo__note {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 0 0 20px;
	border-bottom: 1px solid #000;

	&:hover {
		background-color: rgb(245, 245, 245);
	}

	&-info {
		display: flex;
		align-items: center;
	}
}

.todo__label {
	position: relative;
	display: inline-block;
	margin-right: 10px;
	flex: 1 0 15px;
	height: 15px;
	border: 2px solid rgb(110, 110, 110);
	background-color: #fff;
	border-radius: 50%;
	cursor: pointer;

	&:hover,
	&:focus {
		outline: none;
		border-color: rgb(36, 186, 255);
	}
}

.todo__checkbox {
	display: none;

	&:checked + .todo__label::after {
		content: '';
		position: absolute;
		top: -5px;
		left: -1px;
		display: inline-block;
		transform: rotate(-45deg);
		width: 18px;
		height: 10px;
		border-bottom: 4px solid rgb(160, 229, 140);
		border-left: 4px solid rgb(160, 229, 140);
	}

	&:checked ~ .todo__text {
		text-decoration: line-through;
		color: #acacac;
	}
}

.todo__delete {
	background: none;
	border: none;
	flex: 0 0 50px;
	height: 50px;
	color: rgb(226, 226, 226);
	cursor: pointer;

	&:hover,
	&:focus {
		background-color: #f34f4f;
		color: #202020;
	}
}
</style>