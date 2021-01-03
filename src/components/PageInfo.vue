<template>
  <v-card>
    <v-dialog
      v-model="pageInfoDialog"
      persistent
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
            @click="done"
            :href="pageUrl"
          >
            Go
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="done"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
  export default {
    props: {
      pageInfoDialog: Boolean,
      projectName: String,
      title: String,
      info: Object
    },
    watch: {
      info: {
        handler () {
          this.update()
        }
      }
    },
    methods: {
      update () {
        this.author = this.info.user
        this.collaborators = this.info.collaborators
        this.pageViews = this.info.views
        this.pageLinked = this.info.linked
        this.descriptions = this.info.descriptions
        this.imageSrc = this.info.image ? this.info.image : 'img/dummy.png'
        this.pageUrl = `https://scrapbox.io/${this.projectName}/${encodeURIComponent(this.title)}`
      },
      done () {
        this.author = ''
        this.pageViews = 0
        this.pageLinked = 0
        this.collaborators = []
        this.descriptions = []
        this.imageSrc = 'img/dummy.png'
        this.pageUrl = ''
        this.$emit('result', {'res': true})
      }
    },
    data: () => ({
      dialog: false,
      author: '',
      pageViews: 0,
      pageLinked: 0,
      collaborators: [],
      descriptions : [],
      pageUrl: '',
      imageSrc: '',
    })
  }
</script>
