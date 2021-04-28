<template lang="pug">
  #mywork.mt-10
    v-container
      h1 My Work
      p The following are projects I had worked on professionally
      v-row
        v-col
          v-expansion-panels(accordion)
            v-expansion-panel(v-for="(work, index) in works", :key="index")
              v-expansion-panel-header {{ work.title }}
              v-expansion-panel-content
                md(:source="work.source")
</template>

<script>
import MCS from '../../assets/markdown/mcs.md'

export default {
  name: 'MyWork',
  data: () => ({
    works: [
      {
        title: 'Material Control System (MCS)',
        source: MCS
      }
    ]
  })
}
</script>

<style lang="sass">

</style>
