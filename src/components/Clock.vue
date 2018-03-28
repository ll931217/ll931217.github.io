<template lang="pug">
  .time
    p
      span.help [F1]: Help
      span.time {{ time }}
</template>
<script>
export default {
  name: "",
  data: () => ({
    gone: false,
    time: ''
  }),
  methods: {
    getTime() {
      const date = new Date()
      const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()

      const h = this.singleDigitConverter(hours)
      const m = this.singleDigitConverter(date.getMinutes())
      const am_pm = date.getHours() >= 12 ? 'pm' : 'am'

      if (this.gone) {
        this.time = `${h}:${m} ${am_pm}`
        this.gone = false
      } else {
        this.time = `${h} ${m} ${am_pm}`
        this.gone = true
      }
    },
    singleDigitConverter(num) {
      const len = num.toString().length
      if (len === 1) {
        return '0' + num
      }
      return num
    }
  },
  mounted() {
    this.interval = setInterval(this.getTime, 500)
  },
  beforeDestroy() {
    clearInterval(this.interval)
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

        &nth-child(2)
          margin: 0

  .help
    @media (max-width: 500px)
      display: none
</style>
