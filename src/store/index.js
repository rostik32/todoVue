import Vue from "vue";
import Vuex from "vuex";
import removeFocusOnClick from "@/mixins/removeFocus";

Vue.mixin(removeFocusOnClick);
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: [],
    filter: "all",
    mode: ""
  },
  mutations: {
    addNote(state, note) {
      state.notes.push(note);
    },

    initState(state, data) {
      state.notes = data.notes;
      state.mode = data.mode;
    },

    filterNotes(state, filterName) {
      state.filter = filterName;
    },

    changeNotes(state, notes) {
      state.notes = notes;
    },

    changeTheme(state, mode) {
      state.mode = mode;
    }
  },
  actions: {
    createNote({ commit, state }, note) {
      const notes = [...state.notes, note];
      storage(notes);
      commit("addNote", note);
    },

    initState({ commit }) {
      const notes = storage(0);
      const mode = JSON.parse(localStorage.getItem("mode")) || "light";

      const data = { notes: notes, mode: mode };
      commit("initState", data);
    },

    taskCompleted({ commit, state }, id) {
      const notes = state.notes.map(note =>
        note.id === id ? { ...note, completed: !note.completed } : note
      );
      storage(notes);
      commit("changeNotes", notes);
    },

    noteDeleted({ commit, state }, id) {
      const notes = state.notes.filter(note => note.id !== id);
      storage(notes);
      commit("changeNotes", notes);
    },

    removeCompletedNotes({ commit, state }) {
      const removedCompletedNotes = state.notes.filter(note => !note.completed);

      storage(removedCompletedNotes);
      commit("changeNotes", removedCompletedNotes);
    },

    completeAll({ commit, state }) {
      const completedAllNotes = state.notes.map(note => ({
        ...note,
        completed: true
      }));

      storage(completedAllNotes);
      commit("changeNotes", completedAllNotes);
    },

    incompleteAll({ commit, state }) {
      const incompletedAllNotes = state.notes.map(note => ({
        ...note,
        completed: false
      }));

      storage(incompletedAllNotes);
      commit("changeNotes", incompletedAllNotes);
    },

    changeTheme({ commit, state }) {
      const mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("mode", JSON.stringify(mode));

      commit("changeTheme", mode);
    }
  },

  getters: {
    notes(state) {
      if (state.filter === "completed") {
        return state.notes.filter(note => note.completed);
      } else if (state.filter === "current") {
        return state.notes.filter(note => !note.completed);
      } else {
        return state.notes;
      }
    },

    remainingNotes(state) {
      return state.notes.filter(note => !note.completed);
    },

    isAllNotesCompleted(state) {
      const completedNotes = state.notes.filter(note => note.completed);
      return (
        completedNotes.length === state.notes.length && state.notes.length !== 0
      );
    }
  },

  modules: {}
});

function storage(data) {
  if (data) {
    localStorage.setItem("notes", JSON.stringify(data));
  } else {
    return JSON.parse(localStorage.getItem("notes")) || [];
  }
}
