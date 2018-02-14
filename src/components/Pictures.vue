<template lang="pug">
  .row.content
    .col-md-10.offset-md-1
      h1 ... and take pictures.
      .row
        .col-md-10.offset-md-1.theStuff
          .pictures
            div(v-for="(image, index) in images", :key="index").tile.scale-anm
              a(:href="image.link", target="_blank")
                img(:src="image.thumbnail", :alt="image.description").img-fluid
</template>

<script>
  import Vue from 'vue'

  import * as types from '../store/types'

  export default {
    name: "Pictures",
    data () {
      return {
        images: []
      }
    },
    created() {
      this.$store.dispatch(types.SET_BG_IMAGE, {main: 'src/assets/images/pictures.jpg', alt: 'src/assets/images/blackBG2.png'})
      Vue.http.get('https://api.imgur.com/3/album/Az20Z/images').then(response => response.json()).then(data => {
        if (data) {
          data = data.data
          data.forEach(image => {
            let s = image.link
            let link = s.substring(0, s.lastIndexOf(".")) + "l" + s.substring(s.lastIndexOf("."))
            this.images.push({thumbnail: link, link: image.link, description: image.description})
          })
        }
      })
    }
  }
</script>

<style lang="sass" scoped>
  .theStuff
    float: none
    margin: auto
    transition: all .5s ease-in-out

  .pictures
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

  .scale-anm
    transform: scale(1)
</style>
