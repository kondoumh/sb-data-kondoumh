<template>
  <v-card>
    <v-card-title>
      {{ projectName }}
      <v-spacer/>
      {{ updated }}
    </v-card-title>
    <v-card-title>
      <v-text-field
        v-model="views"
        type="number"
        label="More than"
        single-line
        hide-details
        >
      </v-text-field>
      <v-spacer/>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="pages"
      :search="search"
      :items-per-page="itemsPerPage"
      :footer-props="{
        'items-per-page-options': [25, 50, 100]
      }"
      class="elevation-1"
    >
      <template v-slot:item.pin="{ item }">
        {{ item.pin != 0 ? "&#128204;" : "" }}
      </template>
      <template v-slot:item.views="{ item }">
        {{ item.views }}
      </template>
      <template v-slot:item.linked="{ item }">
        {{ item.linked }}
      </template>
      <template v-slot:item.updated="{ item }">
        {{ formatDate(item.updated) }}
      </template>
      <template v-slot:item.title="{ item }">
        <a
        :href="'https://scrapbox.io/'+ projectName + '/' + encodeTitle(item.title)"
        target="_blank">{{ item.title }}</a>    </template>
      <template v-slot:item.image="{ item }">
        <img :src="item.image" style="width: auto; height: 25px">
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
  export default {
    async mounted () {
      this.fetchData()
    },
    props: {
      projectName: String
    },
    methods: {
      async fetchData () {
        const res = await fetch('data/' + this.projectName + '.json', {
          mode: 'cors',
        })
        const json = await res.json()
        this.pages = await json.pages
        this.updated = await json.date
      },
      formatDate (timestamp) {
        let date = new Date()
        date.setTime(timestamp * 1000)
        const params = {
          year: 'numeric', month: 'numeric', day: 'numeric',
          hour: 'numeric', minute: 'numeric', second: 'numeric',
          hour12: false
        }
        return date.toLocaleString(navigator.language, params)
      },
      encodeTitle(title) {
        return encodeURIComponent(title)
      },
    },
    computed: {
      headers() {
        return [
          { text: 'Pin', value: 'pin' },
          { 
            text: 'Views',
            value: 'views',
            filter: value => {
              if (!this.views) return true
              return value > parseInt(this.views)
            }
          },
          { text: 'Linked', value: 'linked', filter: () => true },
          { text: 'Updated', value: 'updated', filter: () => true },
          { text: 'Title', value: 'title', sortable: false },
          { text: 'Image', value: 'image', sortable: false },
        ]
      },
    },
    data: () => ({
      search: '',
      views: '',
      updated: '',
      pages: [],
      types: ['pin', 'updated', 'title', 'images'],
      itemsPerPage: 100,
    })
  }
</script>

<style></style>
