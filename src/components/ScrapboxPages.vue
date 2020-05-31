<template>
  <v-data-table
    :headers="headers"
    :items="posts"
    :items-per-page="itemsPerPage"
    :footer-props="{
      'items-per-page-options': [5, 10, 15, 20, 25, 30]
    }"
    class="elevation-1"
  >
    <template v-slot:item.date="{ item }">
      {{ item.date.substring(0, 19) }}
    </template>
    <template v-slot:item.slug="{ item }">
      <a :href="item.post_url" target="_blank">{{ item.slug ? item.slug : item.id_string }}</a>
    </template>
    <template v-slot:body.append>
      <tr>
        <td>
          <v-select v-model="type" :items="types" label="type"></v-select>
          <v-text-field v-model="note_count" type="number" label="More than"></v-text-field>
        </td>
      </tr>
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
        const res = await fetch(this.url, {
          mode: 'cors',
        })
        const json = await res.json()
        this.posts = json
      }
    },
    computed: {
      url: () => 'https://tmblrscore-kondoumh.netlify.app/posts.json',
      headers() {
        return [
          { text: 'Date', value: 'date', filterable: false },
          { text: 'Slug', value: 'slug', sortable: false },
          {
            text: 'Type',
            value: 'type',
            filter: value => {
              if (!this.type) return true
              return this.type.startsWith(value)
            }
          },
          {
            text: 'Count',
            value: 'note_count',
            filter: value => {
              if (!this.note_count) return true
              return value > parseInt(this.note_count)
            }
          }
        ]
      },
    },
    data: () => ({
      posts: [],
      types: ["", "quote", "photo", "text", "link"],
      type: "",
      note_count: "",
      itemsPerPage: 5,
    })
  }
</script>

<style>

</style>
