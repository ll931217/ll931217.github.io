import * as types from './types'
import storage from './storage'

export const state = {
  todos: storage.todo.fetch(),
  bookmarks: storage.bookmark.fetch()
}

export const getters = {
  [types.GET_TODOS]: state => state.todos,
  [types.GET_BOOKMARKS]: state => state.bookmarks
}

export const mutations = {
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
}

export const actions = {
  [types.ADD_TODOS]: ({ commit }, todo) => commit(types.MUTATE_ADD_TODOS, todo),
  [types.DEL_TODOS]: ({ commit }, todo) => commit(types.MUTATE_DEL_TODOS, todo),
  [types.ADD_BOOKMARKS]: ({ commit }, bookmark) => commit(types.MUTATE_ADD_BOOKMARKS, bookmark),
  [types.DEL_BOOKMARKS]: ({ commit }, name) => commit(types.MUTATE_DEL_BOOKMARKS, name)
}
