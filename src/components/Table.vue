<template>
  <v-card>
    <v-card-title>
      <v-select
        v-model="sp"
        :items="projects"
        label="Project"
        @change="fetchData"
      ></v-select>
      <v-spacer/>
      <v-btn icon color="gray" @click="fetchData">
        <v-icon>mdi-cached</v-icon>
      </v-btn>
      {{ updated }}
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="pages"
      :options.sync="options"
      :server-items-length="pageCount"
      :page.sync="page"
      :items-per-page="options.itemsPerPage"
      :sort-desc="[false, false, false]"
      :footer-props="{
        'items-per-page-options': [20, 25, 50, 100]
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
        :href="'https://scrapbox.io/'+ sp + '/' + encodeTitle(item.title)"
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
    methods: {
      async fetchData () {
        const { sortBy, page, itemsPerPage } = this.options
        const skip = (page - 1) * itemsPerPage
        const res = await fetch(".netlify/functions/sbpages", {
          headers: {
            "project": this.sp,
            "sortby": sortBy[0],
            "skip": skip,
            "limit": itemsPerPage,
          }
        })
        const json = await res.json()
        this.pages = await json.pages
        this.pageCount = json.count
        this.updated = this.formatDate(json.timestamp, false)
      },
      formatDate (timestamp, adjust=true) {
        let date = new Date()
        if (adjust) {
          date.setTime(timestamp * 1000)
        } else {
          date.setTime(timestamp)
        }
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
    watch: {
      options: {
        handler () {
          this.fetchData()
        },
        deep: true
      }
    },
    data: () => ({
      sp: 'kondoumh',
      projects: ["kondoumh", "help-jp"],
      page: 1,
      pageCount: 0,
      length: 1,
      pages: [],
      projectName: '',
      options: {
        itemsPerPage: 100,
        sortBy: ["updated"]
      },
      updated: '',
      headers: [
        { text: 'pin', value: 'pin', sortable: false, width: '25px' },
        { text: 'views', value: 'views', width: '50px' },
        { text: 'linked', value: 'linked', width: '50px' },
        { text: 'updated', value: 'updated', width: '50px' },
        { text: 'title', value: 'title', sortable: false, width: '150px'},
        { text: 'image', value: 'image', sortable: false, width: '350px' }
      ]
    })
  }
</script>

<style></style>
