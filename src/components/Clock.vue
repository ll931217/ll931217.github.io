<template lang="pug">
  .time
    p
      span.help [F1]: Help
      span.time {{ time }}
</template>

<script>
export default {
  name: 'Clock',
  data: () => ({
    gone: false,
    time: ''
  }),
  mounted () {
    this.interval = setInterval(this.getTime, 500)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    getTime () {
      const date = new Date()
      const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()

      const h = this.singleDigitConverter(hours)
      const m = this.singleDigitConverter(date.getMinutes())
      const amPm = date.getHours() >= 12 ? 'pm' : 'am'

      if (this.gone) {
        this.time = `${h}:${m} ${amPm}`
        this.gone = false
      } else {
        this.time = `${h} ${m} ${amPm}`
        this.gone = true
      }
    },
    singleDigitConverter (num) {
      const len = num.toString().length
      return len === 1 ? `0${num}` : num
    }
  }
}
</script>

<style lang="sass" scoped>
p
  display: flex
  justify-content: space-between

  span
    font-size: 16px

    @media screen and (max-width: 767px)
      font-size: 12px

.help
  @media (max-width: 500px)
    display: none
</style>
