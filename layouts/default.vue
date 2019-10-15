<template lang="pug">
  .container
    nuxt
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="sass">
  *
    margin: 0
    padding: 0

  body
    background-image: url('../assets/images/background.jpg')
    background-size: cover
    background-repeat: no-repeat
    background-position: bottom right

  .container
    display: flex
    align-items: center
    width: 100%
    min-height: 100vh

  @font-face
    font-family: 'Fira Code'
    src: url('../assets/fonts/eot/FiraCode-Bold.eot')
    src: url('../assets/fonts/eot/FiraCode-Bold.eot') format('embedded-opentype'), url('../assets/fonts/woff2/FiraCode-Bold.woff2') format('woff2'), url('../assets/fonts/woff/FiraCode-Bold.woff') format('woff'), url('../assets/fonts/ttf/FiraCode-Bold.ttf') format('truetype')
    font-weight: 700
    font-style: normal
</style>
