const TODO_STORAGE_KEY = 'liang-todo-startup'
const BOOKMARK_STORAGE_KEY = 'liang-bookmark-startup'
export default {
  todo: {
    fetch: () => JSON.parse(localStorage.getItem(TODO_STORAGE_KEY) || '[]'),
    save: data => localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(data))
  },
  bookmark: {
    fetch: () => JSON.parse(localStorage.getItem(BOOKMARK_STORAGE_KEY) || '[]'),
    save: data => localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(data))
  }
}
