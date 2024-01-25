<template>
  <div>
    <v-btn
      v-if="selectedTarget"
      block
      class="rounded-xl py-7"
      color="blue"
      elevation="0"
      @click="onClick"
    >
      {{ selectedTarget.targetLabel }}
    </v-btn>
  </div>
</template>

<script lang="ts">
import { useTargetStore } from '@/store/target.store'
import type Target from '@/types/target'


export default {
  name: 'MaterialCallToActionButton',
  props: {
    material: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      selectedTarget: null as Target | null
    }
  },
  mounted () {
    this.material.targets.forEach((targetId: string) => {
      const target = useTargetStore().getTargetById(targetId)
      if (
        target?.targetAction === 'show_link' ||
        target?.targetAction === 'show_map'
      ) {
        this.selectedTarget = target
      }
    })
  },
  methods: {
    onClick () {
      if(this.selectedTarget) {
        if (this.selectedTarget.targetAction === 'show_link') {
          const url = this.selectedTarget.targetLink
          if (url.startsWith('http')) {
            window.open(url, '_blank')
          } else {
            this.$router.push(url)
          }
        } else if (this.selectedTarget.targetAction === 'show_map') {
          const targetNames = this.material.targets.map((target: Target) => target.name)
          this.$router.push({
            name: 'Karte',
            params: { targetNames: targetNames }
          })
        } else {
          console.error(
            'undefined target action',
            this.selectedTarget.targetAction
          )
        }
      }
    }
  }
}
</script>
