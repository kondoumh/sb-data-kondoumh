<template>
  <v-container>
    <div class="graph">
      <ScrapboxGraph />
    </div>
  </v-container>
</template>

<script>
import ScrapboxGraph from '@/components/ScrapboxGraph.vue'

export default {
  name: 'Graph',
  components: {
    ScrapboxGraph
  }
}
</script>