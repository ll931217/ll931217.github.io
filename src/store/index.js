import Vue from 'vue'
import Vuex from 'vuex'

import * as types from './types'

Vue.use(Vuex)

const TODO_STORAGE_KEY = 'liang-todo-startup'
const BOOKMARK_STORAGE_KEY = 'liang-bookmark-startup'
const storage = {
  todo: {
    fetch: () => JSON.parse(localStorage.getItem(TODO_STORAGE_KEY) || '[]'),
    save: data => localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(data))
  },
  bookmark: {
    fetch: () => JSON.parse(localStorage.getItem(BOOKMARK_STORAGE_KEY) || '[]'),
    save: data => localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(data))
  }
}

export default new Vuex.Store({
  state: {
    todos: storage.todo.fetch(),
    bookmarks: storage.bookmark.fetch()
  },
  getters: {
    [types.GET_TODOS]: state => state.todos,
    [types.GET_BOOKMARKS]: state => state.bookmarks
  },
  mutations: {
    [types.MUTATE_ADD_TODOS]: (state, todo) => {
      state.todos.push(todo)
      storage.todo.save(state.todos)
    },
    [types.MUTATE_DEL_TODOS]: (state, todo) => {
      state.todos = state.todos.filter(e => e !== todo)
      storage.todo.save(state.todos)
    },
    [types.MUTATE_ADD_BOOKMARKS]: (state, bookmark) => {
      state.bookmarks.push(bookmark)
      storage.bookmark.save(state.bookmarks)
    },
    [types.MUTATE_DEL_BOOKMARKS]: (state, name) => {
      state.bookmarks = state.bookmarks.filter(e => e.name !== name)
      storage.bookmark.save(state.bookmarks)
    }
  },
  actions: {
    [types.ADD_TODOS]: ({commit}, todo) => commit(types.MUTATE_ADD_TODOS, todo),
    [types.DEL_TODOS]: ({commit}, todo) => commit(types.MUTATE_DEL_TODOS, todo),
    [types.ADD_BOOKMARKS]: ({commit}, bookmark) => commit(types.MUTATE_ADD_BOOKMARKS, bookmark),
    [types.DEL_BOOKMARKS]: ({commit}, name) => commit(types.MUTATE_DEL_BOOKMARKS, name)
  }
})
