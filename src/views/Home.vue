<template>
  <v-container>
    <div class="home">
      <HelloWorld msg="Latest pages"/>
    </div>
    <ScrapboxPages/>
  </v-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import ScrapboxPages from '@/components/ScrapboxPages'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    ScrapboxPages
  }
}
</script>
