<template>
  <v-data-table
    :headers="headers"
    :items="pages"
    :items-per-page="itemsPerPage"
    :footer-props="{
      'items-per-page-options': [5, 10, 15, 20, 25, 30]
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
</template>

<script>
  export default {
    async mounted () {
      this.fetchData()
    },
    methods: {
      async fetchData () {
        const res = await fetch('data/' + this.projectName + '.json', {
          mode: 'cors',
        })
        const json = await res.json()
        this.pages = await json.pages
      },
      formatDate (timestamp) {
        let date = new Date()
        date.setTime(timestamp * 1000)
        const params = {
          year: "numeric", month: "numeric", day: "numeric",
          hour: "numeric", minute: "numeric", second: "numeric",
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
          { text: 'Pin', value: 'pin'},
          { text: 'Views', value: 'views'},
          { text: 'Linked', value: 'linked'},
          { text: 'Updated', value: 'updated'},
          { text: 'Title', value: 'title', sortable: false },
          { text: 'Image', value: 'image', sortable: false},
        ]
      },
    },
    data: () => ({
      pages: [],
      projectName: 'kondoumh',
      types: ["pin", "updated", "title", "images"],
      itemsPerPage: 10,
    })
  }
</script>

<style></style>
