<template lang="pug">
  nav.navbar.navbar-gradient.navbar-expand-md
    h1.navbar-brand L
      span - Web developer
    button(type="button", data-toggle="collapse", data-target="#navbar", aria-controls="navbar", aria-expanded="false", aria-label="Toggle navigation").navbar-toggler
      span.navbar-toggler-icon.fa.fa-bars
    .collapse.navbar-collapse#navbar
      ul.navbar-nav.ml-auto
        li.nav-item
          router-link(:to="{name: 'home'}", exact).nav-link Home
        li.nav-item
          router-link(:to="{name: 'projects'}", exact).nav-link Projects
        li.nav-item
          router-link(:to="{name: 'pictures'}", exact).nav-link Pictures
        li.nav-item
          router-link(:to="{name: 'about'}", exact).nav-link About me
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style lang="sass" scoped>
  .navbar
    margin-bottom: 20px
    font-size: 20px

    @media only screen and (max-width: 768px)
      margin-bottom: 0

  .navbar-toggler-icon
    font-size: 40px
    color: white
    margin: 40px

    @media only screen and (max-width: 768px)
      margin: 15px 0
      font-size: 30px


  .navbar-brand
    margin: 20px 0 20px 50px
    padding: 0
    line-height: 75px
    width: 75px
    height: 75px
    color: white
    font-size: 40px
    font-weight: bold
    text-align: center
    border-radius: 0 5px 5px 0
    transition: all .5s ease-in-out

    @media only screen and (max-width: 500px)
      margin: 0
      font-size: 30px

    span
      background: none
      margin-left: 10px
      font-size: 30px
      color: rgb(200, 200, 200)
      transition: all .5s ease-in-out

      @media only screen and (max-width: 500px)
        font-size: 20px

  .navbar-gradient
    background: linear-gradient(180deg, rgb(0, 0, 0), rgba(20, 20, 20, 0))

  .nav-link
    color: white
    margin-right: 50px

    &.active

      &:after
        display: block
        content: ''
        border-bottom: solid 3px #fff
        text-shadow: 0 0 5px #fff
        transform: scaleX(1)

    &:hover
      transition: all .5s ease-in-out
      text-shadow: 0 0 10px #fff

      &:after
        transform: scaleX(1)

    &:after
      display: block
      content: ''
      border-bottom: solid 3px #fff
      text-shadow: 0 0 5px #fff
      transform: scaleX(0)
      transition: transform 250ms ease-in-out

</style>
