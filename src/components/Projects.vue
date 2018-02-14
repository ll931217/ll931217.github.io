<template lang="pug">
  .row.content
    .col-md-10.offset-md-1
      h1 ... design, code, problem solve, ...
      .row
        .col-md-10.offset-md-1.theStuff
          .projects
            .tile.scale-anm
              a(href="https://github.com/Jewel-Systems/front", target="_blank")
                img(src="http://i.imgur.com/flbLz0ll.png", alt="Cedar House").img-fluid
                p
                  span Cedar House
            .tile.scale-anm
              a(href="https://github.com/ll931217/china_restaurant", target="_blank")
                img(src="http://i.imgur.com/JvK3tIel.png", alt="China Restaurant")
                p
                  span China Restaurant
            .tile.scale-anm
              a(href="#", target="_blank")
                img(src="https://i.imgur.com/qLjA5Ah.png", alt="Startpages")
                p
                  span Startpages
      .row
        .col-md-10.offset-md-1
          .theStuff
            h3 and many more on my&nbsp;
              a(href="https://github.com/ll931217", target="_blank") GitHub
              |  page
</template>

<script>
  import * as types from '../store/types'

  export default {
    name: "Projects",
    created() {
      this.$store.dispatch(types.SET_BG_IMAGE, {main: 'src/assets/images/projects.jpg', alt: 'src/assets/images/blackBG1.png'})
    }
  }
</script>

<style lang="sass" scoped>
  .projects
    margin-bottom: 2rem

  h3
    margin: 1rem

    @media only screen and (max-width: 768px)
      font-size: 20px

  .theStuff
    float: none
    margin: auto

  .projects
    margin: 1rem 0
    -webkit-column-count: 3
    -moz-column-count: 3
    column-count: 3
    -webkit-column-gap: 1rem
    -moz-column-gap: 1rem
    column-gap: 1rem
    -webkit-column-width: 33.33333333333333%
    -moz-column-width: 33.33333333333333%
    column-width: 33.33333333333333%
    -webkit-column-column-span: 1
    -moz-column-column-span: 1
    column-span: 1

  .tile
    -webkit-transform: scale(0)
    transform: scale(0)
    -webkit-transition: all 350ms ease
    transition: all 350ms ease
    margin-bottom: 1rem
    overflow: hidden

  .tile img
    max-width: 100%
    width: 100%
    height: auto
    transition: transform .5s ease-in-out

    &:hover
      transform: scale(1.08)

  .tile p
    position: absolute
    top: 10px
    left: 10px
    color: white
    font-size: 20px
    font-weight: bold

    span
      background-color: rgba(0, 0, 0, 0.5)

    @media only screen and (max-width: 500px)
      font-size: 10px

  .scale-anm
    transform: scale(1)
</style>
