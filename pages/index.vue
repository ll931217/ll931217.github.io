<template lang="pug">
#main-app
  Me
  WhoAmI
  MyWork
  SayHi
</template>

<script>
export default {
  name: 'Portfolio',
  components: {
    Me: () => import('~/components/sections/Me.vue'),
    WhoAmI: () => import('~/components/sections/WhoAmI.vue'),
    MyWork: () => import('~/components/sections/MyWork.vue'),
    SayHi: () => import('~/components/sections/SayHi.vue')
  }
}
</script>

<style lang="sass" scoped>
</style>
