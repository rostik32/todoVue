<template>
	<li class="todo__row todo__note">
		<input
			ref="checkboxComplete"
			class="todo__checkbox"
			type="checkbox"
			:id="note.id"
			:checked="note.completed"
			@change="isCompleted($event)"
		/>

		<label
			class="todo__label"
			:for="note.id"
			tabindex="0"
			@keydown.enter="labelEnter()"
			@mouseup="removeFocusOnClick($event)"
		></label>
		<span class="todo__text">{{ note.text }}</span>

		<button type="button" class="todo__delete todo__button" @click="onDelete()">
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
	border-bottom: 1px solid hsl(236, 33%, 92%);
}

.todo__text {
	line-height: 1.3rem;
	word-break: break-all;
	margin-right: 15px;
	flex-grow: 1;
	color: hsl(235, 19%, 35%);
}

@media (max-width: 576px) {
	.todo__delete {
		opacity: 1;
	}
}

.dark {
	& .todo__note {
		border-color: hsl(233, 14%, 35%);
	}

	& .todo__text {
		color: hsl(234, 39%, 85%);
	}
}
</style>