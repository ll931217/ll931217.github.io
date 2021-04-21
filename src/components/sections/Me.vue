<template lang="pug">
  #me
    v-container
      v-row
        v-col(cols="6").banner
          v-img(
            src="../../assets/images/me.png",
            height="600"
          ).me-pic
        v-col(cols="6")
          h1.mt-10 Me!
          p.bio Hi! I am Liang-Shih Lin (林良士), a full stack developer and linux enthusiast based in Taiwan
          .social-links
            fa-icon(:icon="['fab', 'facebook']").mr-2
            fa-icon(:icon="['fab', 'twitter']").mr-2
            fa-icon(:icon="['fab', 'github']").mr-2
            fa-icon(:icon="['fab', 'codepen']").mr-2
            fa-icon(icon="envelope-open-text")
</template>

<script>
export default {
  name: 'Me'
}
</script>

<style lang="sass">
#me
  background-image: url('../../assets/images/banner-bg.svg')
  background-position: left
  background-size: contain
  color:#2d3436
  height: 600px
  overflow: hidden

  .banner
    display: grid
    grid-template-rows: repeat(12, 1fr)

    .circle
      background-color: #b2bec3
      border-radius: 50%
      height: 450px
      width: 450px
      grid-area: 3 / 1 / 12 / 2
    
    .me-pic
      grid-area: 1 / 1 / 8 / 2
  h1
    font-size: 12rem
    margin-bottom: -.25em

  .bio
    font-size: 2rem
  
  .social-links
    font-size: 1.5rem
</style>
