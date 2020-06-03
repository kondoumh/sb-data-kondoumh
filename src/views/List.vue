<template>
  <v-container>
    <div class="home">
      <HelloWorld msg="Full pages"/>
    </div>
    <ScrapboxPages projectName="kondoumh"/>
  </v-container>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import ScrapboxPages from '@/components/ScrapboxPages'

export default {
  name: 'List',
  components: {
    HelloWorld,
    ScrapboxPages
  },
  data () {
    return {
      //
    }
  }
}
</script>
