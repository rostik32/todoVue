<template>
  <footer class="todo__footer">
    <span class="todo__info"> {{ remainingNotes }} осталось </span>

    <TodoTabs />

    <button
      class="todo__clear-completed"
      @mouseup="removeFocusOnClick($event)"
      @click="deleteCompletedNotes()"
    >
      Удалить выполненные
    </button>
  </footer>
</template>

<script>
import TodoTabs from "./TodoTabs";

export default {
  name: "TodoFooter",
  components: { TodoTabs },
  computed: {
    remainingNotes() {
      return this.$store.getters.remainingNotes.length;
    }
  },
  methods: {
    deleteCompletedNotes() {
      this.$store.dispatch("removeCompletedNotes");
    }
  }
};
</script>

<style lang="scss" scoped>
.todo__footer {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 20px 25px;
  border-top: 1px solid hsl(236, 33%, 92%);
  background-color: #fff;

  @media (max-width: 576px) {
    padding: 20px 25px;
    margin-top: auto;
  }
}

.todo__info,
.todo__clear-completed {
  font-size: 0.9rem;
  color: hsl(236, 9%, 61%);

  @media (max-width: 576px) {
    margin-bottom: 10px;
  }
}

.todo__clear-completed {
  background: none;
  border: none;
  cursor: pointer;

  &:hover,
  &:focus {
    color: hsl(235, 19%, 35%);
  }
}

@media (max-width: 576px) {
  .todo__footer {
    flex-wrap: wrap;
    position: relative;
  }

  .todo__tabs {
    order: 1;
  }

  .todo__clear-completed,
  .todo__info {
    font-size: 0.8rem;
    flex-basis: 50%;
  }

  .todo__clear-completed {
    text-align: right;
  }
}

.dark {
  & .todo__footer {
    background-color: hsl(235, 24%, 19%);
    border-color: hsl(233, 14%, 35%);
  }

  & .todo__info {
    color: hsl(233, 14%, 35%);
  }

  & .todo__clear-completed {
    color: hsl(233, 14%, 35%);

    &:hover {
      color: hsl(236, 33%, 92%);
    }
  }
}
</style>
