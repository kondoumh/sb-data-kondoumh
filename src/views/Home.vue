<template>
  <v-container>
    <div class="home">
      <HelloWorld msg="Welcome to Scrapbox viz"/>
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
