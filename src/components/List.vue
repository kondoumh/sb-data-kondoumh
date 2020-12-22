<template>
  <v-card
    max-width="500"
    class="mx-auto"
  >
    <v-toolbar color="blue">
      <v-toolbar-title>kondoumh</v-toolbar-title>
      <v-spacer/>
      <v-btn icon color="gray" @click="fetchData">
        <v-icon>mdi-cached</v-icon>
      </v-btn>
      {{ updated }}
    </v-toolbar>
    <v-toolbar color="blue">
      <v-spacer/>
      <v-checkbox v-model="hidePinned" label="Hide Pinned"></v-checkbox>
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
          <v-list-item-action @click.stop="dialog = true" @click="pageInfo(item.title)">
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>
    <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card>
        <v-card-title class="headline">
          {{ title }}
        </v-card-title>

        <v-card-text>
          Author: {{ author }}
          <span v-for="(name, index) in collaborators" :key="index">, {{ name }}</span>
        </v-card-text>

        <v-card-text>
          Views: {{ pageViews }} Linked: {{ pageLinked }}
        </v-card-text>

        <v-card-text>Descriptions</v-card-text>
        <v-card-text class="text-left">
          <div v-for="(text, index) in descriptions" :key="index">
            {{ text }}
          </div>
        </v-card-text>

        <v-img max-width="300" :src="imageSrc"></v-img>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="dialog = false"
            :href="pageUrl"
          >
            Go
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>  </v-card>
</template>

<script>
  export default {
    async mounted () {
      this.fetchData()
    },
    methods: {
      async fetchData () {
        const res = await fetch('/.netlify/functions/sbpages', {
          headers: {
            'project': this.projectName,
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
         return '<a href="https://scrapbox.io/kondoumh/' + encodeURIComponent(title)+ '">' + title + '</a>'
      },
      async pageInfo (title) {
        this.author = ''
        this.pageViews = 0
        this.pageLinked = 0
        this.collaborators = []
        this.descriptions = []
        this.pageUrl = ''
        this.imageSrc = ''
        this.title = title
        const res = await fetch('/.netlify/functions/pageInfo', {
          headers: {
            'project': this.projectName,
            'title': encodeURIComponent(title),
          }
        })
        const json = await res.json()
        this.author = json.user
        this.collaborators = json.collaborators
        this.pageViews = json.views
        this.pageLinked = json.linked
        this.descriptions = json.descriptions
        this.pageUrl = 'https://scrapbox.io/kondoumh/' + encodeURIComponent(title)
        this.imageSrc = json.image ? json.image : 'img/dummy.png'
      }
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
      projectName: 'kondoumh',
      views: '',
      updated: '',
      hidePinned: true,
      token: '',
      pages: [],
      types: ['pin', 'updated', 'title', 'images'],
      itemsPerPage: 100,
      title: '',
      author: '',
      pageViews: 0,
      pageLinked: 0,
      collaborators: [],
      descriptions : [],
      pageUrl: '',
      imageSrc: '',
      dialog: false
    })
  }
</script>
