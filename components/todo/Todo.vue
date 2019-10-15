<template lang="pug">
  #todo
    p {{ todo }}
</template>

<script>
export default {
  name: 'Todo',
  props: {
    todo: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="sass" scoped>
#todo
  border-left: 3px solid white
  color: white
  margin-top: 10px
  position: relative
  padding: 5px 10px
</style>
