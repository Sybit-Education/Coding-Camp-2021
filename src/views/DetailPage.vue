<template>
  <v-container id="material-detail">
    <back-button />
    <share-button :title="share.title" :text="share.text" :url="$route.path" />
    <v-card
      class="mx-auto rounded-xl mt-10"
      v-if="material && material.name && image"
    >
      <v-card-title>
        <h1 class="material-name d-flex justify-center mb-5">
          {{ material.name }}
        </h1>
      </v-card-title>
      <v-img contain class="mb-5 target-image" :src="image" />
      <v-card-text elevation="20" class="material-box">
        <v-row class="mb-3">
          <v-col
            v-for="target in material.targets"
            :key="target.id"
            align="center"
          >
            <v-chip class="ml-2 elevation-3" outlined :color="target.color">{{
              target.name
            }}</v-chip>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <markdown
              class="mt-10 mb-5"
              v-if="material.notes"
              :source="material.notes"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-btn
            v-if="showThrowButton"
            block
            class="rounded-xl py-7"
            color="blue"
            dark
            elevation="0"
            @click="routeToMap"
          >
            Jetzt entsorgen &hellip;
          </v-btn>
          <v-btn
            v-if="showForwardButton"
            block
            class="rounded-xl py-7"
            color="blue"
            dark
            elevation="0"
            @click="routeToDRK"
          >
            Container beim
            <v-icon color="red" size="30">mdi-hospital</v-icon>DRK suchen
          </v-btn>
        </v-row>
      </v-card-text>
      <v-card-text v-for="target in material.targets" :key="target.id">
        <material-target-detail :target="target" />
      </v-card-text>
    </v-card>
    <v-skeleton-loader v-else type="card" />
    <tip-card class="mt-3" v-if="tip && tip.id" :tip="tip" />
  </v-container>
</template>

<script>
import BackButton from '@/components/navigation/BackButton.vue'
import ShareButton from '@/components/navigation/ShareButton.vue'
import Markdown from '@/components/Markdown.vue'
import MaterialTargetDetail from '../components/material/MaterialTargetDetail.vue'
import TipCard from '../components/tips/TipCard'

export default {
  components: {
    BackButton,
    ShareButton,
    Markdown,
    MaterialTargetDetail,
    TipCard
  },
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
    showThrowButton () {
      return !!this.material.targets.some(
        (target) => target.targetAction === 'show'
      )
    },
    showForwardButton () {
      return !!this.material.targets.some(
        (target) => target.targetAction === 'URL_forwarding'
      )
    },
    image () {
      if (
        this.material &&
        this.material.targets &&
        this.material.targets[0]?.images
      ) {
        return this.material.targets[0].images[0].url
      }
      return "required('https://via.placeholder.com/150?text=placeholder')"
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
      if (this.material?.targets) {
        return {
          title: `Mülli: ${this.material.name} entsorgen 👉 ${this.material.targets[0].name}`,
          text: `${this.material.name} entsorgen: ${this.material.targets[0].name}
          ${this.material?.notes}`
        }
      } else {
        return {
          title: `Mülli: ${this.material?.name} entsorgen`,
          text: `${this.material?.name} entsorgen: ${this.material?.notes}`
        }
      }
    }
  },
  created () {
    this.getMaterial()
    if (this.material?.category?.length) {
      this.getTip()
    }
  },
  data () {
    return {
      tip: undefined
    }
  },
  methods: {
    getMaterial () {
      if (this.material !== undefined) return
      this.$store.dispatch('getRecordsFromSessionStorage', [
        'material',
        'targets'
      ])
    },
    getTip () {
      const list = []
      const tipList = this.$store.getters.getTipList
      let i = 0
      this.material.category.forEach((category) => {
        tipList.forEach((tip) => {
          if (tip.materialCategory?.length) {
            tip.materialCategory.forEach((c) => {
              if (c === category) {
                list.push(tip)
              }
            })
          }
        })
        i++
        if (i === this.material.category.length) {
          this.tip = list[Math.floor(Math.random() * list.length)]
        }
      })
    },
    routeToDRK () {
      window.location.href =
        'https://www.drk-intern.de/start/suchergebnisse/kleidercontainer-suchergebnis.html?tx_drkclothescontainersearch_clothescontainersearch%5Baction%5D=clothescontainerResult&tx_drkclothescontainersearch_clothescontainersearch%5Bcontroller%5D=Clothescontainer&cHash=7ff3b10ad9ccdcf930f0dfa688ec8e20'
    },
    routeToMap () {
      const targetNames = this.material.targets.map((target) => target.name)
      this.$router.push({ name: 'Karte', params: { targetNames: targetNames } })
    }
  }
}
</script>
<style lang="scss" scoped>
.material-name {
  font-size: 2rem;
  line-height: 2.25rem;
  word-break: break-word;
}
.target-image {
  width: 50%;
  max-width: 280px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
