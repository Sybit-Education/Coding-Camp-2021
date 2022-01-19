<template>
  <v-container id="material-detail">
    <v-card class="mx-auto rounded-xl mt-3" v-if="material">
      <back-button />
      <share-button
        :title="share.title"
        :text="share.text"
        :url="$route.path"
      />
      <v-card-title>
        <h1 class="material-name mb-5 mx-10">
          {{ material.name }}
        </h1>
      </v-card-title>
      <target-image :material="material" />
      <v-card-text>
        <v-row class="mb-3">
          <v-col
            v-for="target in material.targets"
            :key="target.id"
            align="center"
          >
            <target-chip :target="target" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <markdown-wrapper
              class="mt-10 mb-5"
              v-if="material.notes"
              :source="material.notes"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <material-call-to-action-button :material="material" />
          </v-col>
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
import MaterialTargetDetail from '@/components/material/MaterialTargetDetail.vue'
import TipCard from '@/components/tips/TipCard'
import MarkdownWrapper from '@/components/MarkdownWrapper.vue'
import TargetChip from '@/components/target/TargetChip.vue'
import TargetImage from '@/components/target/TargetImage.vue'
import MaterialCallToActionButton from '@/components/material/MaterialCallToActionButton.vue'

export default {
  name: 'DetailView',
  components: {
    BackButton,
    ShareButton,
    MarkdownWrapper,
    MaterialTargetDetail,
    TipCard,
    TargetChip,
    TargetImage,
    MaterialCallToActionButton
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
    async getTip () {
      if (this.$store.state.tipList.length < 1) {
        await this.$store.dispatch('getTipRecords')
      }
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
</style>
