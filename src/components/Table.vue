<template>
  <v-card>
    <v-card-title>
      <v-select
        v-model="project"
        :items="projects"
        dense
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
      class="elevation-1">
      <template v-slot:item.pin="{ item }">
        {{ item.pin != 0 ? "&#128204;" : "" }}
      </template>
      <template v-slot:item.updated="{ item }">
        {{ formatDate(item.updated) }}
      </template>
      <template v-slot:item.title="{ item }">
        <a
          :href="'https://scrapbox.io/'+ project + '/' + encodeURIComponent(item.title)"
          target="_blank">{{ item.title }}</a>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn icon @click.stop="pageInfoDialog = true" @click="fetchPageInfo(item.title)">
          <img :src="pageImage(item.image)" style="width: auto; height: 25px">
        </v-btn>
      </template>
    </v-data-table>
    <page-info
      :pageInfoDialog="pageInfoDialog"
      :projectName="project"
      :title="pageTitle"
      :info="pageInfo"
      @result="pageInfoDialog = false"
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
      this.projects = helper.getProjects()
      this.project = this.projects[0]
      this.fetchData()
    },
    methods: {
      async fetchData () {
        const { sortBy, page, itemsPerPage } = this.options
        const skip = (page - 1) * itemsPerPage
        const res = await fetch(".netlify/functions/sbpages", {
          headers: {
            "project": this.project,
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
        return helper.formatDate(timestamp, adjust)
      },
      pageImage (image) {
        return image ? image : 'img/icons/apple-touch-icon-120x120.png'
      },
      async fetchPageInfo (title) {
        this.pageTitle = title
        this.pageInfo = await helper.fetchPageInfo(this.project, title)
      }
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
      projects: [],
      project: '',
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
        { text: 'action', value: 'action', sortable: false, width: '10px' }
      ],
      pageInfoDialog: false,
      pageTitle: '',
      pageInfo: {}
    })
  }
</script>

<style></style>
