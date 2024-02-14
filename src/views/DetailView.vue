<template>
  <v-container id="material-detail">
    <v-card
      v-if="material"
      class="mx-auto rounded-xl mt-3"
    >
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
            :key="target"
            align="center"
          >
            <target-chip :target-id="target" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <markdown-wrapper
              v-if="material.notes"
              class="mt-10 mb-5"
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
      <v-card-text
        v-for="target in material.targets"
        :key="target"
      >
        <material-target-detail :target-id="target" />
      </v-card-text>
    </v-card>
    <v-skeleton-loader
      v-else
      type="card"
    />
    <tip-card
      v-if="tip"
      class="mt-3"
      :tip="tip"
    />
  </v-container>
</template>

<script lang="ts">
import BackButton from '@/components/navigation/BackButton.vue'
import ShareButton from '@/components/navigation/ShareButton.vue'
import MaterialTargetDetail from '@/components/material/MaterialTargetDetail.vue'
import TipCard from '@/components/tips/TipCard.vue'
import MarkdownWrapper from '@/components/MarkdownWrapper.vue'
import TargetChip from '@/components/target/TargetChip.vue'
import TargetImage from '@/components/target/TargetImage.vue'
import MaterialCallToActionButton from '@/components/material/MaterialCallToActionButton.vue'
import { mapState } from 'pinia'
import { useMaterialStore } from '@/store/material.store'
import { useTipStore } from '@/store/tip.store'
import { useTargetStore } from '@/store/target.store'
import type Tip from '@/types/tip'
import type Material from '@/types/material'

export default {
  components: {
    BackButton, ShareButton, MaterialTargetDetail,
    TipCard, MarkdownWrapper, TargetChip, TargetImage, MaterialCallToActionButton
  },
  data () {
    return {
      tip: null as null | Tip
    }
  },
  /* TODO
  head: {
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
  }, */
  computed: {
    material (): Material {
      return this.getMaterialById(this.$route.params.id as string)
    },
    title (): string {
      return this.material ? this.material.name : 'Loading...'
    },
    description (): string {
      return this.material ? this.material.notes : 'Loading...'
    },
    share (): {title: string, text: string} {
      if (this.material && this.material?.targets) {
        return {
          title: `Mülli: ${this.material.name} entsorgen 👉 ${this.getTargetById(this.material.targets[0]).name}`,
          text: `${this.material.name} entsorgen: ${this.getTargetById(this.material.targets[0]).name}
          ${this.material?.notes}`
        }
      } else {
        return {
          title: `Mülli: ${this.material?.name} entsorgen`,
          text: `${this.material?.name} entsorgen: ${this.material?.notes}`
        }
      }
    },
    ...mapState(useTipStore, {
      getTipList: store =>  store.tipList
    }),
    ...mapState( useMaterialStore, {
      getMaterialById: store => store.getMaterialById
    }),
    ...mapState(useTargetStore, {
      getTargetById: store => store.getTargetById
    })
  },
  created () {
    this.getMaterial()
    if (this.material?.category?.length) {
      this.getTip()
    }
  },
  methods: {
    getMaterial () {
      if (this.material !== undefined) return
      useMaterialStore().getMaterialRecords()
    },
    async getTip () {
      const list = Array<Tip>()
      const tipList = this.getTipList
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
