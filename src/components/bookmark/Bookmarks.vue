<template lang="pug">
  #bookmarks
    .list-comms
      span.caret >
      span.command ls bookmarks
    div(v-if="bookmarks.length > 0")
      .bookmarks
        bookmark(
          v-for="(bookmark, index) in bookmarks",
          :key="index",
          :bookmark="bookmark",
          :index="bookmark"
        )
</template>

<script>
import { mapGetters } from 'vuex';

import Bookmark from './Bookmark.vue';

import * as types from '../../store/types';

export default {
  name: 'Bookmarks',
  computed: {
    ...mapGetters({
      bookmarks: types.GET_BOOKMARKS,
    }),
  },
  components: {
    Bookmark,
  },
};
</script>

<style lang="sass" scoped>
.bookmarks
  display: grid
  grid-template-columns: 50% 50%
  grid-gap: 10px
  padding: 10px
  transition: all .5s ease-in-out

  @media screen and (max-width: 767px)
    grid-template-columns: 100%

.caret
  color: #BF55EC

.command
  margin: 0 10px
  color: #00ff9d
</style>
