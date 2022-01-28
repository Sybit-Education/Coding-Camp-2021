<template>
  <div v-if="target.description">
    <hr />
    <h2 class="mt-5" v-text="target.name" />
    <markdown-wrapper class="mt-5" :source="target.description" />
  </div>
</template>
<script>
import MarkdownWrapper from '@/components/MarkdownWrapper.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'MaterialTargetDetail',
  components: {
    MarkdownWrapper
  },
  props: {
    targetId: {
      type: String,
      required: true
    }
  },
  computed: {
    target () {
      return this.getTargetById(this.targetId)
    },
    ...mapGetters({
      getTargetById: 'Target/getTargetById'
    })
  }
}
</script>
