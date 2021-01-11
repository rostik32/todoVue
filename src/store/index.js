import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		notes: [],
		filter: 'all',
	},
	mutations: {
		addNote(state, note) {
			state.notes.push(note);
		},

		initNotes(state, notesStorage) {
			state.notes = notesStorage;
		},

		taskCompleted(state, notes) {
			state.notes = notes;
		},

		deleteNote(state, notes) {
			state.notes = notes;
		},

		filterNotes(state, filterName) {
			state.filter = filterName;
		},
	},
	actions: {
		createNote({ commit, state }, note) {
			const notes = [...state.notes, note];
			storage(notes);
			commit('addNote', note);
		},

		retriveNotes({ commit }) {
			const notes = storage();
			commit('initNotes', notes);
		},

		taskCompleted({ commit, state }, id) {
			const notes = state.notes.map((note) =>
				note.id === id ? { ...note, completed: !note.completed } : note
			);
			storage(notes);
			commit('taskCompleted', notes);
		},

		noteDeleted({ commit, state }, id) {
			const notes = state.notes.filter((note) => note.id !== id);
			storage(notes);
			commit('deleteNote', notes);
		},
	},

	getters: {
		notes(state) {
			if (state.filter === 'completed') {
				return state.notes.filter((note) => note.completed);
			} else if (state.filter === 'current') {
				return state.notes.filter((note) => !note.completed);
			} else {
				return state.notes;
			}
		},
	},

	modules: {},
});

function storage(data) {
	if (data) {
		localStorage.setItem('notes', JSON.stringify(data));
	} else {
		return JSON.parse(localStorage.getItem('notes')) || [];
	}
}
