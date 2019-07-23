<template lang="pug">
  .content
    .help
      .inner-container
        help
    .main
      clock.clock
      search-bar.search
      todo.todo
      bookmark.bookmark
</template>

<script>
import Clock from './Clock.vue';
import SearchBar from './SearchBar.vue';
import Todo from './todo/Todos.vue';
import Bookmark from './bookmark/Bookmarks.vue';
import Help from './Help.vue';

export default {
  name: 'StartPage',
  components: {
    Clock,
    SearchBar,
    Todo,
    Bookmark,
    Help,
  },
  methods: {
    showHelp() {
      document.querySelector('.help').classList.add('show');
    },
  },
  mounted() {
    const help = document.querySelector('.help');

    document.addEventListener('keydown', (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (e.which === 112) {
        help.classList.toggle('show');
      }

      if (e.which === 27) {
        help.classList.remove('show');
      }
    });

    help.addEventListener('click', () => {
      if (help.classList.contains('show')) help.classList.remove('show');
    });
  },
};
</script>

<style lang="sass" scoped>
.content
  font-family: "Fira Code", monospace
  font-weight: 700
  color: white
  margin: 2em 10vw
  max-width: 40em
  width: 100%

  @media (max-width: 500px)
    align-self: flex-start

.main
  display: grid
  grid-template-columns: 1fr 1fr
  grid-auto-rows: auto
  grid-gap: 1em
  grid-template-areas: "clock clock" "search search" "todo bookmark"

  @media (max-width: 500px)
    grid-template-areas: "clock clock" "search search" "todo todo" "bookmark bookmark"

.clock
  grid-area: clock

.search, .todo, .bookmark
  background-color: #001626
  border: 0
  box-shadow: 3px 3px 10px 2px black
  padding: 10px

.search
  grid-area: search

.todo
  grid-area: todo

.bookmark
  grid-area: bookmark

.help
  background-color: rgba(23, 23, 23, 0.7)
  cursor: pointer
  display: flex
  align-items: center
  justify-content: center
  position: absolute
  top: 0
  left: 0
  width: 100vw
  min-height: 100vh
  opacity: 0
  overflow-y: scroll
  transition: all .5s ease-in-out
  visibility: hidden
  z-index: 100

  .inner-container
    background-color: rgba(0, 13, 20, 0.8)
    border-radius: 5px
    cursor: inherit
    padding: 10px
    width: 60em
    overflow: hidden

  // @media (max-width: 500px)
  //   align-items: flex-start

.show
  opacity: 1
  visibility: visible
</style>
