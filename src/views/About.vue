<template>
  <v-card
    class="mx-auto"
    max-width="300"
    tile
  >
    <v-list shaped>
      <v-subheader>Powered by</v-subheader>
      <v-list-item-group v-model="item" color="primary">
        <v-list-item
          v-for="(item, i) in itemsOss"
          :key="i"
          :href="item.url"
          target="_blank"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-divider></v-divider>

    <v-list shaped>
      <v-subheader>Data from</v-subheader>
      <v-list-item-group v-model="item" color="primary">
        <v-list-item
          v-for="(item, i) in itemsSite"
          :key="i"
          :href="item.url"
          target="_blank"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
 </template>

<script>
  export default {
    data: () => ({
      item: 1,
      itemsOss: [
        { icon: 'mdi-flag', text: 'Vue.js', url: 'https://jp.vuejs.org' },
        { icon: 'mdi-flag', text: 'Vuetify', url: 'https://vuetifyjs.com' },
        { icon: 'mdi-flag', text: 'D3.js', url: 'https://d3js.org' },
        { icon: 'mdi-flag', text: 'mamezou-tech/sbgraph', url: 'https://github.com/mamezou-tech/sbgraph' },
      ],
      itemsSite: [
        { icon: 'mdi-clock', text: 'Scrapox', url: 'https://scrapbox.io' },
        { icon: 'mdi-account', text: 'kondoumh - Scrapbox', url: 'https://scrapbox.io/kondoumh' },
        { icon: 'mdi-account', text: 'help - Scrapbox', url: 'https://scrapbox.io/help-jp' },
      ],
    }),
  }
</script>