<template>
  <v-card
    max-width="500"
    class="mx-auto"
  >
    <v-toolbar>
      <v-select
        v-model="project"
        :items="projects"
        label="Project"
        width=100
        @change="fetchData"
      ></v-select>
      <v-spacer/>
      <v-checkbox v-model="hidePinned" label="Hide pin" dense></v-checkbox>
      <v-spacer/>
      <v-btn icon color="gray" @click="fetchData">
        <v-icon>mdi-cached</v-icon>
      </v-btn>
      {{ updated }}
    </v-toolbar>
    <v-list two-line>
      <template v-for="(item) in filteredPages">
        <v-list-item
          :key="item.title"
        >
          <v-list-item-avatar>
            <v-img :src="item.image"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="pageLink(item.title)"></v-list-item-title>
            <v-list-item-subtitle v-html="formatDate(item.updated)"></v-list-item-subtitle>
          </v-list-item-content>
          <v-icon v-if="item.pin != 0" color="blue">mdi-pin</v-icon>
          <v-list-item-action @click.stop="pageInfoDialog = true" @click="fetchPageInfo(item.title)">
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>
    <page-info
      :pageInfoDialog = "pageInfoDialog"
      :projectName = "project"
      :title = "pageTitle"
      :info = "pageInfo"
      @result = "pageInfoDialog = false"
    ></page-info>
  </v-card>
</template>

<script>
  import helper from './helper.js'
  import PageInfo from './PageInfo.vue'

  export default {
    components: {
      'page-info': PageInfo
    },
    async mounted () {
      this.fetchData()
    },
    methods: {
      async fetchData () {
        const res = await fetch('/.netlify/functions/sbpages', {
          headers: {
            'project': this.project,
          }
        })
        const json = await res.json()
        this.pages = json.pages
        this.updated = this.formatDate(json.timestamp, false)
      },
      formatDate (timestamp, adjust = true) {
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
      pageLink(title) {
         return `<a href="https://scrapbox.io/${this.project}/${encodeURIComponent(title)}">${title}</a>`
      },
      async fetchPageInfo (title) {
        this.pageTitle = title
        this.pageInfo = await helper.fetchPageInfo(this.project, title)
      },
    },
    computed: {
      filteredPages() {
        if (!this.hidePinned) {
          return this.pages
        } else {
          return this.pages.filter(page => page.pin === 0)
        }
      }
    },
    data: () => ({
      projects: ['kondoumh', 'help-jp'],
      project: 'kondoumh',
      views: '',
      updated: '',
      hidePinned: true,
      token: '',
      pages: [],
      types: ['pin', 'updated', 'title', 'images'],
      itemsPerPage: 100,
      pageInfoDialog: false,
      pageTitle: '',
      pageInfo: {}
    })
  }
</script>
