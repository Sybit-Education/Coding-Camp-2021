<template>
  <div>
    <v-btn
      v-if="selectedTarget"
      block
      class="rounded-xl py-7"
      color="blue"
      dark
      elevation="0"
      @click="onClick"
    >
      {{selectedTarget.targetLabel}}
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      selectedTarget: null
    }
  },
  mounted () {
    this.material.targets.forEach((targetId) => {
      const target = this.getTargetById(targetId)
      if (
        target.targetAction === 'show_link' ||
        target.targetAction === 'show_map'
      ) {
        this.selectedTarget = target
      }
    })
  },
  computed: {
    ...mapGetters({
      getTargetById: 'Target/getTargetById'
    })
  },
  methods: {
    onClick () {
      if (this.selectedTarget.targetAction === 'show_link') {
        const url = this.selectedTarget.targetLink
        if (url.startsWith('http')) {
          window.open(url, '_blank')
        } else {
          this.$router.push(url)
        }
      } else if (this.selectedTarget.targetAction === 'show_map') {
        const targetNames = this.material.targets.map((target) => target.name)
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
</script>
