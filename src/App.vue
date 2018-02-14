<template lang="pug">
  .container-fluid.main
    .row
      .col-md-12
        app-header
    transition(name="fade", mode="out-in").content
      router-view
</template>

<script>
  import { mapGetters } from 'vuex'

  import Header from './components/Header.vue'

  import * as types from './store/types'

  export default {
    name: 'app',
    computed: {
      ...mapGetters({
        bgImg: types.BG_IMAGE
      })
    },
    components: {
      'app-header': Header
    },
    created() {
      this.$store.watch(
        () => this.$store.getters[types.BG_IMAGE],
        bgValues => {
          document.body.style.backgroundImage = 'url(' + bgValues.alt + '), url(' + bgValues.main + ')'
          document.body.style.backgroundSize = '90% 100%, cover'
        }
      )
    }
  }
</script>

<style lang="sass">
  @import url('https://fonts.googleapis.com/css?family=Montserrat')

  body
    background-color: black
    background-repeat: no-repeat, no-repeat
    background-position: left center, bottom center
    background-attachment: fixed, fixed
    font-family: 'Montserrat', sans-serif
    color: white
    max-width: 100vw
    transition: all 1s ease-in-out

  h1
    font-size: 80px
    line-height: 130px
    margin-bottom: 30px

    @media only screen and (max-width: 1766px)
      font-size: 60px
      line-height: 100px
      margin-bottom: 15px

    @media only screen and (max-width: 1366px)
      font-size: 40px
      line-height: 90px
      margin-bottom: 15px

    @media only screen and (max-width: 768px)
      font-size: 20px
      line-height: 60px
      margin-bottom: 10px

    span
      background-color: rgba(0, 0, 0, 0.4)
      padding: 10px 20px

  .main
    height: 100vh

  .container-fluid
    color: white

  .col-md-12
    padding-right: 0
    padding-left: 0

  .fade-enter-active, .fade-leave-active
    transition: all 1s ease-in-out

  .fade-enter, .fade-leave-to
    opacity: 0
</style>
