<template>
  <div v-if="target.description">
    <hr />
    <h2 class="mt-5" v-text="target.name" />
    <markdown class="mt-5" :source="target.description" />
  </div>
</template>
<script>
import Markdown from '@/components/Markdown.vue'

export default {
  name: 'MaterialTargetDetail',
  components: {
    Markdown
  },
  props: {
    target: {
      type: Object,
      required: true
    }
  }
}
</script>
