<template lang="pug">
  #mywork.mt-10
    v-container
      h1 My Work
      v-row
        v-col(
        ).d-flex.child-flex
          v-img(
            :src="imgUrl"
          )
</template>

<script>
export default {
  name: 'MyWork',
  data: () => ({
    imgUrl: '@/assets/images/dont-be-scared.jpg'
  })
}
</script>

<style lang="sass">

</style>
