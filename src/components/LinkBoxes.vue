<template lang="pug">
  .boxes
    a(href="https://github.com/ll931217", target="_blank", rel="noopener").github
      fa-icon(:icon="['fab', 'github']", target="_blank", rel="noopener")
    a(href="https://www.instagram.com/troopocalypse/").instagram
      fa-icon(:icon="['fab', 'instagram']", target="_blank", rel="noopener")
    a(href="https://codepen.io/ll931217/").codepen
      fa-icon(:icon="['fab', 'codepen']", target="_blank", rel="noopener")
    a(href="https://www.linkedin.com/in/ll931217/").linkedin
      fa-icon(:icon="['fab', 'linkedin-in']", target="_blank", rel="noopener")
</template>

<script>
  export default {
    name: "LinkBoxes"
  }
</script>

<style lang="sass" scoped>
  .boxes
    display: flex
    justify-content: flex-start
    font-size: 2.5em
    width: 100%

    @media (max-width: 768px)
      flex-wrap: wrap

  .github, .instagram, .codepen, .linkedin
    color: white
    text-align: center
    margin-top: 1rem
    margin-right: 1rem
    padding: 1.5rem 2rem
    border-radius: 10px
    box-shadow: 0 3px 5px 0 black
    transition: all .3s ease-in-out

    @media (max-width: 500px)
      margin: .5rem
      flex-grow: 1

  .github
    background-color: rgb(77, 77, 77)

    &:hover
      margin-top: .5rem
      box-shadow: 0 7px 10px -1px rgb(122, 122, 122)

  .instagram
    background-color: rgb(255, 45, 49)

    &:hover
      margin-top: .5rem
      box-shadow: 0 7px 10px -1px rgb(255, 110, 112)

  .codepen
    background-color: rgb(16, 204, 131)

    &:hover
      margin-top: .5rem
      box-shadow: 0 7px 10px -1px rgb(21, 228, 148)

  .linkedin
    background-color: rgb(14, 166, 231)

    &:hover
      margin-top: .5rem
      box-shadow: 0 7px 10px -1px rgb(18, 184, 255)
</style>
