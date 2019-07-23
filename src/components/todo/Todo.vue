<template lang="pug">
  #todo
    p {{ todo }}
</template>

<script>
export default {
  name: 'todo',
  props: ['todo'],
};
</script>

<style lang="sass" scoped>
#todo
  border-left: 3px solid white
  color: white
  margin-top: 10px
  position: relative
  padding: 5px 10px
</style>
