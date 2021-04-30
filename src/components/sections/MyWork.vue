<template lang="pug">
  #mywork.mt-10
    v-container
      h1 My Work
      p The following are projects that I had worked on. Most of them are available on my 
        a(href="https://github.com/ll931217") GitHub
      #keys.mb-1
        .key(v-for="(key, index) in keys", :key="index")
          .color(:style="{ 'background-color': key.color }")
          | {{ key.text }}
      v-row
        v-col
          v-expansion-panels(accordion)
            v-expansion-panel(v-for="(work, index) in works", :key="index")
              v-expansion-panel-header(:color="work.color") {{ work.title }}
              v-expansion-panel-content
                md(:source="work.source")
</template>

<script>
import ChroniBuild from '../../assets/markdown/chronibuild.md'
import ErackServer from '../../assets/markdown/erack_server.md'
import JSONValidator from '../../assets/markdown/json_validator.md'
import MCS from '../../assets/markdown/mcs.md'
import ProjectManagement from '../../assets/markdown/project_management.md'
import SeeMo from '../../assets/markdown/seemo.md'
import StockTrader from '../../assets/markdown/stock_trader.md'
import Uhuru from '../../assets/markdown/uhuru.md'
import VueTreeview from '../../assets/markdown/vue_treeview.md'

export default {
  name: 'MyWork',
  data: () => ({
    works: [
      {
        title: 'ChroniBuild (Current)',
        source: ChroniBuild,
        color: '#ffeaa7'
      },
      {
        title: 'SeeMo (Current)',
        source: SeeMo,
        color: '#ffeaa7'
      },
      {
        title: 'MCS (Current)',
        source: MCS,
        color: '#81ecec'
      },
      {
        title: 'Erack',
        source: ErackServer,
        color: '#81ecec'
      },
      {
        title: 'Vue Treeview',
        source: VueTreeview,
        color: '#81ecec'
      },
      {
        title: 'JSON Validator',
        source: JSONValidator,
        color: '#81ecec'
      },
      {
        title: 'Project Management',
        source: ProjectManagement,
        color: '#dfe6e9'
      },
      {
        title: 'Uhuru',
        source: Uhuru,
        color: '#dfe6e9'
      },
      {
        title: 'Stock Trader',
        source: StockTrader,
        color: '#dfe6e9'
      }
    ],
    keys: [
      {
        color: '#ffeaa7',
        text: 'Personal Projects'
      },
      {
        color: '#81ecec',
        text: 'Gyro Systems Inc. Projects'
      },
      {
        color: '#dfe6e9',
        text: 'Old Projects'
      }
    ]
  })
}
</script>

<style lang="sass">
#keys
  display: flex
  flex-direction: column

  .key
    display: inline-flex
    margin-bottom: .5rem

    .color
      height: 20px
      width: 20px
      margin-right: .25rem
</style>
