<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">Scrapbox viz</v-list-item-title>
        <v-list-item-subtitle>PWA for listing Scrapbox pages and graph visualization.</v-list-item-subtitle>
      </v-list-item-content>
      <img src="img/icons/apple-touch-icon-76x76.png" />
    </v-list-item>

    <v-list shaped>
      <v-subheader>Powered by</v-subheader>
      <v-list-item
        v-for="item in itemsOss"
        :key="item.text"
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
    </v-list>

    <v-divider></v-divider>

    <v-list shaped>
      <v-subheader>Data from</v-subheader>
      <v-list-item
        v-for="item in itemsSite"
        :key="item.text"
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
    </v-list>
  </v-card>
 </template>

<script>
  export default {
    data: () => ({
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