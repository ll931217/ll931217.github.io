<template lang="pug">
  #whoami.mt-10
    v-container
      h1 Who Am I?
      ul
        li I am a dedicated individual with a proven ability to work on my own initiative to ensure that demanding deadlines are met, and customer expectations are maintained.
        li I am highly self-motivated, curious and enthusiastic about learning something new, hence the reason I chose this field as my profession as it satiates my thirst for new knowledge.
        li I can provide skills that can improve overall teamwork, product quality, attention to detail, and problem solving.
        li I am now eager to secure a long-term contract where I can provide my expertise and knowledge whilst also enabling my continued professional development.
      h2.mt-10 My Adjectives
      v-row
        v-col(sm="12", md="4")
          v-card(rounded)
            v-img(src="@/assets/images/reliable.svg")
              template(v-slot:placeholder)
                v-row(align="center", justify="center").fill-height.ma-0
                  v-progress-circular(indeterminate, color="grey lighten-5")
            v-card-title Curious
            v-card-text
              div This would be the main adjective that best describes me. I had always been filled with curiosity when I was young, looking for something new to learn, either by finding out about it on the internet or creating it myself, it has always filled me with so much joy.
        v-col(sm="12", md="4")
          v-card(rounded)
            v-img(src="@/assets/images/passionate.svg")
              template(v-slot:placeholder)
                v-row(
                  align="center",
                  justify="center"
                ).fill-height.ma-0
                  v-progress-circular(
                    indeterminate,
                    color="grey lighten-5"
                  )
            v-card-title Passionate
            v-card-text
              div I am passionate about software development as it fulfills my curiosity of always seeking something new. I enjoy that feeling of other people using the system that I created instead of it collecting dust.
        v-col(sm="12", md="4")
          v-card(rounded)
            v-img(src="@/assets/images/motivation.svg")
              template(v-slot:placeholder)
                v-row(
                  align="center",
                  justify="center"
                ).fill-height.ma-0
                  v-progress-circular(
                    indeterminate,
                    color="grey lighten-5"
                  )
            v-card-title Motivated
            v-card-text
              div I am a highly self motivated individual. I see to it that the work given to me is finished on time. 
      h2.mt-10 Skills
      v-img(src="../../assets/images/skills.svg")
</template>

<script>
export default {
  name: 'WhoAmI',
}
</script>

<style lang="sass">

</style>
