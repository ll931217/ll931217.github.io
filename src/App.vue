<template lang="pug">
  .container
    .content
      p Hello! I'm Liang-Shih Lin (林良士)
      p I am a Full Stack Web Developer/Designer
      p currently based in Taipei, Taiwan
      link-boxes
      .footer
        a(href="https://github.com/ll931217/ll931217.github.io", target="_blank", rel="noopener") Source Code
</template>

<script>
  import LinkBoxes from './components/LinkBoxes.vue'

  export default {
    name: 'app',
    components: {
      LinkBoxes
    }
  }
</script>

<style lang="sass">
  *
    margin: 0
    padding: 0

  body
    background-image: url('./assets/images/background.jpg')
    background-size: cover
    background-repeat: no-repeat
    background-position: bottom right
    font-family: 'Play', sans-serif

  .container
    display: flex
    align-items: center
    width: 100%
    min-height: 100vh

  .content
    color: rgb(221, 221, 221)
    margin: 10vw
    font-size: 2em
    font-weight: bold

    p
      margin: .7rem 0

    @media (max-width: 500px)
      font-size: 1.3em

    @media (max-width: 1024px)
      width: 100%

  .footer
    font-size: 16px
    margin-top: 1rem

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
