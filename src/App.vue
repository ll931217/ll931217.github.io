<template lang="pug">
  v-app
    v-app-bar(
      app,
      absolute,
      elevate-on-scroll,
      scroll-target="#scrolling-techniques"
    )
      v-spacer

      router-link(
        v-for="(link, index) in links",
        :to="link.url",
        :key="index"
      ).mr-3.teal--text.text--accent-4 {{ link.text }}
    v-main
      v-container(fluid)#main-container
        router-view
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    links: [
      {
        text: 'Me!',
        url: ''
      },
      {
        text: 'Who Am I',
        url: ''
      },
      {
        text: 'My Work',
        url: ''
      },
      {
        text: 'Say Hi',
        url: ''
      }
    ]
  })
}
</script>

<style lang="sass">
  *
    margin: 0
    padding: 0

  @font-face
    font-family: 'Fira Code'
    src: url('./assets/fonts/eot/FiraCode-Bold.eot')
    src: url('./assets/fonts/eot/FiraCode-Bold.eot') format('embedded-opentype'), url('./assets/fonts/woff2/FiraCode-Bold.woff2') format('woff2'), url('./assets/fonts/woff/FiraCode-Bold.woff') format('woff'), url('./assets/fonts/ttf/FiraCode-Bold.ttf') format('truetype')
    font-weight: 700
    font-style: normal
</style>
