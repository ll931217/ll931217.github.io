<template lang="pug">
  #bookmark
    a(:href="bookmark.url", target="_blank").link-center {{ bookmark.name }}
</template>

<script>
export default {
  name: 'Bookmark',
  props: {
    bookmark: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="sass" scoped>
#bookmark
  border-left: 3px solid white
  color: white
  position: relative
  padding: 5px 10px

a:link, a:visited
  color: white
  margin-right: 5px
  position: relative
  text-decoration: none
  &:after, &:before
    content: ""
    position: absolute
    border-bottom: 3px solid white
    width: 0
    bottom: -5px
    transition: all .5s ease-in-out
  &:after
    left: calc(50%)
  &:before
    right: calc(50%)
  &:hover
    &:after, &:before
      width: 50%
</style>
