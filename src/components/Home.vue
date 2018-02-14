<template lang="pug">
  .row
    .col-md-10.offset-md-1.col-sm-12
      h1
        span Hello World!
      h1
        span I am a web designer and developer
      h1
        span currently based in Taiwan. I like to...
</template>

<script>
  import * as types from '../store/types'

  export default {
    name: "Home",
    created() {
      this.$store.dispatch(types.SET_BG_IMAGE, {main: 'src/assets/images/home.jpg', alt: 'src/assets/images/transparent.png'})
    }
  }
</script>

<style lang="sass" scoped>
  .row
    position: absolute
    bottom: 40px
    left: 0
    height: 50vh
    width: 100%

    @media only screen and (max-width: 768px)
      position: initial

  .container-fluid
    position: relative

  h1
    margin-left: 20px
</style>
