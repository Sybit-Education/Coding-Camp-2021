<template>
  <v-container>
    <back-button :to="{ name: 'Home'}"></back-button>
    <share-button
        :title="share.title"
        :text="share.text"
        :url="$route.path"
    />
    <v-card class="mx-auto rounded-xl mt-10"
            style="overflow: scroll;"
            v-if="material && material.name && image" height="540">
      <v-card-text elevation="20" class="black--text">
        <div class="d-flex justify-center mb-7 mt-5">
          <h1 class="material-name">{{ material.name }}</h1>
        </div>
        <v-img contain height="125" class="mb-5" :src="image"/>
        <v-row class="mb-3">
          <v-col v-for="target in material.targets" :key="target.id" align="center">
            <v-chip class="ml-2 elevation-3" outlined :color="target.color">{{ target.name }}</v-chip>
          </v-col>
        </v-row>
        <div class="mt-10" v-if="material.notes">
          <markdown :source="material.notes"/>
        </div>
        <div v-for="target in material.targets" :key="target.id">
          <material-taget-detail :target="target" />
        </div>
      </v-card-text>
    </v-card>
    <v-skeleton-loader v-else type="card"/>
  </v-container>

</template>

<script>
import BackButton from '@/components/navigation/BackButton.vue'
import ShareButton from '@/components/navigation/ShareButton.vue'
import Markdown from '@/components/Markdown.vue'
import MaterialTagetDetail from '../components/material/MaterialTagetDetail.vue'

export default {
  components: { BackButton, ShareButton, Markdown, MaterialTagetDetail },
  metaInfo () {
    return {
      title: this.title,
      meta: [
        // Twitter Card
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: this.title },
        { name: 'twitter:description', content: this.description },
        // image must be an absolute path
        { name: 'twitter:image', content: this.image },

        // Facebook OpenGraph
        { property: 'og:title', content: this.title },
        { property: 'og:site_name', content: 'Mülli' },
        { property: 'og:type', content: 'article' },
        { property: 'og:image', content: this.image },
        { property: 'og:description', content: this.description },
        { property: 'og:url', content: this.$route.path }
      ]
    }
  },
  computed: {
    image () {
      if (this.material && this.material.targets && this.material.targets[0]?.images) {
        return this.material.targets[0].images[0].url
      }
      return 'required(\'https://via.placeholder.com/150?text=placeholder\')'
    },
    materialId () {
      return this.$route.params.id
    },
    material () {
      return this.$store.getters.getMaterialById(this.materialId)
    },
    title () {
      return this.material ? this.material.name : 'Loading...'
    },
    description () {
      return this.material ? this.material.notes : 'Loading...'
    },
    share () {
      return {
        title: `Mülli: ${this.material?.name} entsorgen 👉 ${this.material?.targets[0].name}`,
        text: `${this.material?.name} entsorgen: ${this.material?.targets[0].name}
        ${this.material?.notes}`
      }
    }
  },
  created () {
    this.getMaterial()
  },
  methods: {
    getMaterial () {
      if (this.material === !undefined) return
      this.$store.dispatch('getRecordsFromSessionStorage', [
        'material',
        'targets'
      ])
    }
  }
}
</script>
<style lang="scss" scoped>
.material-name {
  hyphens: auto;
  font-size:30px;
  line-height: 2rem;
}
</style>
