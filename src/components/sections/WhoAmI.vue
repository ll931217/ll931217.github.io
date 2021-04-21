<template lang="pug">
  #whoami.mt-10
    v-container
      h1 Who Am I?
      ul
        li I am a dedicated and hardworking individual with a proven ability to work on my own initiative to ensure that demanding deadlines are met, and customer expectations are maintained.
        li I am highly self-motivated, curious and enthusiastic about learning something new, hence the reason I chose this field as my profession.
        li I can provide skills that can improve overall teamwork, product quality, attention to detail, and problem solving.
        li I am now eager to secure a long-term contract where I can provide considerable expertise and knowledge whilst also enabling my continued professional development.
      h2.mt-10 Key Values
      v-row
        v-col(sm="12", md="4")
          v-card(rounded)
            v-img(
              src="../../assets/images/passionate.svg"
            )
            v-card-title Passionate
            v-card-text
              div I am passionate about software development as it fulfills my curiosity of always seeking something new.
        v-col(sm="12", md="4")
          v-card(rounded)
            v-img(
              src="../../assets/images/motivation.svg"
            )
            v-card-title Motivation
            v-card-text
              div I am a highly self motivated individual. I see to it that the work given to me is finished on time.
        v-col(sm="12", md="4")
          v-card(rounded)
            v-img(
              src="../../assets/images/reliable.svg"
            )
            v-card-title Reliable
            v-card-text
              div I always finish my work on time. If I know that I am not able to, I would work overtime to get it done.
      h2.mt-10 Skills
      v-img(
        src="../../assets/images/skills.svg"
      )
</template>

<script>
export default {
  name: 'WhoAmI',
}
</script>

<style lang="sass">

</style>
