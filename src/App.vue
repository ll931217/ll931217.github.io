<template lang="pug">
  v-app
    v-app-bar(
      app,
      absolute,
      hide-on-scroll,
      color="rgba(0, 0, 0, 0)",
      elevation="0",
      scroll-target="#main-container",
      fixed
    )
      v-spacer

      a(
        v-for="(link, index) in links",
        :href="link.url",
        :key="index",
        v-scroll-to="link.url"
      ).mr-10#site-links {{ link.text }}
    v-main
      v-container(fluid)#main-container.p-0
        router-view
        v-footer
          v-container.text-center
            v-row
              v-col
                | Created and designed by me &copy; Liang-Shih Lin
            v-row
              v-col.d-inline-flex.justify-center
                | Made with 
                v-img(
                  src="./assets/images/vuetify-logo-light-text.svg",
                  height="26",
                  max-width="90",
                  contain
                )
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    links: [
      {
        text: 'Me!',
        url: '#me'
      },
      {
        text: 'Who Am I',
        url: '#whoami'
      },
      {
        text: 'My Work',
        url: '#mywork'
      },
      {
        text: 'Say Hi',
        url: '#sayhi'
      }
    ]
  })
}
</script>

<style lang="sass">
  *
    margin: 0
    padding: 0
  
  #site-links
    font-size: 1.5rem
    text-decoration: none
    transition: all .5s ease-in-out
    text-transform: uppercase

    &::before, &::after
      display: inline-block
      opacity: 0
      transition: transform .3s, opacity .2s
    
    &::before
      margin-right: 5px
      content: '['
      transform: translateX(20px)
    
    &::after
      margin-left: 5px
      content: ']'
      transform: translateX(-20px)
    
    &:hover, &:focus
      &::before, &::after
        opacity: 1
        transform: translateX(0)

    &:link, &:visited
      color: #636e72
  
  #main-container
    padding: 0

  @font-face
    font-family: 'Fira Code'
    src: url('./assets/fonts/eot/FiraCode-Bold.eot')
    src: url('./assets/fonts/eot/FiraCode-Bold.eot') format('embedded-opentype'), url('./assets/fonts/woff2/FiraCode-Bold.woff2') format('woff2'), url('./assets/fonts/woff/FiraCode-Bold.woff') format('woff'), url('./assets/fonts/ttf/FiraCode-Bold.ttf') format('truetype')
    font-weight: 700
    font-style: normal
</style>
