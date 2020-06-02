<template>
  <v-container>
    <v-content>
      <ScrapboxPages projectName="kondoumh"/>
    </v-content>
  </v-container>
</template>

<script>
import ScrapboxPages from '@/components/ScrapboxPages'

export default {
  name: 'List',
  components: {
    ScrapboxPages
  },
  data () {
    return {
      //
    }
  }
}
</script>
