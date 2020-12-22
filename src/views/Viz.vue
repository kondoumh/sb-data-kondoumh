<template>
  <v-container>
    <div class="viz">
      <Graph />
    </div>
  </v-container>
</template>

<script>
import Graph from '@/components/Graph'

export default {
  name: 'Viz',
  components: {
    Graph
  }
}
</script>