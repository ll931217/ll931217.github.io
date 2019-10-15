<template lang="pug">
  #searchbar
    form(action="https://www.google.com/search", method="GET", @submit.prevent="submit")
      label(for="search")
        span.right >
      .input-command
        input(
          type="text",
          name="q",
          autocomplete="off",
          v-model="text",
          @keydown.tab.prevent="autocomplete",
          autofocus
        )#search
        p.suggestion {{ suggestion }}
      fa-icon(:icon="['fas', 'times']", @click="clear").clear
    template(v-if="errCode !== 0")
      div(v-if="errCode === 1")
        .error
          p
            span.err [Error]:
            | Input is incorrect, it should be either:
          p.code bookmark add -n "Google" -u "https://www.google.com/"
          p or
          p.code bookmark add --name="Google" --url="https://www.google.com/"
      div(v-else-if="errCode === 2")
        .error
          p
            span.err [Error]:
            | Input is incorrect, it should be either:
          p.code bookmark remove -n "Google"
          p or
          p.code bookmark remove --name="Google"
      div(v-else-if="errCode === 3")
        .error
          p
            span.err [Error]:
            | URL is incorrect
      div(v-else-if="errCode === 4")
        .error
          p
            span.err [Error]:
            | Input is incorrect, it should be:
          p.code todo add/remove "Buy milk"
      div(v-else-if="errCode === 5")
        .error
          p
            span.err [Error]:
            | Sorry that todo already exists
      div(v-else-if="errCode === 6")
        .error
          p
            span.err [Error]:
            | Sorry that todo does not exist
      div(v-else-if="errCode === 7")
        .error
          p
            span.err [Error]:
            | Sorry that is an invalid option, please use either "add" or "remove"
      div(v-else-if="errCode === 8")
        .error
          p
            span.err [Error]:
            | Sorry a bookmark with that name already exists
      div(v-else-if="errCode === 9")
        .error
          p
            span.err [Error]:
            | Sorry a bookmark with that name does not exist
      div(v-else-if="errCode === 10")
        .error
          p
            span.err [Error]:
            | Invalid command, please consult the help page
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import * as types from '~/store/types'

