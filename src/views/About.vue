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
      <img src="img/icons/msapplication-icon-144x144.png" width="80"/>
    </v-list-item>

    <v-list shaped>
      <v-subheader>Hosted by</v-subheader>
      <v-list-item
        v-for="item in itemsHosted"
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
      <v-subheader>Build by</v-subheader>
      <v-list-item
        v-for="item in itemsBuild"
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
      <v-subheader>Constructed by</v-subheader>
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
      itemsHosted: [
        { icon: 'mdi-web', text: 'Netlify', url: 'https://www.netlify.com' },
      ],
      itemsBuild: [
        { icon: 'mdi-github-box', text: 'GitHub Actions', url: 'https://github.com/features/actions' },
      ],
      itemsOss: [
        { icon: 'mdi-language-javascript', text: 'Vue.js', url: 'https://vuejs.org' },
        { icon: 'mdi-language-javascript', text: 'Vuetify', url: 'https://vuetifyjs.com' },
        { icon: 'mdi-language-javascript', text: 'D3.js', url: 'https://d3js.org' },
        { icon: 'mdi-language-go', text: 'mamezou-tech/sbgraph', url: 'https://github.com/mamezou-tech/sbgraph' },
      ],
      itemsSite: [
        { icon: 'mdi-book-open-page-variant', text: 'kondoumh - Scrapbox', url: 'https://scrapbox.io/kondoumh' },
        { icon: 'mdi-book-open-page-variant', text: 'help - Scrapbox', url: 'https://scrapbox.io/help-jp' },
      ],
    }),
  }
</script>