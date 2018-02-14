<template lang="pug">
  .row.content
    .col-md-10.offset-md-1
      .row.justify-content-center
        .col.col-md-6.about
          .row.justify-content-center
            .col-6
              img(src="http://i.imgur.com/Y7rNZI4.jpg", alt="Me!").img-fluid
          .row
            .col
              .details
                p Hello! My name is Liang-Shih, I am a highly self motivated individual who gets a thrill out of problem solving and creating things. I work well under pressure and is passionate about excellence in web development. I enjoy problem solving, it is the sole reason which brought me into this field.
                #contactMe
                  h3 Contact me
                  p
                    a(href="https://github.com/ll931217", target="_blank")
                      i(aria-hidden="true").fa.fa-github
                    a(href="https://www.facebook.com/ll931217", target="_blank")
                      i(aria-hidden="true").fa.fa-facebook
                    a(href="https://www.linkedin.com/in/ll931217/", target="_blank")
                      i(aria-hidden="true").fa.fa-linkedin
                    a(href="mailto:liangshihlin@gmail.com", target="_blank")
                      i(aria-hidden="true").fa.fa-envelope
</template>

<script>
  import * as types from '../store/types'

  export default {
    name: "About",
    created() {
      this.$store.dispatch(types.SET_BG_IMAGE, {main: 'src/assets/images/about.jpg', alt: 'src/assets/images/transparent.png'})
    }
  }
</script>

<style lang="sass" scoped>
  .about
    background-color: rgba(0, 0, 0, 0.5)
    padding: 2rem

    img
      height: 300px
      width: 300px
      border-radius: 50%

  .details
    font-size: 30px
    margin: 1rem

  .fa
    color: white
    font-size: 40px
    margin-right: 20px
</style>
