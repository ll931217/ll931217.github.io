<template lang="pug">
  #todos
    .list-comms
      span.caret >
      span.command ls todos
    div(v-if="todos.length > 0").row
      .todo
        todo(v-for="(todo, index) in todos", :key="index", :todo="todo", :index="index")
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  import Todo from './Todo.vue'

  import * as types from '../../store/types'

  export default {
    name: 'todos',
    computed: {
      ...mapGetters({
        todos: types.GET_TODOS
      })
    },
    components: {
      'todo': Todo
    }
  }
</script>

<style lang="sass" scoped>
  .caret
    color: #BF55EC

  .command
    margin: 0 10px
    color: #00ff9d
</style>