export default {
  name: 'SearchBar',
  data: () => ({
    text: '',
    suggestion: '',
    errCode: 0,
    errText: '',
    commands: ['bookmark', 'todo']
  }),
  computed: {
    ...mapGetters({
      todos: types.GET_TODOS,
      bookmarks: types.GET_BOOKMARKS
    })
  },
  watch: {
    text () {
      const clear = document.querySelector('.clear')
      if (this.text !== '') {
        clear.classList.add('show')
      } else {
        clear.classList.remove('show')
      }

      if (this.text !== '') {
        const regex = new RegExp(`^${this.text}*`)
        this.suggestion = this.commands.find(v => regex.test(v))
      }

      if (this.errCode !== 0) {
        this.errCode = 0
      }
    }
  },
  methods: {
    ...mapActions({
      addTodo: types.ADD_TODOS,
      removeTodo: types.DEL_TODOS,
      addBookmark: types.ADD_BOOKMARKS,
      removeBookmark: types.DEL_BOOKMARKS
    }),
    autocomplete () {
      if (this.suggestion !== undefined) {
        this.text = `${this.suggestion} `
      }
    },
    submit () {
      /** eslint-disable next-line */
      const checkCmd = new RegExp(/(bookmark|todo)\s(add|remove)(\s?--name=||\s?-n\s["']{1}[\w\s\d]+["']{1})?(\s?--url=|\s?-u\s["']{1}[a-z\d\.:\/?&-]+["']{1})?(\s?["']{1}[\w\s\\\|\(\)\{\}\[\]\.\$\^\+\d=*&#@!%?]+["']{1})?/)
      const arr = this.text.match(/("[^"]*")|[^\s]+/g)
      if (arr[0] === 'bookmark') {
        const checkUrl = new RegExp(/^(https?:\/\/)?(www\.|[a-z\d]+\.)?[a-z]+(\.[a-z]{2,3}|:\d{2,5})(\.[a-z]{2,3})?(\/([\w\d]+)?)*((\?|&)[\w\d]+=[\w\d]+)*/)
        if (checkCmd.test(this.text)) {
          if (arr[1] === 'add') {
            if (arr.length === 6) {
              const name = arr[3].replace(/['"]+/g, '')
              let url = arr[5].replace(/['"]+/g, '')

              if (checkUrl.test(url)) {
                if (!/^https?/.test(url.substring(0, 4))) {
                  url = `http://${url}`
                }

                if (this.bookmarks.find(v => v.name === name)) {
                  this.errCode = 8
                } else {
                  this.addBookmark({ name, url })
                }
              } else {
                this.errCode = 3
              }
            } else {
              if (arr[2] === undefined) {
                this.errCode = 10
              }

              const first = arr[2].split('=')
              const second = arr[3].split('=')
              let name = ''
              let url = ''

              if (first[0] === '--name') {
                name = first[1].replace(/['"]+/g, '')
              } else if (first[0] === '--url') {
                url = first[1].replace(/['"]+/g, '')
              }

              if (second[0] === '--name') {
                name = second[1].replace(/['"]+/g, '')
              } else if (second[0] === '--url') {
                url = second[1].replace(/['"]+/g, '')
              } else {
                this.errCode = 1
              }

              if (this.bookmarks.find(v => v.name === name)) {
                this.errCode = 8
              } else {
                this.addBookmark({ name, url })
              }
            }
          } else if (arr[1] === 'remove') {
            if (arr.length === 3) {
              const name = arr[2].split('=')
              const n = name[1].replace(/['"]+/g, '')
              if (name[0] === '--name') {
                if (this.bookmarks.find(v => v.name === n)) {
                  this.removeBookmark(n)
                } else {
                  this.errCode = 9
                }
              } else {
                this.errCode = 2
              }
            } else if (arr.length === 4) {
              const n = arr[3].replace(/['"]+/g, '')
              if (arr[2] === '-n') {
                if (this.bookmarks.find(v => v.name === n)) {
                  this.removeBookmark(n)
                } else {
                  this.errCode = 9
                }
              } else {
                this.errCode = 2
              }
            } else {
              this.errCode = 2
            }
          } else {
            this.errCode = 7
          }
        } else if (arr[0] === 'add') {
          this.errCode = 1
        } else if (arr[0] === 'remove') {
          this.errCode = 2
        } else {
          this.errCode = 10
        }
      } else if (arr[0] === 'todo') {
        const todo = arr[2].replace(/['"]+/g, '')
        if (checkCmd.test(this.text)) {
          if (arr[1] === 'add') {
            if (this.todos.find(v => v === todo)) {
              this.errCode = 5
            } else {
              this.addTodo(todo)
              this.clear()
            }
          } else if (arr[1] === 'remove') {
            if (this.todos.find(v => v === todo)) {
              this.removeTodo(todo)
              this.clear()
            } else {
              this.errCode = 6
            }
          } else {
            this.errCode = 7
          }
        } else if (arr[0] === 'add' || arr[0] === 'remove') {
          this.errCode = 4
        } else {
          this.errCode = 10
        }
      } else {
        document.querySelector('form').submit()
      }
    },
    clear () {
      this.text = ''
    }
  }
}
</script>

<style lang="sass" scoped>
form
  display: inline-flex
  position: relative
  width: 100%

  label
    display: flex
    align-items: center

  input[type="text"]
    // background-color: #001626
    background: none
    border: none
    color: white
    font-size: 16px
    font-weight: bold
    position: absolute
    top: 3
    left: 0
    transition: all .5s ease-in-out
    width: 100%
    z-index: 2

    &:not([type="button"]):not([type="submit"]):not([type="reset"])
      &:hover, &:focus
        border-color: #001626
        outline: none

.right
  color: #BF55EC

.input-command
  position: relative
  flex: 1
  margin-left: 10px
  padding: 0.25rem 0

.suggestion
  color: rgba(255, 255, 255, 0.4)
  font-size: 16px
  font-weight: bold
  position: absolute
  top: 3
  left: 0
  z-index: 1

.clear
  color: rgba(255, 255, 255, 0.5)
  cursor: pointer
  font-size: 24px
  margin-right: 5px
  opacity: 0
  transition: all .5s ease-in-out
  visibility: hidden

  &:hover
    color: white

.show
  opacity: 1
  visibility: visible

.command
  color: #00ff9d

.error
  padding: 1em 1em .5em

.err
  color: rgb(249, 49, 49)

.code
  background-color: rgba(0, 0, 0, .5)
  padding: 1em 2em
</style>
