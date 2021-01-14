<template>
  <form class="todo__row todo__row-input" @submit.prevent="onCreate()">
    <input
      ref="checkboxComplete"
      class="todo__checkbox"
      type="checkbox"
      id="allCompleted"
      :checked="isAllNotesCompleted"
      @click="completeAll()"
    />

    <label
      class="todo__label"
      for="allCompleted"
      tabindex="0"
      @mouseup="removeFocusOnClick($event)"
    ></label>

    <input
      type="text"
      class="todo__input"
      placeholder="Создайте новую задачу..."
      v-model="note"
    />

    <button
      type="submit"
      class="todo__create todo__button"
      @mouseup="removeFocusOnClick($event)"
    >
      <span class="material-icons icon-create"> done </span>
    </button>
  </form>
</template>

<script>
export default {
  name: "TodoInput",
  data: () => ({
    note: null
  }),
  computed: {
    isAllNotesCompleted() {
      return this.$store.getters.isAllNotesCompleted;
    }
  },
  methods: {
    onCreate() {
      if (this.note && this.note.trim()) {
        const note = {
          text: this.note,
          completed: false,
          id: Date.now()
        };

        this.$store.dispatch("createNote", note);
      }

      this.note = "";
    },

    completeAll() {
      const allCompleted = this.$store.getters.isAllNotesCompleted;

      if (allCompleted) {
        this.$store.dispatch("incompleteAll");
        return;
      }

      this.$store.dispatch("completeAll");
    }
  }
};
</script>

<style lang="scss" scoped>
.todo__row-input {
  margin-bottom: 15px;
  border-radius: 5px;
}

.todo__input {
  flex-grow: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: none;
  letter-spacing: 0.05rem;

  &::placeholder {
    color: hsl(236, 9%, 61%);
  }
}

.dark .todo__input {
  color: hsl(234, 39%, 85%);
}
</style>
